import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {
    const {url, setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign up");
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    });

    const [errMessage, setErrMessage] = useState("");

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }  
    const onLogin = async (e)=>{
        e.preventDefault();
        setErrMessage("");
        let newUrl = url;
        if(currState==="Login"){
            newUrl += "/api/user/login"
        } else{
              newUrl += "/api/user/register"
        };

        const response = await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            setErrMessage(response.data.message)
        }  
    }

  return (
   <div className='login-popup fixed z-10 w-full h-full bg-[#00000060] grid justify-center '>
        <form onSubmit={onLogin} action="" className="login-popup-container self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-[25px] px-[25px] py-[30px] rounded-[8px] text-[14px] fadeIn">
            <div className="login-popup-title flex justify-between">
                <h2 className='font-bold text-3xl text-black '>{currState}</h2>
                <img src={assets.cross_icon} alt="" className='w-[20px] h-[20px] cursor-pointer' onClick={()=>setShowLogin(false)}/>
            </div>
            <div className="login-popup-input flex flex-col ">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' className='m-2 p-3 border border-yellow-300 rounded-full' required></input>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' className='m-2 p-3 border border-yellow-300 rounded-full' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password'className='m-2 p-3 border border-yellow-300 rounded-full'  required/>
                <div className='Errors text-red-500 text-sm font-light text-center'>{errMessage}</div>
            </div>
            <button type='submit' className='cursor-pointer bg-yellow-300 rounded-full w-fit mx-auto py-2 px-5 text-black  text-lg'>{currState==="Sign up"?"Create account":"Login"}</button>
            <div className="login-popup-condition flex gap-[10px]">
                <input type="checkbox" required/>
                <p className=''>By continuing, i agree to the terms of use and the privacy policy.</p>
            </div>
            {currState==="Login"?  <p className='text-center text-[15px]'>Create a new account? <span className='cursor-pointer text-green-900 hover:underline font-semibold' onClick={()=>setCurrState("Sign up")}>Click here...</span></p>:  <p className='text-center text-[15px]'>Already have an account? <span className='cursor-pointer text-green-900 hover:underline font-semibold' onClick={()=>setCurrState("Login")}>Login here...</span></p>}

        </form>
    </div>
  )
}

export default LoginPopup