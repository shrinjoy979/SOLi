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

                    <a className="text-white text-sm font-medium leading-normal" href="#">
                        <ShowBalance />
                    </a>
                </div>
                    <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                    >
                        <span className="truncate">Connect</span>
                    </button>
                    <WalletMultiButton></WalletMultiButton>
                <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/9cfd5aa2-e7b1-4377-8c7c-54ef1dc85357.png")` }}
                ></div>
            </div>
        </header>
    )
}

export default Header
