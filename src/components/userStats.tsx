import "../styles/userStats.less";
import { Row, Col, Typography, Card } from "antd";

function UserStats(props: any) {
  const { Text } = Typography;
  const { currentTheme } = props;

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
              <Text style={customStyle.style}>XXX Flare</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Total Amount Deposited: </Text>
              <Text style={customStyle.style}>00000 USDC</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Phase One: </Text>
              <Text style={customStyle.style}>XXX DEFIRE</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Phase Two: </Text>
              <Text style={customStyle.style}>XXX DEFIRE</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Phase Three: </Text>
              <Text style={customStyle.style}>XXX DEFIRE</Text>
            </Col>
            <Col className="stats-info" span={24}>
              <Text style={customStyle.style}>Your Referral: </Text>
              <Text style={customStyle.style}>XXX DEFIRE</Text>
            </Col>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default UserStats;
