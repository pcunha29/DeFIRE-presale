import React from "react";
import { Dropdown, Menu, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Text } = Typography;
function NetworkSwitch({ networkOptions, selectedNetwork, setSelectedNetwork }) {
  const menu = (
    <Menu>
      {networkOptions
        .filter(i => i !== selectedNetwork)
        .map(i => (
          <Menu.Item key={i}>
            <Text onClick={() => setSelectedNetwork(i)} style={{ textTransform: "capitalize" }}>
              {i}
            </Text>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <div style={{ marginLeft: 15, marginTop: 4 }}>
      <Dropdown.Button icon={<DownOutlined />} overlay={menu} placement="bottomRight" trigger={["click"]}>
        <Text style={{ textTransform: "capitalize" }}>{selectedNetwork}</Text>
      </Dropdown.Button>
    </div>
  );
}

export default NetworkSwitch;
