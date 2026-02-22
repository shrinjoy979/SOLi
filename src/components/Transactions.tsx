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
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-gray-900 dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Recent Transactions</p>
        </div>
            
        <ul className="p-4">
          {signatures.map((sig) => (
              <li key={sig.signature} className="text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 py-4 transition-colors duration-300">
                  <strong>Signature:</strong> {sig.signature} <br />
                  <strong>Slot:</strong> {sig.slot} <br />
                  <strong>Block Time:</strong> {sig.blockTime
                  ? new Date(sig.blockTime * 1000).toLocaleString()
                  : 'N/A'} <br />
                  <strong>Status:</strong> 
                  <span className={sig.err ? "text-red-500 dark:text-red-400 font-semibold" : "text-green-600 dark:text-green-400 font-semibold"}>
                    {sig.err ? 'Failed' : 'Success'} 
                  </span>
                  <br /> <br />
              </li>
          ))}
        </ul>
      </div>
    )
}

export default Transactions
