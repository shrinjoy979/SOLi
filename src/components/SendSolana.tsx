import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import SelectWallet from "./SelectWallet";
import { toast } from "react-toastify";

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
    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: new PublicKey(to),
          lamports: Number(amount) * LAMPORTS_PER_SOL,
        })
      );

      await wallet.sendTransaction(transaction, connection);
      toast.success(`Sent ${amount} SOL to ${to}`);
      setAmount("");
      setTo("");
    } catch (error) {
      toast.error("Transaction failed");
      console.error(error);
    }
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-gray-100 dark:bg-[#111418] transition-colors duration-300 group/design-root overflow-x-hidden"
      style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          {wallet.publicKey ? (
            <div className="layout-content-container flex flex-col w-[512px] max-w-[960px] flex-1 py-5">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-gray-900 dark:text-white text-[32px] font-bold leading-tight">
                    Send Solana
                  </p>
                  <p className="text-gray-600 dark:text-[#9dabb8] text-sm">
                    You can send Solana to any address
                  </p>
                </div>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-gray-800 dark:text-gray-300 text-base font-medium pb-2">
                    Recipient's Address
                  </p>
                  <input
                    placeholder="Enter address"
                    value={to}
                    onChange={handleInputAddressChange}
                    className="flex w-full rounded-xl bg-white dark:bg-[#1c2126]
                               text-gray-900 dark:text-white
                               border border-gray-300 dark:border-[#3c4753]
                               placeholder:text-gray-400 dark:placeholder:text-[#9dabb8]
                               focus:outline-none focus:ring-2 focus:ring-indigo-500
                               h-14 p-4 transition-colors duration-300"
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-gray-800 dark:text-gray-300 text-base font-medium pb-2">
                    Amount (SOL)
                  </p>
                  <input
                    placeholder="0.00"
                    value={amount}
                    onChange={handleInputAmountChange}
                    className="flex w-full rounded-xl
                               bg-white dark:bg-[#1c2126]
                               text-gray-900 dark:text-white
                               border border-gray-300 dark:border-[#3c4753]
                               placeholder:text-gray-400 dark:placeholder:text-[#9dabb8]
                               focus:outline-none focus:ring-2 focus:ring-indigo-500
                               h-14 p-4 transition-colors duration-300"
                  />
                </label>
              </div>

              <div className="flex px-4 py-3 justify-end">
                <button
                  className={`flex items-center justify-center rounded-full h-10 px-6 text-sm font-bold transition-all duration-300
                    ${
                      amount && to
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  onClick={sendTokens}
                  disabled={!amount || !to}
                >
                  Send {amount || "0"} SOL
                </button>
              </div>
            </div>
          ) : (
            <SelectWallet />
          )}
        </div>
      </div>
    </div>
  );
};

export default SendTokens;
