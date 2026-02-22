import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import ShowBalance from "./ShowBalance";

type HeaderProps = {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ darkMode, setDarkMode }: HeaderProps) => {
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
    <header
        className="flex items-center justify-between px-10 py-4 border-b bg-white border-gray-200 dark:bg-[#111418] dark:border-[#293038] transition-colors duration-300"
    >
      <Link to="/">
        <h2 className="text-lg font-bold tracking-tight text-black dark:text-white">
          SOLi
        </h2>
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200
                 ${
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
            <FiMoon className="w-5 h-5 transition-transform duration-300" />
          ) : (
            <FiSun className="w-5 h-5 transition-transform duration-300" />
          )}
        </button>
        
        <WalletMultiButton />
      </div>
    </header>
  );
};

export default Header;
