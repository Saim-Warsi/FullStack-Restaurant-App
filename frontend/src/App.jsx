import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Placeorder from './pages/Placeorder'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup'
import Verify from './pages/Verify'
import MyOrders from './pages/MyOrders'
import { StoreContext } from './context/StoreContext'
import Terms from './components/Terms'
import PrivacyPolicy from './components/PrivacyPolicy'
import CookiePolicy from './components/CookiePolicy'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Profile'
import FoodDetails from './components/FoodDetails'
import ScrollToTop from './components/scrollToTop';



const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const {showTerms, setShowTerms} = useContext(StoreContext);
  const {showPrivacyPolicy, setShowPrivacyPolicy} = useContext(StoreContext);
  const {showCookiePolicy, setShowCookiePolicy} = useContext(StoreContext);

  return (
    <>

        <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} /> : <></>}
     {showTerms?<Terms  />:<></>}
     {showPrivacyPolicy?<PrivacyPolicy  />:<></>}
     {showCookiePolicy?<CookiePolicy  />:<></>}

  <div className="w-[80%] m-auto">
  <Navbar setShowLogin={setShowLogin} />
  <ScrollToTop />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/order' element={<Placeorder />} />
    <Route path='/verify' element={<Verify />} />
    <Route path='/myorders' element={<MyOrders />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/fooddetails/:id' element={<FoodDetails />} />


  </Routes>
  </div>
  <Footer />
  </>
  )
}

export default App
