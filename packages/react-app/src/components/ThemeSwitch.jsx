import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

export default function ThemeSwitcher() {
  const theme = window.localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(!(!theme || theme === "light"));
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = isChecked => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  return (
    <div className="main fade-in" style={{ position: "fixed", left: 10, top: 22, zIndex: 999 }}>
      <span style={{ padding: 20 }}>{currentTheme === "light" ? "🔥" : "💎"}</span>
      <Switch size="small" checked={isDarkMode} onChange={toggleTheme} />
    </div>
  );
}
