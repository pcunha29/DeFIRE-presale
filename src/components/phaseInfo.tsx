import "../styles/phaseInfo.less";
import "../styles/phaseInfo-light.less";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import moment from "moment";
import { Button, Typography, Card, Input, Row, Col, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

function PhaseInfo(props: any) {
  const { currentTheme } = props;

  const { Title } = Typography;
  const [approvedToken, setApproved] = useState(false);
  const [referralInput, setReferral]: any = useState();
  const [isValid, setIsValid]: any = useState(false);

  let date = "2022-04-01";
  var remainingTime = moment.duration(moment(date).diff(moment()));

  const suffix = isValid ? (
    <CheckCircleOutlined
      style={
        currentTheme === "dark" ? { color: "#ecf4ff" } : { color: "#182120" }
      }
    />
  ) : (
    <span />
  );

  useEffect(() => {
    if (referralInput && referralInput.length > 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [referralInput]);

  const useReferral = () => {
    console.log("your referral code is: ", referralInput);
  };

  return (
    <>
      <Card
        bodyStyle={
          currentTheme === "dark"
            ? { background: "#182120", color: "#ecf4ff" }
            : { background: "#ecf4ff", color: "#182120" }
        }
        className={
          currentTheme === "dark" ? "phase-card" : "phase-card phase-card-light"
        }
      >
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

          <Col
            className={
              currentTheme === "dark"
                ? "deposit-wrapper"
                : "deposit-wrapper deposit-wrapper-light"
            }
            span={24}
          >
            <Col
              className={
                currentTheme === "dark"
                  ? "native-wrapper"
                  : "native-wrapper native-wrapper-light"
              }
              span={24}
            >
              <Button
                type="primary"
                shape="round"
                onClick={() => setApproved(false)}
              >
                Approve Stable Coin
              </Button>
            </Col>
            <Col
              className={
                currentTheme === "dark"
                  ? "referral-wrapper"
                  : "referral-wrapper referral-wrapper-light"
              }
              span={24}
            >
              <Input
                suffix={suffix}
                bordered={false}
                placeholder="Community Referral"
                onChange={(e) => setReferral(e.target.value)}
              />

              <Button
                disabled={!isValid}
                type="primary"
                shape="round"
                onClick={useReferral}
              >
                Use referral
              </Button>
            </Col>
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
