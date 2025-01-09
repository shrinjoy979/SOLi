const ReceiveSolana = () => {
    return (
        <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
            <div className="layout-container flex h-full grow flex-col">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#293038] px-10 py-3">
                <div className="flex items-center gap-4 text-white">
                    <div className="size-4">
                    
                    </div>
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Solana</h2>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="flex items-center gap-9">
                    <a className="text-white text-sm font-medium leading-normal" href="#">Wallet</a>
                    <a className="text-white text-sm font-medium leading-normal" href="#">Swap</a>
                    <a className="text-white text-sm font-medium leading-normal" href="#">Farm</a>
                    <a className="text-white text-sm font-medium leading-normal" href="#">Bridge</a>
                    <a className="text-white text-sm font-medium leading-normal" href="#">Explorer</a>
                    <a className="text-white text-sm font-medium leading-normal" href="#">More</a>
                    </div>
                    <div className="flex gap-2">
                    <button
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#293038] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                    >
                        <div className="text-white" data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                            ></path>
                        </svg>
                        </div>
                    </button>
                    <button
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#293038] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                    >
                        <div className="text-white" data-icon="Plus" data-size="20px" data-weight="regular">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                        </svg>
                        </div>
                    </button>
                    </div>
                    <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{ backgroundImage: `url("https://cdn.usegalileo.ai/sdxl10/7258a2c1-13b2-4bd1-a0fc-72c11178558e.png")` }}
                    ></div>
                </div>
                </header>
                <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
                    <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">Receive SOL</h1>
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                        <textarea
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none min-h-36 placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                        ></textarea>
                    </label>
                    </div>
                    <div className="flex justify-stretch">
                    <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
                        <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                        >
                        <span className="truncate">Copy</span>
                        </button>
                        <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#293038] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                        >
                        <span className="truncate">Share</span>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ReceiveSolana