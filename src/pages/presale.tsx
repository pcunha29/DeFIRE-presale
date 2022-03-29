import "../styles/presale.less";
import { useState } from "react";
import { Layout, Image, BackTop, Space, Button, Tag } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { useMoralis } from "react-moralis";

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

  const [userInfo, setUserInfo]: any = useState();
  console.log("login feito?: ", isAuthenticated, userInfo);
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          setUserInfo(user?.get("ethAddress"));
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
  };

  return (
    <>
      <Content className="content">
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
