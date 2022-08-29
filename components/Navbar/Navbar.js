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
  //       console.log(newNetwork);
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
    console.log(signer);
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
        console.log(error);
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
      <div className="flex justify-between bg-gray-300 p-2 rounded-sm text-shadow-md border-b">
        <div>
          <div className="flex gap-5 justify-center">
            <h1 className="my-auto text-green-600 font-bold text-2xl">
              Product Shop
            </h1>
            <ul className="flex gap-3">
              <Link href="/">
                <li className="py-1 px-2 rounded-md hover:bg-red-300 hover:cursor-pointer">
                  Home
                </li>
              </Link>
              <Link href="/create_product">
                <li className="py-1 px-2 rounded-md hover:bg-red-300 hover:cursor-pointer">
                  Create Product
                </li>
              </Link>
              <Link href="/all_product">
                <li className="py-1 px-2 rounded-md hover:bg-red-300 hover:cursor-pointer">
                  All Products{" "}
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="my-auto flex gap-2">
            {address && <span className="font-semibold py-1 px-3 bg-slate-400 rounded-md">{`${address.substring(0,4)}...${address.substring(38,42)}  ${balance}`}</span> }
          <button
            onClick={connectWallet}
            className="bg-yellow-500 rounded-md py-1 px-3 hover:bg-yellow-600 cursor-pointer hover:text-white"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
