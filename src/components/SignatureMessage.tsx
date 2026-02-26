import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from 'bs58';
import { useState } from "react";
import { toast } from 'react-toastify';
import SelectWallet from './SelectWallet';

const SignatureMessage = () => {
    const wallet = useWallet();
    const [message, setMessage] = useState("");
    const { publicKey, signMessage } = useWallet();
    const [signature, setSignature] = useState<Uint8Array>();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    async function handleSubmit() {
        if (!publicKey) throw new Error("Walletnot connected");
        if (!signMessage) throw new Error("Wallet does not support message signing!");

        const encodedMessage = new TextEncoder().encode(message);
        setSignature(await signMessage(encodedMessage));

        // if (!signature || signature.length !== 64) {
        //     throw new Error(`Invalid signature: Expected 64 bytes, got ${signature ? signature.length : 0}.`);
        // }
        
        // // Verify the signature
        // if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
        //     throw new Error('Message signature invalid!');
        // }

        if (!ed25519.verify(signature ?? new Uint8Array(), encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        toast.success(`Signature: ${bs58.encode(signature ?? new Uint8Array())}`);
    }

    return (
        <div className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center px-4 sm:px-6 md:px-10 py-6">
                    {wallet.publicKey ? 
                        <div className="flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl py-6">
                            <h1 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                                Signature Message
                            </h1>

                            {signature && (
                                <p className="text-gray-800 dark:text-gray-300 break-all text-sm sm:text-base mb-4">
                                {`Message signature: ${bs58.encode(signature)}`}
                                </p>
                            )}

                            <div className="flex flex-col gap-4">
                                <input
                                    placeholder="Message"
                                    className="w-full rounded-xl
                                        bg-white dark:bg-[#1c2126]
                                        text-gray-900 dark:text-white
                                        border border-gray-300 dark:border-[#3c4753]
                                        placeholder:text-gray-400 dark:placeholder:text-[#9dabb8]
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        h-12 sm:h-14 px-4 text-sm sm:text-base
                                        transition-colors duration-300"
                                    id="message"
                                    required
                                    onChange={handleInputChange}
                                />

                                <button
                                    className={`w-full sm:w-auto flex items-center justify-center 
                                        rounded-full h-10 px-6 text-sm font-bold 
                                        transition-all duration-300
                                        ${message
                                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                                        }`}
                                    onClick={handleSubmit}
                                    disabled={!message}
                                >
                                    Sign message
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

export default SignatureMessage;
