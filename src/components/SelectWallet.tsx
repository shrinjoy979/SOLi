import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { NavLink } from "react-router-dom";

const SelectWallet = () => {

    return (
        <div className="flex items-center justify-center">
            <WalletMultiButton></WalletMultiButton>
            <NavLink
                to="/seed-phrase"
            >
             <button className="btn-primary">Generate Wallet</button>
            </NavLink>
        </div>
    )
}

export default SelectWallet;