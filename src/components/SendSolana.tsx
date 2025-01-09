import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const SendTokens = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = (document.getElementById("to") as HTMLInputElement)!.value;
        let amount = (document.getElementById("amount") as HTMLInputElement)!.value

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
                            />
                        </label>
                    </div>
                    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Transaction Summary</h3>
                    <div className="p-4">
                    <div className="flex justify-between gap-x-6 py-2">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Recipient</p>
                        <p className="text-white text-sm font-normal leading-normal text-right">Binance</p>
                    </div>
                    <div className="flex justify-between gap-x-6 py-2">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Amount</p>
                        <p className="text-white text-sm font-normal leading-normal text-right">1.0000 SOL</p>
                    </div>
                    <div className="flex justify-between gap-x-6 py-2">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Network Fee</p>
                        <p className="text-white text-sm font-normal leading-normal text-right">$0.01</p>
                    </div>
                    <div className="flex justify-between gap-x-6 py-2">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Total</p>
                        <p className="text-white text-sm font-normal leading-normal text-right">1.0100 SOL</p>
                    </div>
                    </div>
                    <div className="flex px-4 py-3 justify-end">
                    <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                        onClick={sendTokens}
                    >
                        <span className="truncate">Send 1.01 SOL</span>
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SendTokens