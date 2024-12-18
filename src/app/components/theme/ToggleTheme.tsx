"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.body.classList.toggle("dark", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setIsDarkMode(savedTheme);
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Error theme");
  }
  return context;
};

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-700 bg-gray-200 dark:bg-[#3b3c3e] rounded-xl dark:text-white border border-gray-300 hover:bg-gray-300 dark:hover:bg-[#1a1b1c] dark:border-gray-500"
    >
      <div className="px-2">
        <IconContext.Provider
          value={{
            color: "currentColor",
            size: "25",
            attr: {
              fillRule: "evenodd",
              clipRule: "evenodd",
            },
          }}
        >
          {isDarkMode ? <HiMiniMoon /> : <HiMiniSun />}
        </IconContext.Provider>
      </div>
    </button>
  );
};

export default ThemeToggleButton;
