import React from 'react'
import { useContext } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom'
import {StoreContext} from '../context/StoreContext.jsx'
import axios from 'axios';
import { useEffect } from 'react';

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url, token} = useContext(StoreContext);
    const navigate = useNavigate();

    

    const verifyPayment = async ()=>{
        const response = await axios.post(url+'/api/order/verify',{success,orderId});
        if(response.data.success){
            navigate('/myorders');
        } else{
            navigate('/')
        }
    };

    useEffect(()=>{
        verifyPayment()
    },[])
  return (
   <div className='min-h-[60vh] h-full grid place-items-center'>
     {/* spinner */}
     <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
</div>
  )
}

export default Verify