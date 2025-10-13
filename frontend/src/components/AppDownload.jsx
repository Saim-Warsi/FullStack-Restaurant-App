import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div id='app-download' className='m-auto mt-[100px] text-[max(3vw,20px)] text-center font-semibold'>
        <p>For better experience download <br /><span className='text-green-900'>Little Lemon App</span> </p>
        <div className="flex justify-center gap-[max(2vw,10px)] mt-[40px]">
            <img src={assets.play_store} alt="" className='w-[max(30vw,120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:transform-[scale(1.05)]' onClick={() => window.open('https://play.google.com/store/games?hl=en', '_blank')}/>
            <img src={assets.app_store} alt="" className='w-[max(30vw,120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:transform-[scale(1.05)]' onClick={() => window.open('https://www.apple.com/app-store/', '_blank')}/>
          
        </div>
    </div>
  )
}

export default AppDownload