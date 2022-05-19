import { Skeleton, Typography, Tag } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Blockies from "react-blockies";
import { useLookupAddress } from "eth-hooks/dapps/ens";

const blockExplorerLink = (address, blockExplorer) => `${blockExplorer || "https://etherscan.io/"}address/${address}`;

const styles = {
  tag: { backgroundColor: "transparent", color: "transparent", borderRadius: "12px" },
};

export default function Address(props) {
  const { Text } = Typography;

  const { currentTheme } = useThemeSwitcher();
  const address = props.value || props.address;
  const ens = useLookupAddress(props.ensProvider, address);
  const ensSplit = ens && ens.split(".");
  const validEnsCheck = ensSplit && ensSplit[ensSplit.length - 1] === "eth";
  const etherscanLink = blockExplorerLink(address, props.blockExplorer);
  let displayAddress = address?.substr(0, 5) + "..." + address?.substr(-4);

  if (validEnsCheck) {
    displayAddress = ens;
  } else if (props.size === "short") {
    displayAddress += "..." + address.substr(-4);
  } else if (props.size === "long") {
    displayAddress = address;
  }

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  if (props.minimized) {
    return (
      <span style={{ verticalAlign: "middle" }}>
        <a
          style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          <Blockies seed={address.toLowerCase()} size={8} scale={2} />
        </a>
      </span>
    );
  }

  return (
    <>
      <Tag
        style={{ display: "flex", padding: "3px 10px 3px 10px", background: "transparent" }}
        icon={
          <div style={{ borderRadius: "15px", width: 24, height: 24, overflow: "hidden" }}>
            <Blockies seed={address.toLowerCase()} size={6} />
          </div>
        }
      >
        <span style={{ verticalAlign: "middle", paddingLeft: 5, fontSize: props.fontSize ? props.fontSize : 18 }}>
          {props.onChange ? (
            <Text editable={{ onChange: props.onChange }} copyable={{ text: address }}>
              <a
                style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
                target="_blank"
                href={etherscanLink}
                rel="noopener noreferrer"
              >
                {displayAddress}
              </a>
            </Text>
          ) : (
            <Text copyable={{ text: address }}>
              <a
                style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
                target="_blank"
                href={etherscanLink}
                rel="noopener noreferrer"
              >
                {displayAddress}
              </a>
            </Text>
          )}
        </span>
      </Tag>
    </>
  );
}
