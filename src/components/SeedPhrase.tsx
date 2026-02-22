import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import { FiTrash2, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";

const SeedPhrase = () => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  const [wallets, setWallets] = useState<{ publicKey: string; privateKey: string }[]>([]);
  const [walletIndex, setWalletIndex] = useState(0);
  const [visibleKeys, setVisibleKeys] = useState<{ [key: number]: boolean }>({});

  const generateWallet = (mnemonic: string, accountIndex: number) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${accountIndex}'/0'`;

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    return {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey),
    };
  };

  const copySeed = () => {
    navigator.clipboard.writeText(mnemonic);
    toast.success("Seed phrase copied!");
  };

  const addWallet = () => {
    const wallet = generateWallet(mnemonic, walletIndex);
    setWallets((prev) => [...prev, wallet]);
    setWalletIndex((prev) => prev + 1);
  };

  const clearWallets = () => {
    setWallets([]);
    setWalletIndex(0);
    setVisibleKeys({});
  };

  useEffect(() => {
    try {
      const newMnemonic = generateMnemonic();
      setMnemonic(newMnemonic);

      const firstWallet = generateWallet(newMnemonic, 0);

      setWallets([firstWallet]);
      setWalletIndex(1);
    } catch (e) {
      console.error("Error creating mnemonic", e);
    }
  }, []);

  return (
    <div 
        className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden"
        style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}
    >
        <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Your Recovery Phrase
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Write these 12 words down in order and keep them safe.
                        </p>

                        <div className="relative flex justify-center mt-6">
                            <div
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                className={`grid grid-cols-3 gap-3 w-full max-w-md transition duration-300 cursor-pointer ${!isHovering ? "blur-md select-none" : ""}`}
                            >
                                {mnemonic.split(" ").map((word, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-gray-800 
                                            text-gray-900 dark:text-white 
                                            text-sm px-3 py-2 rounded-lg text-center font-medium 
                                            border border-gray-200 dark:border-gray-700 
                                            transition-colors duration-300"
                                    >
                                        {index + 1}. {word}
                                    </div>
                                ))}
                            </div>

                            {!isHovering && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/60 dark:bg-black/70 p-5 rounded-full">
                                        <FiEyeOff size={32} className="text-white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={copySeed}
                                className="px-6 py-2 
                                    bg-gray-200 hover:bg-gray-300 
                                    dark:bg-gray-700 dark:hover:bg-gray-600 
                                    text-gray-900 dark:text-white 
                                    rounded-lg transition-colors duration-300"
                            >
                                Copy
                            </button>

                            <button 
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition" 
                                onClick={() =>
                                    document.getElementById("wallets")?.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                I've Saved It
                            </button>
                        </div>
                    </div>

                    <div
                        className="flex justify-between items-center 
                        border-t border-gray-300 dark:border-gray-700 
                        pt-6 mt-4 transition-colors duration-300"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Wallets</h2>

                        <div className="flex gap-3">
                            <div className="flex gap-4">
                                <button
                                    onClick={addWallet}
                                    className="px-5 py-2.5 rounded-xl font-medium 
                                            bg-gradient-to-r from-indigo-500 to-purple-600 
                                            text-white shadow-lg shadow-indigo-500/20
                                            hover:shadow-indigo-500/40 hover:scale-105 
                                            active:scale-95 
                                            transition-all duration-300 ease-in-out"
                                >
                                    + Add Wallet
                                </button>

                                <button
                                    onClick={clearWallets}
                                    className="px-5 py-2.5 rounded-xl font-medium
                                            bg-gray-200 dark:bg-gray-800 text-red-400 border border-red-500/30
                                            hover:bg-red-600 hover:text-white hover:border-red-600
                                            hover:scale-105 active:scale-95
                                            transition-all duration-300 ease-in-out"
                                >
                                    Clear Wallets
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="" id="wallets">
                        {wallets.map((wallet, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 
                                border border-gray-200 dark:border-gray-700
                                rounded-2xl p-6 relative space-y-5 mt-4 
                                transition-colors duration-300"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-gray-900 dark:text-white font-medium">
                                        Wallet {index + 1}
                                    </h3>

                                    <FiTrash2
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => setWallets((prev) => prev.filter((_, i) => i !== index))}
                                    />
                                </div>

                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Public Key</p>
                                    <div
                                        className="bg-gray-100 dark:bg-black/40 
                                        text-gray-900 dark:text-white 
                                        p-3 rounded-lg text-sm break-all 
                                        transition-colors duration-300"
                                    >
                                        {wallet.publicKey}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Private Key</p>

                                    <div
                                        className="relative 
                                        bg-gray-100 dark:bg-black/40
                                        text-gray-900 dark:text-white
                                        p-3 rounded-lg text-sm break-all pr-10
                                        border border-gray-300 dark:border-gray-700
                                        transition-colors duration-300"
                                    >
                                        {visibleKeys[index] ? wallet.privateKey : "•".repeat(64)}

                                        <button
                                            onClick={() =>
                                                setVisibleKeys((prev) => ({...prev, [index]: !prev[index], }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 
                                            text-gray-600 dark:text-gray-400 
                                            hover:text-gray-900 dark:hover:text-white 
                                            transition-colors duration-200"
                                        >
                                            <FiEyeOff size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default SeedPhrase;
