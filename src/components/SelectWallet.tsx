import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const SelectWallet = () => {

    return (
        <div className="flex items-center justify-center">
            <WalletMultiButton></WalletMultiButton>
        </div>
    )
}

export default SelectWallet;