import "../styles/userStats.less";
import { useState, useEffect } from "react";
import { Row, Col, Typography, Card } from "antd";
import { presaleAbi } from "../abis/presaleAbi";
import { getTokenAddress } from "../config/tokenAddress";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import { AbiItem } from 'web3-utils';

function UserStats(props: any) {

  const { Moralis, enableWeb3, isWeb3Enabled, account, chainId}: any = useMoralis();
  const [flareAmount, setFlareAmount] = useState<string>("0");
  const [depositedUSD, setDepositedUSD] = useState<string>("0");
  const [referral, setRefferral] = useState<string>("");
  const [defirePhaseOne, setDefirePhaseOne] = useState<string>("0");
  const [defirePhaseTwo, setDefirePhaseTwo] = useState<string>("0");
  const [defirePhaseThree, setDefirePhaseThree] = useState<string>("0");

  const { Text } = Typography;
  const { currentTheme } = props;

  useEffect(() => {
    if (!isWeb3Enabled)
      enableWeb3();
    
    if (Moralis.provider && account) {
      getStats(); 
    }
  }, [Moralis.provider, account]);

  const getStats = async () => {
    const { presaleAddress } = getTokenAddress(chainId);
    const web3provider = Moralis.provider;
    
    const web3Js = new Web3(web3provider);
    const presaleContract = new web3Js.eth.Contract(presaleAbi as AbiItem[], presaleAddress);
    const flare = await presaleContract.methods.myFLARE().call();
    setFlareAmount(Moralis.Units.FromWei(flare, 18));

    const investorMatrix = await presaleContract.methods.investorMatrix(account).call();
    setDepositedUSD(Moralis.Units.FromWei(investorMatrix.depositedUSD, 18));
    setRefferral(investorMatrix.referral);

    const defire1 = await presaleContract.methods.phasedPledgeStable(account, 1).call();
    setDefirePhaseOne(Moralis.Units.FromWei(defire1, 18));

    const defire2 = await presaleContract.methods.phasedPledgeStable(account, 2).call();
    setDefirePhaseTwo(Moralis.Units.FromWei(defire2, 18));

    const defire3 = await presaleContract.methods.phasedPledgeStable(account, 3).call();
    setDefirePhaseThree(Moralis.Units.FromWei(defire3, 18));
  }

  const customStyle = {
    style:
      currentTheme === "dark"
        ? { background: "#182120", color: "#ecf4ff" }
        : { background: "#ecf4ff", color: "#182120" },
  };
  return (
    <>
      <Card
        className="stats-card"
        title="Your Stats"
        bodyStyle={customStyle.style}
        headStyle={customStyle.style}
      >
        <Row>
          <Col span={24}>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Network: </Text>
              <Text style={customStyle.style}>Ethereum</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>FLARE: </Text>
              <Text style={customStyle.style}>{ flareAmount } Flare</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Total Amount Deposited: </Text>
              <Text style={customStyle.style}>{depositedUSD} USDC</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Phase One: </Text>
              <Text style={customStyle.style}>{ defirePhaseOne } DEFIRE</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Phase Two: </Text>
              <Text style={customStyle.style}>{ defirePhaseTwo } DEFIRE</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Phase Three: </Text>
              <Text style={customStyle.style}>{ defirePhaseThree } DEFIRE</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Your Referral: </Text>
              <Text style={customStyle.style}>{ referral }</Text>
            </Col>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default UserStats;
