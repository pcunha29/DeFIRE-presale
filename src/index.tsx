import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Presale from "./pages/presale";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `src/styles/dark-theme.less`,
  light: `src/styles/light-theme.less`,
};

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://x1gjh967lp4m.usemoralis.com:2053/server"
      appId="gnoA34U3e24uNjqHqSF1to1tzoOGzJxdoAsrgNyw"
    >
      <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
        <Presale />
      </ThemeSwitcherProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
