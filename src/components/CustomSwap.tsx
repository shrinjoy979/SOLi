import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction, Connection } from '@solana/web3.js';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

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
}

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return (...args: T) => {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const CustomSwap = () => {
    const [fromAsset, setFromAsset] = useState<TokenInfo>();
    const [toAsset, setToAsset] = useState<TokenInfo>();
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [quoteResponse, setQuoteResponse] = useState(null);
    const [availableTokens, setAvailableTokens] = useState<TokenInfo[]>([]);

    const wallet = useWallet();

    // Need a custom RPC so you don't get rate-limited
    const connection = new Connection(
        'https://solana-devnet.g.alchemy.com/v2/IR7u23Ytxfa-vBJZhy2fXkTnvxKGUPUa'
    );

    const handleFromAssetChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromAsset(availableTokens.find((token) => token.symbol === event.target.value));
    };

    const handleToAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToAsset(availableTokens.find((token) => token.symbol === event.target.value));
    };

    const handleFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromAmount(Number(event.target.value));
    };
    
    const debounceQuoteCall = useCallback(debounce(getQuote, 500), []);

    useEffect(() => {
        debounceQuoteCall(fromAsset, toAsset, fromAmount);
    }, [fromAmount, toAsset, debounceQuoteCall]);

    async function getQuote(fromAsset: any, toAsset: any, currentAmount: number) {
        if (isNaN(currentAmount) || currentAmount <= 0) {
            console.error('Invalid fromAmount value:', currentAmount);
            return;
        }

        const selectedFormAddress = fromAsset?.address;
        const selectedToAddress = toAsset?.address;
        const enteredAmount = currentAmount * Math.pow(10, Number(fromAsset?.decimals));

        const quote = await ( await fetch(
            `https://quote-api.jup.ag/v6/quote?inputMint=${selectedFormAddress}&outputMint=${selectedToAddress}&amount=${enteredAmount}&slippage=0.5`
        )).json();

        if (quote && quote.outAmount) {
            const outAmountNumber = Number(quote.outAmount) / Math.pow(10, Number(toAsset?.decimals));
            setToAmount(outAmountNumber);
        }

        setQuoteResponse(quote);
    }

    async function signAndSendTransaction() {
        if (!wallet.connected || !wallet.signTransaction) {
            toast.error(
                'Wallet is not connected or does not support signing transactions'
            );
            return;
        }

        if(!toAmount) { toast.error("Please enter the amount") }

        // get serialized transactions for the swap
        const { swapTransaction } = await (
            await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                quoteResponse,
                userPublicKey: wallet.publicKey?.toString(),
                wrapAndUnwrapSol: true,
                // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
                // feeAccount: "fee_account_public_key"
                }),
            })
        ).json();

        try {
            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
            const signedTransaction = await wallet.signTransaction(transaction);

            const rawTransaction = signedTransaction.serialize();
            const txid = await connection.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
                maxRetries: 2,
            });

            const latestBlockHash = await connection.getLatestBlockhash();
            await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: txid
            }, 'confirmed');
            
            console.log(`https://solscan.io/tx/${txid}`);
        } catch (error) {
            console.error('Error signing or sending the transaction:', error);
        }
    }

    useEffect(() => {
        async function getTopTokens() {
            try {
                const response = await fetch(
                    "https://api.jup.ag/tokens/v2/toptraded/5m",
                    {
                        method: "GET",
                        headers: {
                            "x-api-key": import.meta.env.VITE_JUP_API_KEY,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                const formattedTokens = data.map((token: any) => ({
                    name: token.name,
                    symbol: token.symbol,
                    address: token.address,
                    icon: token.icon,
                }));

                setAvailableTokens(formattedTokens);

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
                                        {availableTokens.map((token) => (
                                            <option key={token.address} value={token.symbol}>
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
                                        {availableTokens.map((token) => (
                                            <option key={token.address} value={token.symbol}>
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
                                        value={toAmount}
                                        placeholder="0.0"
                                        readOnly
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

                            <div className="pt-6">
                                <button
                                    className="w-full h-12 rounded-xl
                                    bg-indigo-600 hover:bg-indigo-700
                                    dark:bg-indigo-500 dark:hover:bg-indigo-600
                                    text-white text-sm font-bold
                                    transition-colors duration-300"
                                    onClick={signAndSendTransaction}
                                    disabled={toAsset?.address === fromAsset?.address}
                                >
                                    Swap
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
