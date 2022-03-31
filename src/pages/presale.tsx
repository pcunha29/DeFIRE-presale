import "../styles/presale.less";
import "../styles/presale-light.less";
import { useState } from "react";
import { Layout, Image, BackTop, Space, Switch, Col, Typography } from "antd";
import { UpOutlined } from "@ant-design/icons";

import Account from "../components/Account/Account";

import PhaseInfo from "../components/phaseInfo";
import UserStats from "../components/userStats";

import { useThemeSwitcher } from "react-css-theme-switcher";
import defireLogo from "../images/defire_color.png";
import defireLight from "../images/defire_light.png";

function Presale() {
  const { Content } = Layout;
  const { Text } = Typography;

  const [isDarkMode, setIsDarkMode] = useState(true);
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked: any) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }

  const customStyle = {
    style:
      currentTheme === "dark"
        ? { background: "#182120", color: "#ecf4ff", padding: "4px" }
        : { background: "#ecf4ff", color: "#182120", padding: "4px" },
  };

  return (
    <>
      <Content
        className={
          currentTheme === "dark" ? "content" : "content content-light"
        }
      >
        <Space
          size={20}
          className={
            currentTheme === "dark" ? "container" : "container container-light"
          }
          align="center"
          direction="vertical"
        >
          <Image
            className="logo"
            preview={false}
            width={300}
            src={currentTheme === "dark" ? defireLogo : defireLight}
          />
          <Col className="dark-light">
            <Text style={customStyle.style}>&#x2600;</Text>
            <Switch checked={isDarkMode} onChange={toggleTheme} />
            <Text style={customStyle.style}>&#127766;</Text>
          </Col>
          <Col className="connect-wallet">
            <Account />
          </Col>

          <PhaseInfo currentTheme={currentTheme} />
          <UserStats currentTheme={currentTheme} />
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
