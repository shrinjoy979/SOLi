import { useEffect } from "react";

/**
  The declare global block in TypeScript is used to extend or modify global types. It allows us to add custom properties or methods to global objects like window, document, etc.

  In the provided code, we're using window.Jupiter, but window does not natively include a Jupiter property. TypeScript, being strongly typed, doesn't recognize window.Jupiter and will throw an error unless you explicitly tell it that such a property exists.

  By adding this declaration, you're informing TypeScript about the shape and type of the Jupiter object attached to the window object.
*/

declare global {
  interface Window {
    Jupiter: {
      init: (config: { containerId: string; endpoint: string }) => void;
    };
  }
}

const JupiterTerminalSwap = () => {
  useEffect(() => {
    // Check if the Jupiter object exists on the window
    if (window.Jupiter) {
      window.Jupiter.init({
        containerId: 'jupiter-terminal', // ID of the container div
        endpoint: 'https://api.devnet.solana.com', // Solana RPC endpoint
      });
    } else {
      console.error('Jupiter object is not available on the window. Ensure the script is loaded correctly.');
    }
  }, []);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: `"Work Sans", "Noto Sans", sans-serif` }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div id="jupiter-terminal" />
        </div>
      </div>
    </div>
  )
}

export default JupiterTerminalSwap;
