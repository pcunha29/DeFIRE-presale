import "../styles/presale.less";
import {
  Button,
  Layout,
  Image,
  Typography,
  BackTop,
  Card,
  Input,
  Row,
  Col,
  Space,
} from "antd";
import { UpOutlined } from "@ant-design/icons";

import defireLogo from "../images/defire.png";

function Presale() {
  const { Header, Content } = Layout;
  const { Title, Text } = Typography;
  return (
    <>
      <Header className="header">
        <Image width={200} src={defireLogo} />
      </Header>
      <Content className="content">
        <Space align="center" direction="vertical">
          <Card>
            <Row>
              <Col span={24}>
                <Title>Phase info -- CountDown</Title>
              </Col>
              <Col span={24}>
                <Button>Change Network</Button>
                <Button>Connect</Button>
              </Col>
              <Col span={24}>
                <Input width={200} placeholder="Deposit" />
                <Button>Deposit</Button>
              </Col>
              <Col span={24}>
                <Button>Aprove Native</Button>
              </Col>
            </Row>
          </Card>

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
