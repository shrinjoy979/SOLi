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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                              <path
                                d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"
                              ></path>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                              <path
                                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-101.66a8,8,0,0,1-11.32,11.32L136,107.31V168a8,8,0,0,1-16,0V107.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z"
                              ></path>
                            </svg>
                          </div>
                          <p className="text-white text-sm font-medium leading-normal">Create Token</p>
                        </NavLink>

                      </div>
                    </div>
                  </div>
                </div>
                <Transactions />
              </>
            :
              <SelectWallet />
            }
          </div>
        </div>
    </div>
  )
}

export default Dashboard;
