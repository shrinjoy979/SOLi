import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { Link, NavLink } from 'react-router-dom';
import ShowBalance from './ShowBalance';

const Header = () => {

    return (
        <header className="bg-[#111418] dark flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#293038] px-10 py-3">
            <Link to="/">
                <div className="flex items-center gap-4 text-white">
                    <div className="size-4">
                    
                    </div>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">SOLi</h2>
                </div>
            </Link>

            <div className="flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                    <NavLink
                        to="/request-airdrop"
                        className={({ isActive }) => 
                            `text-white text-sm font-medium leading-normal ${isActive ? "text-silver" : ""}`
                        }
                    >
                        Request Airdrop
                    </NavLink>

                    <NavLink
                        to="/send-tokens"
                        className={({ isActive }) => 
                            `text-white text-sm font-medium leading-normal ${isActive ? "text-silver" : ""}`
                        }
                    >
                        Send Tokens
                    </NavLink>

                    <NavLink
                        to="/sign-a-message"
                        className={({ isActive }) => 
                            `text-white text-sm font-medium leading-normal ${isActive ? "text-silver" : ""}`
                        }
                    >
                        Sign Message
                    </NavLink>

                    <NavLink
                        to="/create-a-token"
                        className={({ isActive }) => 
                            `text-white text-sm font-medium leading-normal ${isActive ? "text-silver" : ""}`
                        }
                    >
                        Create Token
                    </NavLink>

                    <a className="text-white text-sm font-medium leading-normal" href="#">
                        <ShowBalance />
                    </a>
                </div>
                <WalletMultiButton></WalletMultiButton>
            </div>
        </header>
    )
}

export default Header
