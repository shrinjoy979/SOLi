import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";

const SeedPhrase = () => {
    const [mnemonic, setMnemonic] = useState<String[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [showPrivateKey, setShowPrivateKey] = useState(false);

    const copySeed = () => {
        navigator.clipboard.writeText(mnemonic.join(" "));
        toast.success("Seed phrase copied!");
    };

    useEffect(() => {
        try {
            const mnemonic = generateMnemonic();
            const words = mnemonic.split(" ");
            setMnemonic(words);

            // Convert mnemonic → seed buffer
            const seed = mnemonicToSeedSync(mnemonic);

            // Derivation path for Solana
            const path = "m/44'/501'/0'/0'";
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const keypair = Keypair.fromSeed(derivedSeed);

            // Convert public key to readable format
            const publicKey = keypair.publicKey.toBase58();
            setPublicKey(publicKey);

            const privateKey = keypair.secretKey;
            setPrivateKey(Buffer.from(privateKey).toString("base58"));
        } catch(e) {
            console.error('Error in create mnemonic', e);
        }
    }, []);

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col mt-5">
                <div className="">
                    <div className="px-6 py-6 text-center">
                        <h1 className="text-2xl font-semibold text-white">
                            Your Recovery Phrase
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            Write these 12 words down in order and keep them safe. Anyone with this phrase can access your wallet.
                        </p>
                    </div>

                    <div
                        className="px-6 flex-1 flex justify-center relative mt-5"
                    >
                        <div
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className={`grid grid-cols-3 gap-3 w-full max-w-md transition duration-300 cursor-pointer
                            ${!isHovering ? "blur-md select-none" : ""}`}
                        >
                            {mnemonic.map((word, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg text-center font-medium"
                                >
                                    {index + 1}. {word}
                                </div>
                            ))}
                        </div>

                        {!isHovering && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-black/60 p-6 rounded-full">
                                    <FiEyeOff size={40} className="text-white" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-6 flex gap-3 justify-center mt-5">
                        <button
                            onClick={copySeed}
                            className="flex-1 max-w-xs bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                        >
                            Copy
                        </button>

                        <button
                            className="flex-1 max-w-xs bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg transition"
                        >
                            I've Saved It
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default SeedPhrase;
