import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import ShowBalance from "./ShowBalance";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const navItems = [
    { path: "/request-airdrop", label: "Request Airdrop" },
    { path: "/send-tokens", label: "Send Tokens" },
    { path: "/sign-a-message", label: "Sign Message" },
    { path: "/create-a-token", label: "Create Token" },
    { path: "/swap", label: "Swap" },
  ];

  return (
    <>
      <header className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 border-b bg-white border-gray-200 dark:bg-[#111418] dark:border-[#293038] transition-colors duration-300">
        <Link to="/">
          <h2 className="text-lg font-bold tracking-tight text-black dark:text-white">
            SOLi
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <ShowBalance />
          </div>

          <button
            onClick={toggleTheme}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-200 text-gray-700 dark:bg-[#1f2937] dark:text-yellow-400 hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
          >
            {darkMode ? (
              <FiMoon className="w-5 h-5" />
            ) : (
              <FiSun className="w-5 h-5" />
            )}
          </button>

          <WalletMultiButton />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-800 dark:text-white"
          >
            <FiMenu className="w-7 h-7" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMenuOpen(false)}
        />

        <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-[#111418] shadow-xl p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <Link to="/">
              <h3 className="text-lg font-semibold dark:text-white">SOLi</h3>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 dark:text-white"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${
                  isActive
                    ? "text-indigo-500"
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <ShowBalance />

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 mt-4 text-gray-700 dark:text-gray-300"
          >
            {darkMode ? <FiMoon /> : <FiSun />}
            Theme
          </button>

          <WalletMultiButton />
        </div>
      </div>
    </>
  );
};

export default Header;
