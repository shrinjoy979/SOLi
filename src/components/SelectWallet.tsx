import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SelectWallet = () => {

    return (
        <div className="flex items-center justify-center">
            <WalletMultiButton></WalletMultiButton>
            <button className="btn-primary">Generate Wallet</button>
        </div>
    )
}

export default SelectWallet;