import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import SelectWallet from "./SelectWallet";

const SendTokens = () => {
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const wallet = useWallet();
    const { connection } = useConnection();

    const handleInputAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleInputAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTo(event.target.value);
    };

    async function sendTokens() {
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey!,
            toPubkey: new PublicKey(to),
            lamports: Number(amount) * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                    {wallet.publicKey ? 
                        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                            <div className="flex flex-wrap justify-between gap-3 p-4">
                            <div className="flex min-w-72 flex-col gap-3">
                                <p className="text-white tracking-light text-[32px] font-bold leading-tight">Send Solana</p>
                                <p className="text-[#9dabb8] text-sm font-normal leading-normal">You can send Solana to any address</p>
                            </div>
                            </div>
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Recipient's Address</p>
                                <input
                                    placeholder="Enter address"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                    id="to"
                                    onChange={handleInputAddressChange}
                                />
                            </label>
                            </div>
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">Amount (SOL)</p>
                                    <input
                                        placeholder="0.00"
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                        id="amount"
                                        onChange={handleInputAmountChange}
                                    />
                                </label>
                            </div>
                            <div className="flex px-4 py-3 justify-end">
                                <button
                                    className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em] ${
                                        amount && to
                                        ? "bg-[#1980e6] text-white cursor-pointer"
                                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                                    onClick={sendTokens}
                                    disabled={!amount && !to}
                                >
                                    <span className="truncate">Send {amount} SOL</span>
                                </button>
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

export default SendTokens