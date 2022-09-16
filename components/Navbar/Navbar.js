import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [address, setAddress] = useState(
    ""
  );
  const [balance, setBalance] = useState(0);
  

  // useEffect(() => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum,"any");
  //   provider.on("networkChanged", (newNetwork, oldNetwork) => {
  //   })
  // });

  const networks = {
    ropsten: {
      chainId: `0x3`,
      chainName: "Ropsten Network",
      nativeCurrency: {
        name: "ETHER Token",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://ropsten.infura.io/v3/"],
      blockExplorerUrls: ["https://ropsten.etherscan.io/"],
    },
  };

  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer =await provider.getSigner();
    const chainId = await provider.getNetwork();
    if (chainId.name !== 'ropsten'){
      try{
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x3'}],
        });
        // window.ethereum.request({
        //   method: "wallet_addEthereumChain",
        //   params: [
        //     {
        //       ...networks["ropsten"],
        //     },
        //   ],
        // })
      }
      catch(error){
        toast(error.message);
      }
      
    }
    const address = await signer.getAddress();
    const balance = ethers.utils.formatEther(await signer.getBalance());
    setAddress(address);
    setBalance(balance);
  };
  return (
    <div>
      <div className="flex justify-between p-2 rounded-sm text-shadow-md border-b border-yellow-500 shadow shadow-yellow-500">
        <div>
          <div className="flex gap-5 justify-center">
            <h1 className="my-auto font-bold text-2xl text-slate-600">
              Product Shop
            </h1>
            <ul className="flex gap-3">
              <Link href="/">
                <li className="border border-transparent py-2 px-3 rounded-full text-gray-500 hover:cursor-pointer hover:border-yellow-700 hover:text-white hover:border hover:shadow-yellow-800 hover:shadow-lg">
                  Home
                </li>
              </Link>
              <Link href="/create_product">
                <li className="border border-transparent py-2 px-3 rounded-full text-gray-500 hover:cursor-pointer hover:border-yellow-700 hover:text-white hover:border hover:shadow-yellow-800 hover:shadow-lg">
                  Create Product
                </li>
              </Link>
              {/* <Link href="/all_product">
                <li className="border border-transparent py-2 px-3 rounded-full text-gray-500 hover:cursor-pointer hover:border-yellow-700 hover:text-white hover:border hover:shadow-yellow-800 hover:shadow-lg">
                  All Products{" "}
                </li>
              </Link> */}
            </ul>
          </div>
        </div>
        <div className="my-auto flex gap-2">
            {address && <span className="font-semibold py-1 px-3 my-auto text-gray-500 rounded-md hover:cursor-pointer hover:border-yellow-400 bg-slate-800 hover:text-white hover:border hover:shadow-yellow-300 hover:shadow-md">{`${address.substring(0,4)}...${address.substring(38,42)}  ${Number(balance).toFixed(2)}ETH`}</span> }
          <button
            onClick={connectWallet}
            className="border border-transparent py-2 px-3 rounded-full text-gray-500 hover:cursor-pointer hover:border-emerald-400 bg-slate-800 hover:text-white hover:border hover:shadow-emerald-600 hover:shadow-lg"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
