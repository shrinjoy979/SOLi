import { useWallet } from "@solana/wallet-adapter-react";
import Transactions from "./Transactions";
import SelectWallet from "./SelectWallet";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const wallet = useWallet();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
        <div className="layout-container flex h-full grow flex-col">
          <div className="gap-1 px-6 flex flex-1 justify-center py-5">
            {wallet.publicKey ?
              <>
                <div className="layout-content-container flex flex-col w-80">
                  <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#111418] p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">

                        <NavLink
                          to="/"
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 ${isActive ? "rounded-full bg-[#293038]" : ""}`
                          }
                        >
                          <div className="text-white" data-icon="ChartBar" data-size="24px" data-weight="fill">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                              <path
                                d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z"
                              ></path>
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium leading-normal">Overview</p>
                        </NavLink>

                        <NavLink
                          to="/request-airdrop"
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 ${isActive ? "rounded-full bg-[#293038]" : ""}`
                          }
                        >
                          <div className="text-white" data-icon="List" data-size="24px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                              <path
                                d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
                              ></path>
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium leading-normal">Request Airdrop</p>
                        </NavLink>

                        <NavLink
                          to="/send-tokens"
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 ${isActive ? "rounded-full bg-[#293038]" : ""}`
                          }
                        >
                          <div className="text-white" data-icon="ArrowUp" data-size="24px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                              <path
                                d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"
                              ></path>
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium leading-normal">Send Tokens</p>
                        </NavLink>

                        <NavLink
                          to="/sign-a-message"
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 ${isActive ? "rounded-full bg-[#293038]" : ""}`
                          }
                        >
                          <div className="text-white" data-icon="ArrowDown" data-size="24px" data-weight="regular">
                            <svg width="24px" height="24px" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 75 C 40 20, 80 20, 110 75 S 200 130, 250 75" 
                                fill="none" 
                                stroke="white" 
                                stroke-width="12" />
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium leading-normal">Sign Message</p>
                        </NavLink>

                        <NavLink
                          to="/create-a-token"
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 ${isActive ? "rounded-full bg-[#293038]" : ""}`
                          }
                        >
                          <div className="text-white" data-icon="ArrowCircleUp" data-size="24px" data-weight="regular">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24px"
                              height="24px"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                                <circle cx="12" cy="12" r="8" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium leading-normal">Create Token</p>
                        </NavLink>

                        <NavLink
                          to="/swap"
                          className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2 ${isActive ? "rounded-full bg-[#293038]" : ""}`
                          }
                        >
                          <div className="text-white" data-icon="ArrowCircleUp" data-size="24px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                              <path d="M6.29 8.71a1 1 0 0 0 1.42 0L9 7.41V14a1 1 0 1 0 2 0V7.41l1.29 1.3a1 1 0 1 0 1.42-1.42l-3-3a1 1 0 0 0-1.42 0l-3 3a1 1 0 0 0 0 1.42zM17.71 15.29a1 1 0 0 0-1.42 0L15 16.59V10a1 1 0 1 0-2 0v6.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42z"/>
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium leading-normal">Swap</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <Transactions />
              </>
            :
            <>
              <SelectWallet />
            </>
            }
          </div>
        </div>
    </div>
  )
}

export default Dashboard;
