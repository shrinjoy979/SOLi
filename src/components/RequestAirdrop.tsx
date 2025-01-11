import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { toast } from 'react-toastify';

const RequestAirdrop = () => {
    const [amount, setAmount] = useState("");
    const wallet = useWallet();
    const { connection } = useConnection();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    async function sendAirdropToUser() {
        connection.requestAirdrop(wallet.publicKey!, Number(amount) * LAMPORTS_PER_SOL);
        toast.success("Airdropped SOL");
    }
    
    return(
        <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Request Airdrop</h1>
                        {wallet.publicKey ?
                            <p className="text-white px-4">
                                Public Address: {wallet.publicKey ? wallet.publicKey?.toBase58() : "Not Available"}<br/><br/> {/* solana address is 58 bit */}
                            </p>
                        : null }
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <input
                                    placeholder="Amount"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
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
                                    className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] ${
                                        amount
                                        ? "bg-[#1980e6] text-white cursor-pointer"
                                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                                    onClick={sendAirdropToUser}
                                    disabled={!amount}
                                >
                                    <span className="truncate">Request</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestAirdrop
