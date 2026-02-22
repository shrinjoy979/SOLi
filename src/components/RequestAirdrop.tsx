import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { toast } from 'react-toastify';
import SelectWallet from "./SelectWallet";

const RequestAirdrop = () => {
    const [amount, setAmount] = useState("");
    const wallet = useWallet();
    const { connection } = useConnection();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    async function sendAirdropToUser() {
        if(Number(amount) > 2) {
            return toast.error("Requested Solana can't be more than 2");
        }

        connection.requestAirdrop(wallet.publicKey!, Number(amount) * LAMPORTS_PER_SOL)
        .then(response => {
            toast.success("Airdropped SOL");
            console.log("Airdrop successful:", response);
        })
        .catch(error => {
            console.log(error);
            toast.error("You've either reached your airdrop limit today or the airdrop faucet has run dry.")
        });
    }
    
    return(
        <div className="relative flex size-full min-h-screen flex-col bg-gray-100 dark:bg-[#111418] transition-colors duration-300 group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    {wallet.publicKey ? 
                        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                            <h1 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Request Airdrop</h1>
                            {wallet.publicKey ?
                                <p className="text-gray-900 dark:text-white px-4">
                                    Public Address: {wallet.publicKey ? wallet.publicKey?.toBase58() : "Not Available"}<br/><br/>
                                </p>
                            : null }
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl bg-white dark:bg-[#1c2126] text-gray-900 dark:text-white border border-gray-300 dark:border-[#3c4753] placeholder:text-gray-400 dark:placeholder:text-[#9dabb8] focus:outline-none focus:ring-2 focus:ring-indigo-500 h-14 p-[15px] text-base font-normal leading-normal transition-colors duration-300"
                                        id="amount"
                                        required={true}
                                        value={amount}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                            <div className="flex justify-stretch">
                                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
                                    <button
                                        className={`flex min-w-[84px] max-w-[480px] items-center justify-center 
                                            overflow-hidden rounded-full h-10 px-4 text-sm font-bold transition-all duration-300
                                            ${amount
                                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                                : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                                            }`}
                                        onClick={sendAirdropToUser}
                                        disabled={!amount}
                                    >
                                        <span className="truncate">Request</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    :
                        <SelectWallet />
                    }
                </div>
            </div>
        </div>
    )
}

export default RequestAirdrop
