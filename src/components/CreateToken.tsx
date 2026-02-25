import { ExtensionType, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE, createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, getAssociatedTokenAddressSync, getMintLen } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SelectWallet from "./SelectWallet";

const CreateToken = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [signature, setSignature] = useState<string | undefined>(undefined);

    const [tokenImage, setTokenImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [decimals, setDecimals] = useState("");
    const [supply, setSupply] = useState("");

    const handleImageChange = (e: any) => {
        setTokenImage(e.target.files[0]);
    };

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSymbolInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleDecimalsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDecimals(event.target.value);
    };

    const handleSupplyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupply(event.target.value);
    };

    const handleImageUpload = async () => {
        if(!name) toast.error("Please enter name");
        if(!symbol) toast.error("Please enter symbol");
        if(!description) toast.error("Please enter description");
        if(!decimals) toast.error("Please enter decimals");
        if(!supply) toast.error("Please enter supply");

        if (!tokenImage) {
            toast.error('Please select an image');
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
            createToken(metadataURL);

        } catch (error) {
            console.error('Error uploading image or JSON:', error);
            alert('Failed to upload image or JSON');
        }
    };

    async function createToken(metadataURL: any) {
        // const revokeMintAuthority = (document.getElementById("revokeMintAuthority") as HTMLInputElement)!.checked;
        // const revokeFreezeAuthority = (document.getElementById("revokeFreezeAuthority") as HTMLInputElement)!.checked;
        // const revokeUpdateAuthority = (document.getElementById("revokeUpdateAuthority") as HTMLInputElement)?.checked;

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

        // Add revoke instructions if necessary
        // if (revokeFreezeAuthority) {
        //     transaction.add(await createRevokeAuthorityInstruction(mintKeypair.publicKey, 'freeze', wallet.publicKey!));
        // }

        // if (revokeMintAuthority) {
        //     transaction.add(await createRevokeAuthorityInstruction(mintKeypair.publicKey, 'mint', wallet.publicKey!));
        // }

        // if (revokeUpdateAuthority) {
        //     transaction.add(await createRevokeAuthorityInstruction(mintKeypair.publicKey, 'update', wallet.publicKey!));
        // }

        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey!;

        transaction.partialSign(mintKeypair);
        let response = await wallet.sendTransaction(transaction, connection);
        setSignature(response);
        
        // token mint address: mintKeypair.publicKey?.toBase58()

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

        setLoading(false);
        toast.success("Token created and Minted successfully.");
    }

    const InputField = ({ label, onChange }: any) => (
        <div className="flex flex-col">
            <p className="text-gray-900 dark:text-white font-medium mb-2">
                {label}
            </p>
            <input
                placeholder={label}
                onChange={onChange}
                className="w-full rounded-xl
                    bg-white dark:bg-[#1c2126]
                    text-gray-900 dark:text-white
                    border border-gray-300 dark:border-[#3c4753]
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    h-12 px-4 transition-colors duration-300"
            />
        </div>
    );

    const Checkbox = ({ label, id }: any) => (
        <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
            <input type="checkbox" id={id} />
            {label}
        </label>
    );

    return (
        <div
            className="min-h-screen w-full bg-gray-100 dark:bg-[#111418] transition-colors duration-300 overflow-x-hidden"
            style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}
        >
            <div className="flex flex-1 justify-center px-4 sm:px-6 md:px-10 py-6">
                {wallet.publicKey ? (
                    <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl flex flex-col gap-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Create Token
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Name" onChange={handleNameInputChange} />
                            <InputField label="Symbol" onChange={handleSymbolInputChange} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Decimals" onChange={handleDecimalsInputChange} />
                            <InputField label="Supply" onChange={handleSupplyInputChange} />
                        </div>

                        <div>
                            <p className="text-gray-900 dark:text-white font-medium mb-2">Image</p>
                            <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed 
                                border-gray-300 dark:border-gray-600 
                                bg-gray-50 dark:bg-gray-800 
                                px-4 py-10 sm:py-14">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl px-4 bg-gray-100 dark:bg-[#111418] text-gray-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] py-2"
                                    />
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-900 dark:text-white font-medium mb-2">
                                Description
                            </p>
                            <textarea
                                placeholder="Description"
                                rows={4}
                                onChange={handleDescriptionInputChange}
                                className="w-full rounded-xl
                                    bg-white dark:bg-[#1c2126]
                                    text-gray-900 dark:text-white
                                    border border-gray-300 dark:border-[#3c4753]
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                                    p-4 transition-colors duration-300"
                                />
                        </div>

                        {signature && (
                            <p className="text-sm break-all text-gray-700 dark:text-gray-300">
                                Signature: {signature}
                            </p>
                        )}

                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Revoke Authorities
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                            <Checkbox label="Mint Authority" id="revokeMintAuthority" />
                            <Checkbox label="Freeze Authority" id="revokeFreezeAuthority" />
                            <Checkbox label="Update Authority" id="revokeUpdateAuthority" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                disabled={loading}
                                onClick={handleImageUpload}
                                className="w-full sm:w-auto rounded-full h-10 px-6
                                    bg-indigo-600 hover:bg-indigo-700
                                    text-white text-sm font-bold
                                    transition-all duration-300"
                                >
                                    {loading ? "Please wait..." : "Create Token"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <SelectWallet />
                )}
            </div>
        </div>
    );
}

export default CreateToken;
