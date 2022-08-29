import React from 'react'
import Image from 'next/image'
import profilePic from '../public/pakata.jpg'
import {ethers} from 'ethers'; 
import eccomerceAbi from '../artifacts/contracts/ecommerce.sol/ecommerce.json';
import ClipLoader from "react-spinners/ClipLoader";

function all_product({AllData}) {
    console.log(AllData);
  return (
    <div className='py-3 px-7'>
        <div className='grid grid-cols-4 space-x-4'>
            {
                AllData ? AllData.map((element) => {
                    return <div key={element.title} className='border border-dark-200 radius-md flex-col gap-2'>
                    <Image src={profilePic}   height={2000} />
                    <h3 className='text-teal-500'>{element.title}</h3>
                    <p className=''>seller: <span className='truncate'>{`${element.seller.substring(0,4)}...${element.seller.substring(38,42)}`}</span></p>
                    <p>{element.seller.length}</p>
                </div>
                }) : <ClipLoader color={color} loading={loading} cssOverride={override} size={150} />
            }
            
            <div className='border border-dark-200 radius-md'>
                <Image src={profilePic}  height={2000} />
                <p>Hello</p>
            </div>
            <div className='border border-dark-200 radius-md'>
                <Image src={profilePic}  height={2000} />
                <p>Hello</p>
            </div>
            <div className='border border-dark-200 radius-md'>
                <Image src={profilePic}  height={2000} />
                <p>Hello</p>
            </div>
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