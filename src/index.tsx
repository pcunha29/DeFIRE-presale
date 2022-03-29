import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Presale from "./pages/presale";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      //move this information into a .env file
      serverUrl="https://kmhs9umn1jyd.usemoralis.com:2053/server"
      appId="fZxoF4WnqwWkxc1Kbk5rTQXvusS0vFYjSpvkffyd"
    >
      <Presale />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
