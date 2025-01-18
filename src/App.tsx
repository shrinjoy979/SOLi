import './App.css';
import RequestAirdrop from './components/RequestAirdrop';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import SendTokens from './components/SendSolana';
import SignatureMessage from './components/SignatureMessage';
import CreateToken from './components/CreateToken';
import CustomSwap from './components/CustomSwap';

function App() {

  return (
    // https://solana-devnet.g.alchemy.com/v2/IR7u23Ytxfa-vBJZhy2fXkTnvxKGUPUa | https://api.devnet.solana.com
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                <Router>
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/request-airdrop" element={<RequestAirdrop />} />
                      <Route path="/send-tokens" element={<SendTokens />} />
                      <Route path="/sign-a-message" element={<SignatureMessage />} />
                      <Route path="/create-a-token" element={<CreateToken />} />
                      <Route path="/swap" element={<CustomSwap />} />
                    </Routes>
                  </MainLayout>
                </Router>
              </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <ToastContainer />
    </>
  )
}

export default App
