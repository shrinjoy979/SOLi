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
        <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="px-40 flex flex-1 justify-center py-5">
                {wallet.publicKey ? 
                    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                        <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Signature Message</h1>
                        {signature ? <p className="text-white px-4">{`Message signature: ${bs58.encode(signature)}`}</p> : null}
                        
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <input
                                    placeholder="Message"
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                                    id="message"
                                    required={true}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>

                        <div className="flex justify-stretch">
                            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
                                <button
                                    className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] bg-[#1980e6] text-white cursor-pointer ${
                                        message
                                        ? "bg-[#1980e6] text-white cursor-pointer"
                                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    }`}
                                    onClick={handleSubmit}
                                    disabled={!message}
                                >
                                    <span className="truncate">Sign message</span>
                                </button>
                            </div>
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

export default SignatureMessage