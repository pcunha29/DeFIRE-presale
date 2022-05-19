import "antd/dist/antd.css";
import { useBalance, useContractLoader, useContractReader, useGasPrice, useUserProviderAndSigner } from "eth-hooks";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Account, NetworkDisplay, NetworkSwitch } from "./components";
import { NETWORKS, ALCHEMY_KEY } from "./constants";
import externalContracts from "./contracts/external_contracts";
import { Typography } from "antd";
import { Transactor, Web3ModalSetup } from "./helpers";
import { DefirePresale } from "./views";
import { useStaticJsonRPC } from "./hooks";
import { useThemeSwitcher } from "react-css-theme-switcher";

const { ethers } = require("ethers");

const initialNetwork = NETWORKS.polygon; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

const DEBUG = false;

const NETWORKCHECK = true;
const USE_BURNER_WALLET = false; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = true;

const web3Modal = Web3ModalSetup();

const providers = [`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`];

function App(props) {
  const { currentTheme } = useThemeSwitcher();
  const location = useLocation();
  const networkOptions = [initialNetwork.name, "ethereum", "avalanche", "fantom", "ropsten"];

  const { Text } = Typography;

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);

  const targetNetwork = NETWORKS[selectedNetwork];

  const blockExplorer = targetNetwork.blockExplorer;

  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
  ]);
  const mainnetProvider = useStaticJsonRPC(providers);

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  const gasPrice = useGasPrice(targetNetwork, "fast");
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);
  const userSigner = userProviderAndSigner.signer;

  const [psDfire, setPsDfire] = useState();
  const [flare, setFlare] = useState();
  const [usdc, setUSDC] = useState();

  const [sphase, setSeedPhase] = useState();

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  const tx = Transactor(userSigner, gasPrice);
  const yourLocalBalance = useBalance(localProvider, address);

  const contractConfig = {
    deployedContracts: {},
    externalContracts: externalContracts || {},
  };

  const mainnetContracts = useContractLoader(userSigner, contractConfig, localChainId);

  const myPSDFIREBalance = useContractReader(mainnetContracts, "PSDFIRE", "balanceOf", [address]);
  const myFLAREBalance = useContractReader(mainnetContracts, "FLARE", "balanceOf", [address]);
  const myUSDCBalance = useContractReader(mainnetContracts, "USDC", "balanceOf", [address]);

  const deadline = 1648825200000 + 86400000 * 3;
  const startsale = 1648825200000;

  useEffect(() => {
    async function getBalance() {
      if (myPSDFIREBalance) {
        const psdbalance = await ethers.utils.formatEther(myPSDFIREBalance);
        setPsDfire(psdbalance);
      }
    }
    getBalance();
  }, [myPSDFIREBalance]);

  useEffect(() => {
    async function getBalance() {
      if (myFLAREBalance) {
        const flarebalance = await ethers.utils.formatEther(myFLAREBalance);
        setFlare(flarebalance);
      }
    }
    getBalance();
  }, [myFLAREBalance]);

  useEffect(() => {
    async function getBalance() {
      if (myUSDCBalance) {
        const usdcbalance = await ethers.utils.formatUnits(myUSDCBalance, 6);
        setUSDC(usdcbalance);
      }
    }
    getBalance();
  }, [myUSDCBalance]);

  console.log("psdfire", psDfire);
  console.log("flare", flare);
  console.log("usdc", usdc);

  console.log("phase", sphase);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  return (
    <div className="App">
      <NetworkDisplay
        NETWORKCHECK={NETWORKCHECK}
        localChainId={localChainId}
        selectedChainId={selectedChainId}
        targetNetwork={targetNetwork}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
      />
      <div
        style={{
          position: "fixed",
          textAlign: "right",
          right: 0,
          top: 0,
          padding: 10,
          zIndex: 2,
          width: "100%",
          backgroundColor: currentTheme === "light" ? "#fff" : "#212121",
          borderBottom: "1px solid #212121",
        }}
      >
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          {USE_NETWORK_SELECTOR && (
            <div style={{ marginRight: 20, display: "flex", alignItems: "center" }}>
              <Text style={{ marginTop: 4 }}>Select Network:</Text>
              <NetworkSwitch
                networkOptions={networkOptions}
                selectedNetwork={selectedNetwork}
                setSelectedNetwork={setSelectedNetwork}
              />
            </div>
          )}
          <Account
            useBurner={USE_BURNER_WALLET}
            address={address}
            userSigner={userSigner}
            mainnetProvider={mainnetProvider}
            price={price}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            blockExplorer={blockExplorer}
          />
        </div>
      </div>
      <DefirePresale
        address={address}
        dfire={psDfire}
        flare={flare}
        usdc={usdc}
        startsale={startsale}
        deadline={deadline}
        userSigner={userSigner}
        mainnetProvider={mainnetProvider}
        localProvider={localProvider}
        yourLocalBalance={yourLocalBalance}
        price={price}
        tx={tx}
        writeContracts={mainnetContracts}
        readContracts={mainnetContracts}
      />
    </div>
  );
}
export default App;
