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
    <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
        <div className="layout-container flex h-full grow flex-col">
            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl font-semibold text-white">
                            Your Recovery Phrase
                        </h1>
                        <p className="text-sm text-gray-400">
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
                                        className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg text-center font-medium"
                                    >
                                        {index + 1}. {word}
                                    </div>
                                ))}
                            </div>

                            {!isHovering && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/70 p-5 rounded-full">
                                        <FiEyeOff size={32} className="text-white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={copySeed}
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
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

                    <div className="flex justify-between items-center border-t border-gray-700 pt-6 mt-4">
                        <h2 className="text-lg font-semibold text-white">Wallets</h2>

                        <div className="flex gap-3">
                            <button
                                onClick={addWallet}
                                className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition"
                            >
                                Add Wallet
                            </button>

                            <button
                                onClick={clearWallets}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    <div className="" id="wallets">
                        {wallets.map((wallet, index) => (
                            <div
                                key={index}
                                className="bg-[#1f2937] rounded-2xl p-6 relative space-y-5 mt-4"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-white font-medium">
                                        Wallet {index + 1}
                                    </h3>

                                    <FiTrash2
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => setWallets((prev) => prev.filter((_, i) => i !== index))}
                                    />
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Public Key</p>
                                    <div className="bg-black/40 p-3 rounded-lg text-white text-sm break-all">
                                        {wallet.publicKey}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Private Key</p>

                                    <div className="relative bg-black/40 p-3 rounded-lg text-white text-sm break-all pr-10">
                                        {visibleKeys[index] ? wallet.privateKey : "•".repeat(64)}

                                        <button
                                            onClick={() =>
                                                setVisibleKeys((prev) => ({...prev, [index]: !prev[index], }))
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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
