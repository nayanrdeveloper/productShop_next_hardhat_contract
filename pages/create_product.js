import React, { useState } from "react";
import { ethers } from "ethers";
import eccomerceAbi from "../artifacts/contracts/ecommerce.sol/ecommerce.json";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import { Web3Storage } from "web3.storage";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

function CreateProduct() {
  const notify = () => toast("Product Uploaded in Block Successfully");
  const [productData, setProductData] = useState({
    title: "",
    desc: "",
    price: "",
  });
  const [productAddress, setProductAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onchangeProductInput = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async () => {
    if (productData.title == "") {
      toast("Product Title are required!");
    } else if (productData.desc == "") {
      toast("Product Description are required!");
    } else if (!productData.price) {
      toast("Product Price are required!");
    } else if (imageUrl == "") {
      toast(
        "Image are required and if your upload image so upload in IPFS first!"
      );
    } else {
      try {
        setIsLoading(true);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const chainId = await provider.getNetwork();
        if (chainId.name !== "ropsten") {
          try {
            await ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x3" }],
            });
          } catch (error) {
            toast(error.message);
          }
        }
        // const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER);
        const Contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          eccomerceAbi.abi,
          signer
        );
        // Contract.registered("hello",)

        const contractData = await Contract.registerProduct(
          productData.title,
          productData.desc,
          parseInt(productData.price),
          imageUrl
        );
        await contractData.wait();
        setProductAddress(contractData.hash);
        setIsLoading(false);
        notify();
        setUploaded(true);
        setProductData({
          title: "",
          desc: "",
          price: "",
        });
      } catch (error) {
        toast(error.message);
      }
    }
  };

  const imageHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadToIpfsProcess = async () => {
    setImageLoading(true);
    const web3StorageClient = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY,
    });
    const ext = image.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const newFile = new File([image], fileName, { type: image.type });
    const cid = await web3StorageClient.put([newFile], {
      name: fileName,
    });
    const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
    setImageUrl(imageURI);
    setImageLoading(false);
    toast("Image Uploaded Successfully in IPFS!");
  };

  return (
    <div className="py-10 px-20 m-5 rounded-lg text-shadow-lg border border-purple-600 shadow-md shadow-purple-600 hover:shadow-md hover:shadow-purple-800">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-9">
          <div className="flex gap-2 justify-between">
            <label className="text-slate-400">Product Title:</label>
            <input
              onChange={onchangeProductInput}
              name="title"
              value={productData.title}
              className="border border-yellow-600 bg-transparent rounded-md h-7 w-80 text-slate-400 focus:shadow-md focus-visible:shadow-md focus-visible:shadow-yellow-600 focus:shadow-yellow-600 focus:border"
            />
          </div>
          <div className="flex gap-2 justify-between">
            <label className="text-slate-400">Product Description:</label>
            <textarea
              onChange={onchangeProductInput}
              name="desc"
              value={productData.desc}
              className="border border-yellow-600 bg-transparent rounded-md h-20 w-80 text-slate-400 focus:shadow-md focus-visible:shadow-md focus-visible:shadow-yellow-600 focus:shadow-yellow-600 focus:border"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-y-9">
          <div className="flex gap-2 justify-between">
            <label className="text-slate-400">Product Price:</label>
            <input
              type={"number"}
              onChange={onchangeProductInput}
              name="price"
              value={productData.price}
              className="border border-yellow-600 bg-transparent rounded-md h-7 w-80 text-slate-400 focus:shadow-md focus-visible:shadow-md focus-visible:shadow-yellow-600 focus:shadow-yellow-600 focus:border"
            />
          </div>
          <div className="flex gap-2 justify-between">
            <label className="text-slate-400">Product Image:</label>
            <input
              type={"file"}
              onChange={imageHandler}
              name="image"
              className="border border-yellow-600 bg-transparent rounded-md h-7 w-80 text-slate-400 focus:shadow-md focus-visible:shadow-md focus-visible:shadow-yellow-600 focus:shadow-yellow-600 focus:border"
            />
          </div>
          {isLoading ? (
            <div>
              <ClipLoader color={"red"} size={25} />
              <p className="text-red-400 text-xl font-semibold">
                Please wait we Upload your Product in Blockchain
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              {uploaded && (
                <a
                  target="_blank"
                  className="text-slate-400"
                  href={`https://ropsten.etherscan.io/tx/${productAddress}`}
                  rel="noopener noreferrer"
                >
                  <button className="border border-transparent py-2 px-3 rounded-full text-gray-500 hover:cursor-pointer hover:border-emerald-400 bg-slate-800 hover:text-white hover:border hover:shadow-emerald-600 hover:shadow-md">
                    Recent Product Address
                  </button>
                </a>
              )}

              <ToastContainer />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={uploadToIpfsProcess}
          className="border border-transparent py-2 px-3 rounded-full text-gray-500 hover:cursor-pointer hover:border-emerald-400 bg-slate-800 hover:text-white hover:border hover:shadow-emerald-600 hover:shadow-md"
        >
          {imageLoading && (
            <span className="mr-1">
              {" "}
              <ClipLoader color={"green"} size={15} />{" "}
            </span>
          )}
          Upload to IPFS
        </button>
        <button
          onClick={submitHandler}
          className="border border-transparent py-2 px-3 rounded-full text-gray-500 hover:cursor-pointer hover:border-green-600 bg-slate-800 hover:text-white hover:border hover:shadow-green-700 hover:shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateProduct;
