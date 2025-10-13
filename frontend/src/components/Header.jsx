import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[350px] lg:h-[550px] my-5 bg-[url('/header_img.png')] bg-no-repeat bg-cover bg-center rounded-2xl md:rounded-3xl lg:rounded-4xl">
      <div className="absolute inset-0 bg-black/25 rounded-2xl md:rounded-3xl lg:rounded-4xl"></div>
      <div className="content absolute flex flex-col items-start gap-4 max-w-[80%] sm:max-w-[65%] md:max-w-[55%] lg:max-w-[50%] bottom-8 left-6 md:left-12 lg:left-16 animate-fadeIn p-4">
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>Order your <br/> favourite food here</h2>
        <p className='text-sm sm:text-base text-white font-light leading-relaxed hidden lg:block'>
          Discover a culinary journey with our diverse menu, crafted to delight every palate. From classic favorites to innovative new dishes, each item is prepared with the freshest local ingredients and a passion for flavor.
        </p>
        <button className='bg-white rounded-full px-5 py-2 sm:px-7 sm:py-3 text-gray-800 text-sm sm:text-base font-semibold transition duration-300 hover:bg-gray-200'>
          <a href={'#explore-menu'}>
           View Menu
          </a>
         
        </button>
      </div>
    </div>
  )
}

export default Header
