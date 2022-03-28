import "../styles/userStats.less";
import { Row, Col, Typography, Card } from "antd";

function UserStats() {
  const { Text } = Typography;

  return (
    <>
      <Card
        className="stats-card"
        title="Your Stats"
        headStyle={{ color: "#ecf4ff" }}
      >
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
    </>
  );
}

export default UserStats;
