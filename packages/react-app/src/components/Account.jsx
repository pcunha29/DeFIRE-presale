import { Button, Card } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

import Address from "./Address";
import Balance from "./Balance";
import Wallet from "./Wallet";

export default function Account({
  useBurner,
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  isContract,
}) {
  const { currentTheme } = useThemeSwitcher();

  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ verticalAlign: "top", marginLeft: 15, marginTop: 4 }}
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>,
      );
    } else {
      modalButtons.push(
        <Button
          key="loginbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
          onClick={loadWeb3Modal}
        >
          connect
        </Button>,
      );
    }
  }
  const display = minimized ? (
    ""
  ) : (
    <div>
      {web3Modal && web3Modal.cachedProvider ? (
        <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}
          {/* <Balance address={address} provider={localProvider} price={price} /> */}
          <Wallet
            address={address}
            provider={localProvider}
            signer={userSigner}
            ensProvider={mainnetProvider}
            price={price}
            color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
          />
        </div>
      ) : useBurner ? (
        ""
      ) : isContract ? (
        <div>
          {address && <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />}
          {/* <Balance address={address} provider={localProvider} price={price} /> */}
        </div>
      ) : (
        ""
      )}
      {useBurner && web3Modal && !web3Modal.cachedProvider ? (
        <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
          {/* <Balance address={address} provider={localProvider} price={price} /> */}
          <Wallet
            address={address}
            provider={localProvider}
            signer={userSigner}
            ensProvider={mainnetProvider}
            price={price}
            color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {display}
      {modalButtons}
    </div>
  );
}
