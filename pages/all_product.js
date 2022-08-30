import React from 'react'
import Image from 'next/image'
import profilePic from '../public/pakata.jpg'
import {ethers} from 'ethers'; 
import eccomerceAbi from '../artifacts/contracts/ecommerce.sol/ecommerce.json';
import ClipLoader from "react-spinners/ClipLoader";

function all_product({AllData}) {
    console.log(AllData);
  return (
    <div className='py-5 px-10 mt-5'>
        <div className='grid grid-cols-4 gap-4'>
            {
                AllData ? AllData.map((element) => {
                    return <div key={element.title} className='border border-yellow-700 rounded-md hover:shadow-yellow-700 hover:shadow-md flex-col gap-2 hover:zoom-card p-2'>
                    <img src={element.imageUrl} width={2000}  height={1100} className="h-72 w-full" />
                    <h3 className='text-slate-400'>{element.title}</h3>
                    <p className='text-slate-400'>Seller: <span className='truncate'>{`${element.seller.substring(0,4)}...${element.seller.substring(38,42)}`}</span></p>
                    {/* <p className='text-slate-400'>Price: {element.price}</p> */}
                </div>
                }) : <ClipLoader color={color} loading={loading} cssOverride={override} size={150} />
            }
        </div>
    </div>
  )
}

export async function getStaticProps() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const contract = new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        eccomerceAbi.abi,
        provider
      );
      const getAllCampaigns = contract.filters.registered();
      const allCampaigns = await contract.queryFilter(getAllCampaigns);
      console.log(allCampaigns);
      const AllData = allCampaigns.map((e) => {
        return {
            title: e.args.title,
            seller: e.args.seller,
            // productId: e.args.productId,
            // price: e.args.price,
            desc: e.args.desc,
            imageUrl: e.args.imageUrl, 
          }
      })
    // const signer = provider.getSigner();
    // const res = await fetch('https://.../posts')
    // const posts = await res.json()

    return {
      props: {
        AllData,
      },
    }
}

export default all_product