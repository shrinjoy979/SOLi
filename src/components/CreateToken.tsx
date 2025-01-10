import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

const CreateToken = () => {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function createToken() {
        const name = (document.getElementById("name") as HTMLInputElement)!.value;
        const symbol = (document.getElementById("symbol") as HTMLInputElement)!.value;
        const initialSupply = (document.getElementById("initialSupply") as HTMLInputElement)!.value;
        const imageURL = (document.getElementById("imageURL") as HTMLInputElement)!.value;

        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate(); // this is mint account

        // In The below code, we are writting one transaction
        // That one transaction have 2 instruction
        // 1. create account
        // 2. add data to the created account

        // createMint method can directly create a mint account, but we don't have private key of the user.
        // that's why we need to copy the code of createMint function, and replace the code with our own data
        // For private key, will we do a partial sign from our end. and then send a transaction to wallet for sign the transaction

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey!,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey!, wallet.publicKey!, TOKEN_PROGRAM_ID),
        );

        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey!;


        transaction.partialSign(keypair);
        wallet.sendTransaction(transaction, connection);
    }

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                
                <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                    <div className="flex min-w-72 flex-col gap-3">
                        <p className="text-white tracking-light text-[32px] font-bold leading-tight">Create Token</p>
                    </div>
                    </div>
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-white text-base font-medium leading-normal pb-2">Name</p>
                        <input
                            placeholder="Name"
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                            id="name"
                        />
                    </label>
                    </div>
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">Symbol</p>
                            <input
                                placeholder="Symbol"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                id="symbol"
                            />
                        </label>
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">Initial Supply</p>
                            <input
                                placeholder="Initial Supply"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                id="initialSupply"
                            />
                        </label>
                    </div>
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                        <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">Image URL</p>
                            <input
                                placeholder="Image URL"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                id="imageURL"
                            />
                        </label>
                    </div>
                    <div className="flex px-4 py-3 justify-end">
                    <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                        onClick={createToken}
                    >
                        <span className="truncate">Create Token</span>
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreateToken