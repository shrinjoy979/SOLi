import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const ShowBalance = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;

      const lamports = await connection.getBalance(publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL);
    };

    fetchBalance();
  }, [publicKey, connection]);

  if (!publicKey) return null;

  return (
    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
      Balance:{" "}
      <span className="font-semibold text-indigo-500">
        {balance !== null ? balance : "Loading..."}
      </span>{" "}
      SOL
    </p>
  );
};

export default ShowBalance;
