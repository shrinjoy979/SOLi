import { useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction, Connection } from '@solana/web3.js';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

interface TokenInfo {
    address: string;
    created_at: string;
    daily_volume: number;
    decimals: number;
    extensions: {
        coingeckoId: string;
    };
    freeze_authority: string | null;
    logoURI: string;
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
        'https://api.devnet.solana.com'
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
    }, [fromAmount, debounceQuoteCall]);

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

    useEffect(()=>{
        async function getAllTokens(){
            const response  = await axios.get('https://tokens.jup.ag/tokens?tags=verified');
            setAvailableTokens(response.data);
            setFromAsset(response.data[0]);
            setToAsset(response.data[1]);
        }
        getAllTokens();
    },[])

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
                                        value={fromAsset?.symbol}
                                        onChange={handleFromAssetChange}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                                    >
                                        {availableTokens.map((token) => (
                                            <option key={token.address} value={token?.symbol}>
                                                {token.symbol}
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
                                        value={toAsset?.symbol}
                                        onChange={handleToAssetChange}
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                                    >
                                        {availableTokens.map((token) => (
                                            <option key={token.address} value={token.symbol}>
                                                {token.symbol}
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
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                                        readOnly
                                    />
                            </label>
                            </div>
                            <div className="flex justify-stretch">
                                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                                    <button
                                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                                        onClick={signAndSendTransaction}
                                        disabled={toAsset?.address === fromAsset?.address}
                                    >
                                        <span className="truncate">Swap</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomSwap;
