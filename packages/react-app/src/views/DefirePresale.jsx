import { Button, Card, Input, Row, Col, Typography, Switch, Space, Image, Statistic, InputNumber } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { ThemeSwitch } from "../components";
import defireLight from "../images/DeFIRE_logo_white_filled.svg";
import defireBlack from "../images/DeFIRE_logo_black_filled.svg";
const { Countdown } = Statistic;

const styles = {
  logo: { position: "relative", top: "15px" },
  switch: { backgroundColor: "182120" },
  card: { position: "relative", marginTop: "100px", display: "flex", justifyContent: "center", border: "0" },
  cardx: { position: "relative", marginTop: "25px", display: "flex", justifyContent: "center", border: "0" },

  wrapper: {
    width: "600px",
    display: "flex",
    padding: "30px",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: "6px",
    border: "transparent",
    marginTop: "25px",
    boxShadow: "1px 1px 26px 6px rgba(0, 0, 0, 0.24)",
  },
  wrapperx: {
    width: "600px",
    display: "flex",
    padding: "20px",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "transparent",
  },
  text: { display: "inline" },
  input: { marginTop: 20, border: "1px solid #ecf4ff", borderRadius: "6px" },
  inputlLight: { marginTop: 20, border: "1px solid #182120", borderRadius: "6px" },
};

export default function DefirePresale({ tx, writeContracts, flare, dfire, usdc, deadline, startsale, userSigner }) {
  const { Title, Text } = Typography;
  const { currentTheme } = useThemeSwitcher();

  const [newDeposit, setNewDeposit] = useState("1000");
  const [newReferral, setNewReferral] = useState("x");

  const [haveReferral, setHaveReferral] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);

  const checkHaveReferral = () => {
    setHaveReferral(!haveReferral);
  };

  return (
    <>
      <Card style={styles.card}>
        <ThemeSwitch />

        <Image
          style={styles.logo}
          preview={false}
          width={100}
          src={currentTheme === "dark" ? defireLight : defireBlack}
        />

        <Row style={styles.wrapperx}>
          <Space align="center" direction="vertical">
            <Col span={24}>
              <Title>Early Adopters Sale</Title>
            </Col>
          </Space>
        </Row>

        <Row style={styles.wrapperx}>
          <Col span={24}>
            <Text style={styles.text}>Connect your wallet and </Text>
            <Button
              shape="round"
              disabled={!usdc}
              loading={isLoading}
              onClick={async () => {
                const result = tx(
                  writeContracts.USDC.approve(writeContracts.GAMEON.address, utils.parseUnits("1000000", 6)),
                  update => {
                    console.log("📡 Transaction Update:", update);
                    setIsLoading(true);
                    if (update && (update.status === "confirmed" || update.status === 1)) {
                      setIsLoading(false);
                      console.log(" 🍾 Transaction " + update.hash + " finished!");
                      console.log(
                        " ⛽️ " +
                          update.gasUsed +
                          "/" +
                          (update.gasLimit || update.gas) +
                          " @ " +
                          parseFloat(update.gasPrice) / 1000000000 +
                          " gwei",
                      );
                    }
                  },
                );
                console.log("awaiting metamask/web3 confirm result...", result);
                console.log(await result);
                if (result) {
                  setIsLoading(false);
                }
              }}
            >
              Approve USDC
            </Button>
          </Col>
        </Row>
        <Row style={styles.wrapper}>
          <Col span={24}>
            <Text style={styles.text}>Referral code? </Text>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={haveReferral}
              onChange={checkHaveReferral}
            />

            {haveReferral && (
              <Input
                bordered={false}
                placeholder="Insert your community referral"
                style={currentTheme === "dark" ? styles.input : styles.inputlLight}
                onChange={e => {
                  setNewReferral(e.target.value);
                }}
              />
            )}
          </Col>

          <Col span={12}>
            <Input
              min={100}
              defaultValue={1000}
              bordered={false}
              placeholder="Set value to deposit"
              style={currentTheme === "dark" ? styles.input : styles.inputlLight}
              onChange={e => {
                setNewDeposit(e.target.value);
              }}
            />
          </Col>

          <Col span={24}>
            <Button
              shape="round"
              size="large"
              disabled={!usdc}
              style={{ margin: "16px" }}
              loading={isDepositing}
              onClick={async () => {
                const result = tx(
                  writeContracts.GAMEON.depositStable(utils.parseUnits(newDeposit || 100, 18), newReferral),
                  update => {
                    setIsDepositing(true);
                    console.log("📡 Transaction Update:", update);
                    if (update && (update.status === "confirmed" || update.status === 1)) {
                      setIsDepositing(false);
                      console.log(" 🍾 Transaction " + update.hash + " finished!");
                      console.log(
                        " ⛽️ " +
                          update.gasUsed +
                          "/" +
                          (update.gasLimit || update.gas) +
                          " @ " +
                          parseFloat(update.gasPrice) / 1000000000 +
                          " gwei",
                      );
                    }
                  },
                );
                console.log("awaiting metamask/web3 confirm result...", result);
                console.log(await result);
                if (result) {
                  setIsDepositing(false);
                }
              }}
            >
              Deposit
            </Button>
          </Col>
        </Row>

        {/* <Events
        contracts={writeContracts.GAMEON}
        contractName="DeFIREGameOn"
        eventName="DepositedStable"
        localProvider={localProvider}
        mainnetProvider={localProvider}
        startBlock={14494867}
      /> */}
      </Card>

      <Card style={styles.cardx}>
        <Row>
          <Space align="center" size="large" direction="horizontal" wrap>
            <Countdown title="Start Of Sale in" value={startsale} />
            <Countdown title="End Of Sale in" value={deadline} />
          </Space>
        </Row>
      </Card>

      <Card style={styles.cardx}>
        <Row style={styles.wrapper}>
          <Space align="center" size="large" direction="horizontal" wrap>
            <Statistic title="my USDC Balance" value={usdc} precision={2} />

            <Statistic title="my psDFIRE Balance" value={dfire} precision={2} />

            {/* <Card className="stats-card" title="Your Stats">
              <Row>
                <Col span={24}>
                  <Col className="stats-info" span={24}>
                    <Text>Network: </Text>
                    <Text>Ethereum</Text>
                  </Col>
                  <Col className="stats-info" span={24}>
                    <Text>FLARE: </Text>
                    <Text>{ether} Flare</Text>
                  </Col>
                  <Col className="stats-info" span={24}>
                    <Text>Total Amount Deposited: </Text>
                    <Text>{ether} USDC</Text>
                  </Col>
                  <Col className="stats-info" span={24}>
                    <Text>Phase One: </Text>
                    <Text>{ether} DEFIRE</Text>
                  </Col>
                  <Col className="stats-info" span={24}>
                    <Text>Phase Two: </Text>
                    <Text>{ether} DEFIRE</Text>
                  </Col>
                  <Col className="stats-info" span={24}>
                    <Text>Phase Three: </Text>
                    <Text>{ether} DEFIRE</Text>
                  </Col>
                  <Col className="stats-info" span={24}>
                    <Text>Your Referral: </Text>
                    <Text>{ether}</Text>
                  </Col>
                </Col>
              </Row>
            </Card> */}
          </Space>
        </Row>
      </Card>
    </>
  );
}
