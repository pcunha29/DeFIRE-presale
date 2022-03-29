import "../styles/referral.less";
import { useState, useEffect } from "react";
import { Input, Row, Col, Button, Card } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

function Referral() {
  const [referralInput, setReferral]: any = useState();
  const [isValid, setIsValid]: any = useState(false);

  const suffix = isValid ? (
    <CheckCircleOutlined style={{ color: "#ecf4ff" }} />
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
      <Row>
        <Col className="referral-wrapper" span={24}>
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
      </Row>
    </>
  );
}

export default Referral;
