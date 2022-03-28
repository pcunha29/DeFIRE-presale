import "../styles/presale.less";
import { Layout, Image, BackTop, Space } from "antd";
import { UpOutlined } from "@ant-design/icons";

import PhaseInfo from "../components/phaseInfo";
import Referral from "../components/referral";
import UserStats from "../components/userStats";

import defireLogo from "../images/defire_color.png";

function Presale() {
  const { Content } = Layout;

  return (
    <>
      <Content className="content">
        <Space size={20} className="container" align="center" direction="vertical">
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
