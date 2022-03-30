import "../styles/presale.less";
import "../styles/presale-light.less";
import { useState } from "react";
import { Layout, Image, BackTop, Space, Button, Tag, Switch, Col } from "antd";
import { UpOutlined } from "@ant-design/icons";
//import { useMoralis, useWeb3Contract } from "react-moralis";
//import gameOnStable from "../contracts/gameOnStable.json";
import Account from "../components/Account/Account";

import PhaseInfo from "../components/phaseInfo";
import UserStats from "../components/userStats";
import {
  WalletOutlined,
  DisconnectOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useThemeSwitcher } from "react-css-theme-switcher";
import defireLogo from "../images/defire_color.png";

function Presale() {
  // const { authenticate, isAuthenticated, logout } = useMoralis();
  const { Content } = Layout;

  const [isDarkMode, setIsDarkMode] = useState();
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: any) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }

  return (
    <>
      <Content
        // className={
        //   currentTheme === "dark" ? "content" : "content content-light"
        // }
        className="content"
      >
        {/* <Switch checked={isDarkMode} onChange={toggleTheme} />
        <h1>Changing theme here {currentTheme}</h1> */}
        <Space
          size={20}
          // className={
          //   currentTheme === "dark" ? "container" : "container container-light"
          // }
          className="container"
          align="center"
          direction="vertical"
        >
          <Image
            className="logo"
            preview={false}
            width={300}
            src={defireLogo}
          />
          <Col className="connect-wallet">
            <Account />
          </Col>

          <PhaseInfo />
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
