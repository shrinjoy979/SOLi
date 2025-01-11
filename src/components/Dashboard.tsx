import Pinata from "./Pinata"
import Transactions from "./Transactions"

const Dashboard = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
        <div className="layout-container flex h-full grow flex-col">
          <div className="gap-1 px-6 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-80">
              <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#111418] p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#293038]">
                      <div className="text-white" data-icon="ChartBar" data-size="24px" data-weight="fill">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1,0-16h8V136a8,8,0,0,1,8-8H72a8,8,0,0,1,8,8v64H96V88a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V200h16V40a8,8,0,0,1,8-8h40a8,8,0,0,1,8,8V200h8A8,8,0,0,1,232,208Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">Overview</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-white" data-icon="List" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">Activity</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-white" data-icon="ArrowUp" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">Send</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-white" data-icon="ArrowDown" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">Receive</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-white" data-icon="ArrowCircleUp" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-101.66a8,8,0,0,1-11.32,11.32L136,107.31V168a8,8,0,0,1-16,0V107.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">Stake</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-white" data-icon="Repeat" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M24,128A72.08,72.08,0,0,1,96,56H204.69L194.34,45.66a8,8,0,0,1,11.32-11.32l24,24a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L204.69,72H96a56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0Zm200-8a8,8,0,0,0-8,8,56.06,56.06,0,0,1-56,56H51.31l10.35-10.34a8,8,0,0,0-11.32-11.32l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L51.31,200H160a72.08,72.08,0,0,0,72-72A8,8,0,0,0,224,120Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">Swap</p>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="text-white" data-icon="CheckCircle" data-size="24px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">Governance</p>
                    </div>
                  </div>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Send</span>
                </button>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/9d73b9a7-8829-49b9-ad16-e537a0475800.png")` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">SOL</p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/380f9ee0-8317-433d-8a5c-61241d1dc0ff.png")` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">USDC</p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/90a74da5-925c-4c7b-b155-d0e14b94dd87.png")` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">USDT</p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/907070f9-1e3d-4edf-8010-a259973c114e.png")` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">BTC</p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#111418] px-4 min-h-[72px] py-2">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/79f1aded-b497-4db7-84d8-b5dbd2d3b99b.png")` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">ETH</p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">0.00</p>
                </div>
              </div>
            </div>
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Wallet</p></div>
              <div className="flex flex-wrap gap-3 px-4 py-3">
                <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#3c4753] p-3 items-center text-center">
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">$0.00</p>
                  <div className="flex items-center gap-2"><p className="text-[#9dabb8] text-sm font-normal leading-normal">Total Balance</p></div>
                </div>
                <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#3c4753] p-3 items-center text-center">
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">0.00</p>
                  <div className="flex items-center gap-2"><p className="text-[#9dabb8] text-sm font-normal leading-normal">Available Balance</p></div>
                </div>
                <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#3c4753] p-3 items-center text-center">
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">0.00</p>
                  <div className="flex items-center gap-2"><p className="text-[#9dabb8] text-sm font-normal leading-normal">In Orders</p></div>
                </div>
                <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#3c4753] p-3 items-center text-center">
                  <p className="text-white tracking-light text-2xl font-bold leading-tight">0.00</p>
                  <div className="flex items-center gap-2"><p className="text-[#9dabb8] text-sm font-normal leading-normal">In Stakes</p></div>
                </div>
              </div>
              <Pinata />
              <Transactions />              

            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard