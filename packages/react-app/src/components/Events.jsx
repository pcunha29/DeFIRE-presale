import { List } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import Address from "./Address";

export default function Events({ contracts, contractName, eventName, localProvider, mainnetProvider, startBlock }) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);

  return (
    <div style={{ width: 900, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>Events:</h2>
      <List
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber + "_" + item.args.phase + "_" + item.args.wallet + "_" + item.args.amount}>
              <Address address={item.args[2]} ensProvider={localProvider} fontSize={16} />
              {item.args[3]}
            </List.Item>
          );
        }}
      />
    </div>
  );
}
