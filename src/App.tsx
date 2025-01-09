import './App.css';
import Header from './components/header';
import Dashboard from './components/dashboard';
import SendSolana from './components/send-solana';
import ReceiveSolana from './components/receive-solana';
import RequestAirdrop from './components/RequestAirdrop';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function App() {

  return (
    <>
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
      <Header />
      <Dashboard />
      <SendSolana />
      <ReceiveSolana />
      <RequestAirdrop />
      </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
    </>
  )
}

export default App
