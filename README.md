
https://github.com/user-attachments/assets/15906af9-af3d-4706-bc8b-b355be70c7d1

## Links
- **Chrome Extensions GitHub Repository:**  
  <a href="https://github.com/shrinjoy979/solana-wallet-adapter-chrome-extensions" target="_blank">Open Repository</a>

# SOLi – Solana Web3 Dashboard

SOLi is a modern, fully responsive Web3 dashboard built on the Solana blockchain.
It provides essential wallet and token utilities in a clean UI with seamless Dark & Light theme support and complete mobile responsiveness.

---

## Features

- Request Devnet Airdrop
- Send SOL
- Send SPL Tokens
- Create Custom SPL Token
- Token Swap Integration
- Sign & Verify Messages
- List Wallet Transactions
- Generate Seed Phrase (Mnemonic)
- Generate Private & Public Keys
- Dark / Light Mode Toggle
- Fully Responsive (Mobile + Desktop)

---

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Solana Web3.js
- Solana Wallet Adapter
- Jupiter API (token swaps)
- Raydium SDK
- Vite (build tool)

---

## Setup Project

1. Clone the repository:
```bash
   git clone https://github.com/shrinjoy979/SOLi.git
   cd SOLi
```

2. Install dependencies:
```bash
   npm install
```

3. Generate an API key from [**Jupiter**](https://station.jup.ag/docs/apis/swap-api).

4. Create a `.env` file in the project root (based on `.env.example`) and add your key:
```env
   VITE_JUP_API_KEY=your_jupiter_api_key_here
```

5. Start the development server:
```bash
   npm run dev
```

6. Build for production:
```bash
   npm run build
```

7. Preview the production build locally:
```bash
   npm run preview
```

---

## Available Scripts

| Command           | Description                          |
|-------------------|---------------------------------------|
| `npm run dev`     | Start the local development server    |
| `npm run build`   | Type-check and build for production   |
| `npm run lint`    | Run ESLint checks                     |
| `npm run preview` | Preview the production build          |

---

## Browser Extension Support

SOLi integrates with the Solana Wallet Adapter Chrome Extensions repo linked above for wallet connectivity in the browser.

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/shrinjoy979/SOLi/issues).

## License

This project currently has no license file specified. Add a `LICENSE` file if you intend to open-source this under a specific license (e.g., MIT).
