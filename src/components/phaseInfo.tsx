import "../styles/phaseInfo.less";
import { useState } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import {
  Button,
  Typography,
  Card,
  Input,
  Row,
  Col,
  Select,
  Space,
  Radio,
} from "antd";

function PhaseInfo() {
  const { Title, Paragraph } = Typography;
  const { Option } = Select;
  const [network, setNetwork]: any = useState();
  const [tokenType, setTokenType] = useState("native");
  const [approvedToken, setApproved] = useState(false);

  let date = "2022-04-01";
  var remainingTime = moment.duration(moment(date).diff(moment()));

  const connectNetwork = () => {
    console.log("Connected to:", network, "network");
  };

  const onChange = (e: any) => {
    setTokenType(e.target.value);
  };

  const stableCoin = () => {
    console.log("stable coin selected");
    setApproved(true);
  };
  const nativeToken = () => {
    setApproved(false);
    console.log("native token selected");
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
              dropdownClassName="dropdown-opened"
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
            <Col className="token-type" span={24}>
              <Paragraph>What token do you prefer to use as deposit?</Paragraph>
              <Radio.Group onChange={onChange} value={tokenType}>
                <Space>
                  <Radio onClick={nativeToken} value={"native"}>
                    Native Tokens (ETH, MATIC, etc)
                  </Radio>
                  <Radio onClick={stableCoin} value={"stable"}>
                    Stable Coin (USDC, USDT)
                  </Radio>
                </Space>
              </Radio.Group>
            </Col>
            {tokenType && tokenType === "stable" && (
              <Col className="native-wrapper" span={24}>
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => setApproved(false)}
                >
                  Approve Stable Coin
                </Button>
              </Col>
            )}
            <Col span={24} style={{ textAlign: "center" }}>
              <Input
                bordered={false}
                placeholder="Insert the amount you want to deposit"
              />
              <Space>
                <Button disabled={approvedToken} type="primary" shape="round">
                  Deposit
                </Button>
                <Button disabled={approvedToken} type="primary" shape="round">
                  Use Max
                </Button>
              </Space>
            </Col>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default PhaseInfo;
