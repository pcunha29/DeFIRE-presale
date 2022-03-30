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
      serverUrl="https://x1gjh967lp4m.usemoralis.com:2053/server"
      appId="gnoA34U3e24uNjqHqSF1to1tzoOGzJxdoAsrgNyw"
    >
      <Presale />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
