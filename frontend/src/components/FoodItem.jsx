import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import { Link } from 'react-router-dom'


const FoodItem = ({id,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    
            
    <div className='w-full m-auto rounded-[15px] shadow-[0px_0px_10px_#00000035] animate-[fadeIn_2s] xs:h-[450px] sm:h-[480px] md:h-[430px] lg:h-[380px]'>
        <div className="relative">
              <Link
              to={"/fooddetails/"+id}
             
            >

            <img className='w-full rounded-t-2xl' src={url+"/images/"+image} alt="" />
            </Link>
              {
                    !cartItems[id]
                        ?<img src={assets.add_icon_white} className='w-[40px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%]' onClick={()=>addToCart(id)} />
                        :<div className='absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-[50px] bg-white'>
                            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" className='w-[30px]' />
                            <p className=''>{cartItems[id]}</p>
                            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" className='w-[30px]' />
                        </div>
                }
        </div>
        <div className="p-5">
            <div className="flex justify-between items-center mb-3">
                <p className='text-[20px] font-semibold'>{name}</p>
                <img src={assets.rating_starts} alt="" className='w-[70px]' />
              
            </div>
            <p className='text-gray-600 max-w-[250px] truncate'>
                {description}
            </p>
            <p className='text-green-900 text-[22px] font-semibold my-[10px] mx-0'>
                ${price}
            </p>
        </div>
    </div>
    
  )
}

export default FoodItem