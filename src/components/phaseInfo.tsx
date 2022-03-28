import "../styles/phaseInfo.less";
import { useState } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import { Button, Typography, Card, Input, Row, Col, Select, Space } from "antd";

function PhaseInfo() {
  const { Title } = Typography;
  const { Option } = Select;
  const [network, setNetwork]: any = useState();

  let date = "2022-04-01";
  var remainingTime = moment.duration(moment(date).diff(moment()));

  const connectNetwork = () => {
    console.log("Connected to:", network, "network");
  };

  return (
    <>
      <Card className="phase-card">
        <Row>
          <Col className="title-wrapper" span={24}>
            <Title className="title">
              Presale --{" "}
              <Countdown
                zeroPadTime={2}
                date={Date.now() + remainingTime.asMilliseconds()}
              />
            </Title>
          </Col>
          <Col className="network-wrapper" span={24}>
            <Select
              className="dropdown-style"
              bordered={false}
              placeholder="Select a network"
              onChange={(e) => setNetwork(e)}
            >
              <Option value="ethereum">Ethereum</Option>
              <Option value="polygon">Polygon</Option>
              <Option value="fantom">Fantom</Option>
            </Select>
            <Button type="primary" shape="round" onClick={connectNetwork}>
              Connect
            </Button>
          </Col>
          <Col className="deposit-wrapper" span={24}>
            <Input
              bordered={false}
              placeholder="Insert the amount you want to deposit"
            />
            <Space>
              <Button type="primary" shape="round">
                Deposit
              </Button>
              <Button type="primary" shape="round">
                Use Max
              </Button>
            </Space>
          </Col>
          <Col className="native-wrapper" span={24}>
            <Button type="primary" shape="round">
              Aprove Native
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default PhaseInfo;
