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
        <>
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Recent Transactions</h3>
            <ul>
                {signatures.map((sig) => (
                    <li key={sig.signature} className="text-white">
                        <strong>Signature:</strong> {sig.signature} <br />
                        <strong>Slot:</strong> {sig.slot} <br />
                        <strong>Block Time:</strong> {sig.blockTime
                        ? new Date(sig.blockTime * 1000).toLocaleString()
                        : 'N/A'} <br />
                        <strong>Status:</strong> {sig.err ? 'Failed' : 'Success'} <br /> <br />
                    </li>
                ))}
            </ul>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                    style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/5854567b-6150-4393-88bf-9bcfa1084346.png")` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">Sent to 0x4a...c1</p>
                    <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00 SOL</p>
                  </div>
                </div>
                <div className="shrink-0"><p className="text-[#9dabb8] text-sm font-normal leading-normal">2h ago</p></div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                    style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/f34c312c-042b-4be6-9d04-c9f853f34efb.png")`}}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">Sent to 0x4a...c1</p>
                    <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00 SOL</p>
                  </div>
                </div>
                <div className="shrink-0"><p className="text-[#9dabb8] text-sm font-normal leading-normal">2h ago</p></div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                    style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/7eca9ffe-2884-4259-97b6-9685f4138343.png")` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">Sent to 0x4a...c1</p>
                    <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00 SOL</p>
                  </div>
                </div>
                <div className="shrink-0"><p className="text-[#9dabb8] text-sm font-normal leading-normal">2h ago</p></div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                    style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/f71e96aa-f0dc-4e0c-9fe7-6678bfec660d.png")` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">Sent to 0x4a...c1</p>
                    <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00 SOL</p>
                  </div>
                </div>
                <div className="shrink-0"><p className="text-[#9dabb8] text-sm font-normal leading-normal">2h ago</p></div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                    style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/18748551-c66f-49a6-b6cb-c9232156e443.png")` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">Sent to 0x4a...c1</p>
                    <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00 SOL</p>
                  </div>
                </div>
                <div className="shrink-0"><p className="text-[#9dabb8] text-sm font-normal leading-normal">2h ago</p></div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
                    style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/20895090-6c5f-42bf-8f43-210aaa17e12f.png")` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">Sent to 0x4a...c1</p>
                    <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00 SOL</p>
                  </div>
                </div>
                <div className="shrink-0"><p className="text-[#9dabb8] text-sm font-normal leading-normal">2h ago</p></div>
              </div>
              <div className="flex px-4 py-3 justify-end">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#293038] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">View More</span>
                </button>
              </div>
        </>
    )
}

export default Transactions