import React, { useState } from "react";
import { ethers } from "ethers";
import eccomerceAbi from "../artifacts/contracts/ecommerce.sol/ecommerce.json";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";

function create_product() {
  const notify = () => toast("Product Uploaded in Block Succesfully");
  const [productData, setProductData] = useState({
    title: "",
    desc: "",
    price: "",
  });
  const [productAddress, setProductAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onchangeProductInput = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(process.env.CONTRACT_ADDRESS)
    // const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const Contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      eccomerceAbi.abi,
      signer
    );
    // Contract.registered("hello",)
    console.log(Contract);
    const contractData = await Contract.registerProduct(
      productData.title,
      productData.desc,
      parseInt(productData.price)
    );
    await contractData.wait();
    setProductAddress(contractData.to);
    setIsLoading(false);
    notify();
    setProductData({
      title: "",
      desc: "",
      price: "",
    });
  };

  return (
    <div className="py-10 px-20 m-5 bg-white rounded-lg text-shadow-lg border">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-9">
          <div className="flex gap-2 justify-between">
            <label className="text-slate-400">Product Title:</label>
            <input
              onChange={onchangeProductInput}
              name="title"
              className="border rounded-md h-7 w-80 focus:border-red-700"
            />
          </div>
          <div className="flex gap-2">
            <label className="text-slate-400">Product Description:</label>
            <textarea
              onChange={onchangeProductInput}
              name="desc"
              className="border rounded-md h-20 w-80 focus:border-gray-600"
            ></textarea>
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <label className="text-slate-400">Product Price:</label>
            <input
              type={"number"}
              onChange={onchangeProductInput}
              name="price"
              className="border rounded-md h-7 w-80 focus:border-gray-600"
            />
          </div>
          {isLoading ? (<div>
            <ClipLoader color={"red"} size={25} />
            <p className="text-red-400 text-xl font-semibold">Please wait we Upload your Product in Blockchain</p>
            </div>
          ) : (
            <div className="flex gap-2">
              <label className="text-slate-400">
                Product Address: {productAddress}
              </label>
              <ToastContainer />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={submitHandler}
        className="bg-yellow-400 px-2 py-2 rounded-md text-white hover:bg-yellow-500"
      >
        Submit
      </button>
    </div>
  );
}

export default create_product;
