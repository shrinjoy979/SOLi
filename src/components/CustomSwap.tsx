// import styles from './swap.module.css';
import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction, Connection } from '@solana/web3.js';
import React, { useState, useEffect, useCallback } from 'react';

const assets = [
  { name: 'SOL', mint: 'So11111111111111111111111111111111111111112', decimals: 9},
  { name: 'USDC', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6},
  { name: 'BONK', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5 },
  { name: 'WIF', mint: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', decimals: 6},
];

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
    const [fromAsset, setFromAsset] = useState(assets[0]);
    const [toAsset, setToAsset] = useState(assets[1]);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [quoteResponse, setQuoteResponse] = useState(null);

    const wallet = useWallet();

    // Need a custom RPC so you don't get rate-limited, don't rely on users' wallets
    const connection = new Connection(
        'https://api.devnet.solana.com'
    );

    const handleFromAssetChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setFromAsset(assets.find((asset) => asset.name === event.target.value) || assets[0]);
    };

    const handleToAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setToAsset(assets.find((asset) => asset.name === event.target.value) || assets[0]);
    };

    const handleFromValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromAmount(Number(event.target.value));
    };
    
    const debounceQuoteCall = useCallback(debounce(getQuote, 500), []);

    useEffect(() => {
        debounceQuoteCall(fromAmount);
    }, [fromAmount, debounceQuoteCall]);

    async function getQuote(currentAmount: number) {
        if (isNaN(currentAmount) || currentAmount <= 0) {
            console.error('Invalid fromAmount value:', currentAmount);
            return;
        }

        const quote = await ( await fetch(
            `https://quote-api.jup.ag/v6/quote?inputMint=${fromAsset.mint}&outputMint=${toAsset.mint}&amount=${currentAmount * Math.pow(10, fromAsset.decimals)}&slippage=0.5`
        )).json();

        if (quote && quote.outAmount) {
            const outAmountNumber = Number(quote.outAmount) / Math.pow(10, toAsset.decimals);
            setToAmount(outAmountNumber);
        }

        setQuoteResponse(quote);
    }

    async function signAndSendTransaction() {
        if (!wallet.connected || !wallet.signTransaction) {
            console.error(
                'Wallet is not connected or does not support signing transactions'
            );
            return;
        }

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

    return (
        <>
            <div
                className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden"
            >
                <div className="layout-container flex h-full grow flex-col">
                    <div className="px-40 flex flex-1 justify-center py-5">
                        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                            <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Swap</h1>
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">From</p>
                                    <select
                                        value={fromAsset.name}
                                        onChange={handleFromAssetChange}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                                    >
                                        {assets.map((asset) => (
                                            <option key={asset.mint} value={asset.name}>
                                                {asset.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">Amount</p>
                                    <input
                                        type="number"
                                        value={fromAmount}
                                        onChange={handleFromValueChange}
                                        placeholder="0.0"
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                                    />
                                </label>
                            </div>
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">To</p>
                                    <select
                                        value={toAsset.name}
                                        onChange={handleToAssetChange}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                                    >
                                        {assets.map((asset) => (
                                        <option key={asset.mint} value={asset.name}>
                                            {asset.name}
                                        </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                <label className="flex flex-col min-w-40 flex-1">
                                    <p className="text-white text-base font-medium leading-normal pb-2">Amount</p>
                                    <input
                                        type="number"
                                        value={toAmount}
                                        placeholder="0.0"
                                        // onChange={(e) => setToAmount(Number(e.target.value))}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                                        readOnly
                                    />
                            </label>
                            </div>
                            <div className="flex justify-stretch">
                                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#293038] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                                    >
                                        <span className="truncate">Max</span>
                                    </button>
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                                        onClick={signAndSendTransaction}
                                        disabled={toAsset.mint === fromAsset.mint}
                                    >
                                        <span className="truncate">Swap</span>
                                    </button>
                                </div>
                            </div>
                            <p className="text-[#9dabb8] text-sm font-normal leading-normal pb-3 pt-1 px-4">Transaction Fee: $0.00 (0.0005 BTC)</p>
                            <p className="text-[#9dabb8] text-sm font-normal leading-normal pb-3 pt-1 px-4">You will receive: 0.0 ETH</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomSwap;