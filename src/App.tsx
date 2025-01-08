import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/dashboard'
import SendSolana from './components/send-solana'
import ReceiveSolana from './components/receive-solana'
import Header from './components/header'

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
