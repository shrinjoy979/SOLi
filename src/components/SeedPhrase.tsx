import { generateMnemonic } from "bip39";
import { useEffect, useState } from "react";

const SeedPhrase = () => {
    const [mnemonic, setMnemonic] = useState<String[]>([]);

    const copySeed = () => {
        navigator.clipboard.writeText(mnemonic.join(" "));
        alert("Seed phrase copied!");
    };

    useEffect(() => {
        try {
            const mnemonic = generateMnemonic();
            const words = mnemonic.split(" ");
            setMnemonic(words);
        } catch(e) {
            console.error('Error in mnemonic', e);
        }
    }, []);

    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                <div className="">
                    <div className="px-6 py-6 text-center">
                    <h1 className="text-2xl font-semibold text-white">
                        Your Recovery Phrase
                    </h1>
                    <p className="text-sm text-gray-400 mt-2">
                        Write these 12 words down in order and keep them safe.
                    </p>
                    </div>

                    <div className="px-6 flex-1 flex justify-center">
                    <div className="grid grid-cols-3 gap-3 w-full max-w-md">

                        {mnemonic.map((word, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg text-center font-medium"
                        >
                            {index + 1}. {word}
                        </div>
                        ))}

                    </div>
                    </div>

                    <div className="px-6 py-6 flex gap-3 justify-center">

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

                    <div className="px-6 pb-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <p className="text-xs text-yellow-400 text-center">
                        Anyone with this phrase can access your wallet.
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeedPhrase;
