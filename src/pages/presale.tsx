import "../styles/presale.less";
import {
  Button,
  Layout,
  Image,
  Typography,
  BackTop,
  Card,
  Row,
  Col,
  Space,
} from "antd";
import { UpOutlined } from "@ant-design/icons";

import PhaseInfo from "../components/phaseInfo/phaseInfo";
import defireLogo from "../images/defire_color.png";

function Presale() {
  const { Content } = Layout;
  const { Text } = Typography;

  return (
    <>
      <Content className="content">
        <Space className="container" align="center" direction="vertical">
          <Image
            className="logo"
            preview={false}
            width={300}
            src={defireLogo}
          />
          <PhaseInfo />

          <Row>
            <Col span={24}>
              <Button>Community Refferal</Button>
            </Col>
          </Row>

          <Card className="stats-card" title="Your Stats">
            <Row>
              <Col span={24}>
                <Col className="stats-info" span={24}>
                  <Text>Network: </Text>
                  <Text>ETH</Text>
                </Col>
                <Col className="stats-info" span={24}>
                  <Text>FLARE: </Text>
                  <Text>XXX Flare</Text>
                </Col>
                <Col className="stats-info" span={24}>
                  <Text>Total Amount Deposited: </Text>
                  <Text>00000 Native</Text>
                </Col>
                <Col className="stats-info" span={24}>
                  <Text>Phase One: </Text>
                  <Text>XXX DEFIRE</Text>
                </Col>
                <Col className="stats-info" span={24}>
                  <Text>Phase Two: </Text>
                  <Text>XXX DEFIRE</Text>
                </Col>
                <Col className="stats-info" span={24}>
                  <Text>Phase Three: </Text>
                  <Text>XXX DEFIRE</Text>
                </Col>
                <Col className="stats-info" span={24}>
                  <Text>Referal: </Text>
                  <Text>XXX DEFIRE</Text>
                </Col>
              </Col>
            </Row>
          </Card>
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
