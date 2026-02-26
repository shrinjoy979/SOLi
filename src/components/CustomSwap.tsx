import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction, Connection } from '@solana/web3.js';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

interface TokenInfo {
    address: string;
    created_at: string;
    daily_volume: number;
    decimals: number;
    extensions: {
        coingeckoId: string;
    };
    freeze_authority: string | null;
    icon: string;
    mint_authority: string | null;
    minted_at: string | null;
    permanent_delegate: string | null;
    symbol: string;
    tags: string[];
    mint: string;
    id: string;
}

const CustomSwap = () => {
    const [fromAsset, setFromAsset] = useState<TokenInfo>();
    const [toAsset, setToAsset] = useState<TokenInfo>();
    const [fromAmount, setFromAmount] = useState(0);
    const [availableTokens, setAvailableTokens] = useState<TokenInfo[]>([]);
    const [quoteResult, setQuoteResult] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();

    const connection = new Connection(
        'https://solana-devnet.g.alchemy.com/v2/IR7u23Ytxfa-vBJZhy2fXkTnvxKGUPUa'
    );

    const handleFromAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromAsset(
            availableTokens.find((token) => token.symbol === event.target.value)
        );
    };

    const handleToAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToAsset(
            availableTokens.find((token) => token.symbol === event.target.value)
        );
    };

    const handleFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromAmount(Number(event.target.value));
    };

    async function getSwapQuote() {
        try {
            console.log('inside getSwapQuote');
            if (!fromAsset || !toAsset) return;

            setLoading(true);
            setQuoteResult("");

            const amountSmallest = Math.floor(
                fromAmount * Math.pow(10, fromAsset.decimals)
            );

            const url = new URL("https://api.jup.ag/swap/v1/quote");

            url.searchParams.set("inputMint", fromAsset.id);
            url.searchParams.set("outputMint", toAsset.id);
            url.searchParams.set("amount", amountSmallest.toString());
            url.searchParams.set("slippageBps", "50");

            const res = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": import.meta.env.VITE_JUP_API_KEY,
                },
            });

            const response = await res.json();
            const outAmount = Number(response.outAmount) / Math.pow(10, toAsset.decimals);
            setQuoteResult(`${fromAmount} ${fromAsset.symbol} ≈ ${outAmount.toFixed(4)} ${toAsset.symbol}`);
        } catch (err) {
        console.error(err);
            setQuoteResult("Error getting quote");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function getTopTokens() {
            try {
                const response = await fetch(
                    "https://api.jup.ag/tokens/v2/toporganicscore/5m",
                    {
                        method: "GET",
                        headers: {
                            "x-api-key": import.meta.env.VITE_JUP_API_KEY,
                        },
                    }
                );

                const data = await response.json();
                setAvailableTokens(data);
                setFromAsset(data[0]);
                setToAsset(data[1]);
            } catch (error) {
                console.error("Error fetching tokens:", error);
            }
        }

        getTopTokens();
    }, []);

    return (
        <>
            <div className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center py-5 px-4 sm:px-6 md:px-10">
                    
                        <div className="layout-content-container flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl py-5 flex-1">
                            <h1 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em] pb-5">
                                Swap
                            </h1>

                            <div className="flex flex-col gap-4 py-3">
                                <label className="flex flex-col w-full">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800 dark:text-gray-200 text-base font-medium">
                                            From
                                        </p>
                                        {fromAsset?.icon && (
                                            <img
                                                src={fromAsset.icon}
                                                alt=""
                                                className="w-8 h-8 rounded-full"
                                            />
                                        )}
                                        </div>

                                        <select
                                            value={fromAsset?.symbol}
                                            onChange={handleFromAssetChange}
                                            className="mt-2 w-full rounded-xl h-14 px-4
                                            text-gray-900 dark:text-white
                                            bg-white dark:bg-gray-800
                                            border border-gray-300 dark:border-gray-700
                                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                                            transition-colors duration-300"
                                        >
                                            {availableTokens.map((token, index) => (
                                                <option key={index} value={token.symbol}>
                                                    {token.symbol}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label className="flex flex-col w-full">
                                        <p className="text-gray-800 dark:text-gray-200 text-base font-medium">
                                            Amount
                                        </p>
                                        <input
                                            type="number"
                                            value={fromAmount}
                                            onChange={handleFromValueChange}
                                            placeholder="0.0"
                                            className="mt-2 w-full rounded-xl h-14 px-4
                                            text-gray-900 dark:text-white
                                            bg-white dark:bg-gray-800
                                            border border-gray-300 dark:border-gray-700
                                            placeholder:text-gray-400 dark:placeholder:text-gray-500
                                            focus:outline-none focus:ring-2 focus:ring-indigo-500
                                            transition-colors duration-300"
                                        />
                                    </label>
                                </div>

                            <div className="flex flex-col gap-4 py-3">
                                <label className="flex flex-col w-full">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800 dark:text-gray-200 text-base font-medium">
                                            To
                                        </p>
                                        {toAsset?.icon && (
                                            <img
                                                src={toAsset.icon}
                                                alt=""
                                                className="w-8 h-8 rounded-full"
                                            />
                                        )}
                                    </div>

                                    <select
                                        value={toAsset?.symbol}
                                        onChange={handleToAssetChange}
                                        className="mt-2 w-full rounded-xl h-14 px-4
                                        text-gray-900 dark:text-white
                                        bg-white dark:bg-gray-800
                                        border border-gray-300 dark:border-gray-700
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        transition-colors duration-300"
                                    >
                                        {availableTokens.map((token, index) => (
                                            <option key={index} value={token.symbol}>
                                                {token.symbol}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className="pt-6">
                                {quoteResult && (
                                    <div className="bg-gray-100 p-3 rounded mb-2">
                                        {quoteResult}
                                    </div>
                                )}
                                <button
                                    className="w-full h-12 rounded-xl
                                    bg-indigo-600 hover:bg-indigo-700
                                    dark:bg-indigo-500 dark:hover:bg-indigo-600
                                    disabled:bg-gray-400 disabled:dark:bg-gray-700
                                    disabled:cursor-not-allowed disabled:opacity-60
                                    text-white text-sm font-bold
                                    transition-colors duration-300"
                                    onClick={getSwapQuote}
                                    disabled={loading || !fromAsset || !toAsset || !fromAmount || fromAsset?.id === toAsset?.id}
                                >
                                    {loading ? "Fetching..." : fromAsset?.id === toAsset?.id ? "Tokens cannot be the same" : "Get Quote"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomSwap;
