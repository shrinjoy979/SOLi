import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";

const ShowBalance = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function getBalance() {
        const balance = await connection.getBalance(wallet.publicKey!);
        document.getElementById("balance")!.innerHTML = (balance / LAMPORTS_PER_SOL).toString();
    }

    useEffect(() => {
        getBalance();
    }, [wallet])

    return (
        <div>
            {wallet.publicKey ? 
                <p>Balance: <span id="balance"></span> SOL</p>
            : null}
        </div>
    )
}

export default ShowBalance