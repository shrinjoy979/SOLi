import { ExtensionType, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE, createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, getAssociatedTokenAddressSync, getMintLen } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CreateToken = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [signature, setSignature] = useState<string | undefined>(undefined);
    const [tokenMintAddress, setTokenMintAddress] = useState<string | undefined>(undefined);

    const [tokenImage, setTokenImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [jsonFileUrl, setJsonFileUrl] = useState('');

    const handleImageChange = (e: any) => {
        setTokenImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        const name = (document.getElementById("name") as HTMLInputElement)!.value;
        const symbol = (document.getElementById("symbol") as HTMLInputElement)!.value;
        const description = (document.getElementById("description") as HTMLInputElement)!.value;

        if (!tokenImage) {
            alert('Please select an image!');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', tokenImage);

        try {
            // Upload image to Pinata
            const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'pinata_api_key': '56beee8eaad7b6bb9d40',
                'pinata_secret_api_key': '59468f96394c29587a3050cbdcc4e9ea4e9711b6adbe3444d492e15fb215f595',
                },
            });

            const ipfsHash = response.data.IpfsHash;
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
            setImageUrl(ipfsUrl);
            
            // Now create a JSON object containing the image URL
            const jsonObject = {
                name: name,
                symbol: symbol,
                description: description,
                image: ipfsUrl,
            };

            // Create a Blob from the JSON object
            const blob = new Blob([JSON.stringify(jsonObject)], { type: 'application/json' });

            // Create a FormData object for the JSON file
            const jsonFormData = new FormData();
            jsonFormData.append('file', blob, 'data.json');

            // Upload JSON file to Pinata
            const jsonResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', jsonFormData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'pinata_api_key': '56beee8eaad7b6bb9d40',
                'pinata_secret_api_key': '59468f96394c29587a3050cbdcc4e9ea4e9711b6adbe3444d492e15fb215f595',
                },
            });

            const jsonFileHash = jsonResponse.data.IpfsHash;
            const metadataURL = `https://gateway.pinata.cloud/ipfs/${jsonFileHash}`;
            setJsonFileUrl(metadataURL);
            createToken(metadataURL);

        } catch (error) {
            console.error('Error uploading image or JSON:', error);
            alert('Failed to upload image or JSON');
        }

        setLoading(false);        
    };

    async function createToken(metadataURL: any) {
        console.log('metadataURL', metadataURL);
        const name = (document.getElementById("name") as HTMLInputElement)!.value;
        const symbol = (document.getElementById("symbol") as HTMLInputElement)!.value;
        const decimals = (document.getElementById("decimals") as HTMLInputElement)!.value
        const supply = (document.getElementById("supply") as HTMLInputElement)!.value;

        const mintKeypair = Keypair.generate();
        const metadata = {
            mint: mintKeypair.publicKey,
            name: name,
            symbol: symbol,
            uri: metadataURL,
            additionalMetadata: [],
        };

        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey!,
                newAccountPubkey: mintKeypair.publicKey,
                space: mintLen,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeMintInstruction(mintKeypair.publicKey, Number(decimals), wallet.publicKey!, null, TOKEN_2022_PROGRAM_ID),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintKeypair.publicKey,
                metadata: mintKeypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: wallet.publicKey!,
                updateAuthority: wallet.publicKey!,
            }),
        );

        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey!;

        transaction.partialSign(mintKeypair);
        let response = await wallet.sendTransaction(transaction, connection);
        setSignature(response);
        setTokenMintAddress(mintKeypair.publicKey?.toBase58());

        const associatedToken = getAssociatedTokenAddressSync(
            mintKeypair.publicKey,
            wallet.publicKey!,
            false,
            TOKEN_2022_PROGRAM_ID,
        );

        console.log(associatedToken?.toBase58());

        const transaction2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey!,
                associatedToken,
                wallet.publicKey!,
                mintKeypair.publicKey,
                TOKEN_2022_PROGRAM_ID,
            ),
        );

        await wallet.sendTransaction(transaction2, connection);

        // Calculate total token supply
        const tokenSupply = Number(supply) * Math.pow(10, Number(decimals));

        const transaction3 = new Transaction().add(
            createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey!, Number(tokenSupply), [], TOKEN_2022_PROGRAM_ID)
        );

        await wallet.sendTransaction(transaction3, connection);

        toast.success("Token created and Minted successfully.");
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

                        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Name</p>
                                <input
                                    placeholder="Name"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                    id="name"
                                />
                            </label>

                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Symbol</p>
                                <input
                                    placeholder="Symbol"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                    id="symbol"
                                />
                            </label>
                        </div>

                        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Decimals</p>
                                <input
                                    placeholder="Decimals"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                    id="decimals"
                                />
                            </label>

                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Supply</p>
                                <input
                                    placeholder="Supply"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                    id="supply"
                                />
                            </label>
                        </div>

                        <div className="flex flex-col p-4">
                            <p className="text-white text-base font-medium leading-normal pb-2">Image</p>
                            <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#344d65] px-6 py-14">
                                <input type="file" onChange={handleImageChange} className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em] py-2"/>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-white text-base font-medium leading-normal pb-2">Description</p>
                                <textarea
                                    placeholder="Description"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                    id="description"
                                    rows={5}
                                />
                            </label> 
                        </div>

                        <p className="text-white px-4">{signature ? `Signature: ${signature}` : null}</p>
                        <p className="text-white px-4">{tokenMintAddress ? `Token Mint Address: ${tokenMintAddress}` : null}</p>
                        <p className="text-white px-4">{jsonFileUrl ? `JSON File URL: ${jsonFileUrl}` : null}</p>
                        <p className="text-white px-4">{imageUrl ? `Image URL: ${imageUrl}` : null}</p>

                        <div className="flex px-4 py-3 justify-end">
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                                disabled={loading}
                                onClick={handleImageUpload}
                            >
                                <span className="truncate">{loading ? 'Please wait...' : 'Create Token'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateToken