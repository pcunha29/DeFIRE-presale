import "../styles/presale.less";
import { useState } from "react";
import { Layout, Image, BackTop, Space, Button, Tag, Col } from "antd";
import { UpOutlined, WarningOutlined } from "@ant-design/icons";
import { useMoralis } from "react-moralis";
import { useWeb3Contract } from "react-moralis";

import gameOnStable from "../contracts/gameOnStable.json";

import PhaseInfo from "../components/phaseInfo";
import Referral from "../components/referral";
import UserStats from "../components/userStats";
import {
  WalletOutlined,
  DisconnectOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import defireLogo from "../images/defire_color.png";

function Presale() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { Content } = Layout;

  //const psDFIRE_ABI: any = gameOnStable.psDFIRE_abi;
  const gameOn_ABI: any = gameOnStable.DeFIREGameOn_abi;

  //move it to .env file
  const contractAddress = "0xB3162b9c5d647Ad9d694B5Ce21f72F8Dbe0808BC";
  const testWalletAddress = "0x24dFe909515662f897D530CbB7C2C554cEfb13E5";

  const [userInfo, setUserInfo]: any = useState(
    localStorage.getItem("userInfo")
  );

  console.log("login?: ", isAuthenticated, userInfo);
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          setUserInfo(user?.get("ethAddress"));
          //temp store solution
          localStorage.setItem("userInfo", user?.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
          setUserInfo("");
        });
    }
  };

  const logOut = async () => {
    await logout();
    setUserInfo("");
    localStorage.removeItem("userInfo");
  };

  const {
    runContractFunction: seedPhase,
    data,
    error,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    contractAddress: contractAddress,
    functionName: "seedPhase",
    abi: gameOn_ABI,
  });
  const { runContractFunction: hasRole, data: dataSymbol } = useWeb3Contract({
    contractAddress: contractAddress,
    functionName: "hasRole",
    abi: gameOn_ABI,
    params: {
      role: "contributor",
      address: testWalletAddress,
    },
  });

  return (
    <>
      {isFetching && console.log("========isFetching======== ")}
      {isLoading && console.log("========isLoading======== ")}
      {data && console.log("Data Eligibility!", data)}
      {dataSymbol && console.log("Data Symbol!", data)}
      {error && console.log("error: ", error)}

      <Content className="content">
        <Col className="testBtns">
          <Button
            type="text"
            icon={<WarningOutlined />}
            onClick={() => hasRole}
          >
            Test hasRole
          </Button>
          <Button
            type="text"
            icon={<WarningOutlined />}
            onClick={() => seedPhase}
          >
            Test hasRole
          </Button>
        </Col>

        <Space
          size={20}
          className="container"
          align="center"
          direction="vertical"
        >
          {!isAuthenticated ? (
            <Button
              icon={<ExclamationCircleOutlined />}
              onClick={login}
              className="action-buttons"
              type="text"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              icon={<DisconnectOutlined />}
              onClick={logOut}
              className="action-buttons"
              type="text"
            >
              Disconnect
            </Button>
          )}

          {userInfo && (
            <Tag
              className="user"
              color={"transparent"}
              icon={<WalletOutlined />}
            >
              {userInfo}
            </Tag>
          )}

          <Image
            className="logo"
            preview={false}
            width={300}
            src={defireLogo}
          />
          <PhaseInfo />
          <Referral />
          <UserStats />
        </Space>
      </Content>

      <BackTop>
        <div className="backTop">
          <UpOutlined width="2em" height="2em" />
        </div>
      </BackTop>
    </>
  );
}

export default Presale;
