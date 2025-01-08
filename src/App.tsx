import './App.css';
import Header from './components/header';
import Dashboard from './components/dashboard';
import SendSolana from './components/send-solana';
import ReceiveSolana from './components/receive-solana';

function App() {

  return (
    <>
      <Header />
      <Dashboard />
      <SendSolana />
      <ReceiveSolana />
    </>
  )
}

export default App
