import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ConfirmedSignatureInfo } from "@solana/web3.js";
import { useEffect, useState } from "react"

const Transactions = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [signatures, setSignatures] = useState<ConfirmedSignatureInfo[]>([]);

    async function getAllTransactions() {
        const fetchedSignatures = await connection.getSignaturesForAddress(wallet.publicKey!);
        setSignatures(fetchedSignatures);
    }

    useEffect(() => {
        getAllTransactions();
    }, [wallet]);

    return (    
      <div className="w-full flex flex-col flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">Recent Transactions</p>
        </div>
            
        <ul className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          {signatures.map((sig) => (
              <li
                key={sig.signature}
                className="bg-white dark:bg-[#1c2126] 
                          rounded-xl p-4 mb-4 
                          shadow-sm 
                          border border-gray-200 dark:border-gray-700"
              >
                <div className="text-xs sm:text-sm break-all text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Signature:
                  </span>
                  <div className="mt-1 break-all">
                    {sig.signature}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Slot:
                    </span>
                    <div className="text-gray-700 dark:text-gray-300">
                      {sig.slot}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Block Time:
                    </span>
                    <div className="text-gray-700 dark:text-gray-300">
                      {sig.blockTime
                        ? new Date(sig.blockTime * 1000).toLocaleString()
                        : "N/A"}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Status:
                    </span>
                    <div
                      className={
                        sig.err
                          ? "text-red-500 font-semibold"
                          : "text-green-500 font-semibold"
                      }
                    >
                      {sig.err ? "Failed" : "Success"}
                    </div>
                  </div>
                </div>
              </li>
          ))}
        </ul>
      </div>
    )
}

export default Transactions;
