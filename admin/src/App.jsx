import { ToastContainer } from 'react-toastify';
import Subscribers from './pages/Subscribers.jsx'
import ReservationsList from './pages/ReservationsList.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add.jsx'
import Orders from './pages/Orders.jsx'
import List from './pages/List.jsx'
import Home from './pages/Home.jsx'
import PromoCodes from './pages/PromoCodes.jsx'
import TableReservation from './pages/tableReservation.jsx'




const App = () => {
    const url = "http://localhost:4000"
  return (
      <>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="content flex">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home url={url} />}/>
          <Route path='/add' element={<Add url={url} />}/>
          <Route path='/list' element={<List url={url} />}/>
          <Route path='/orders' element={<Orders url={url} />}/>
          <Route path='/subscribers' element={<Subscribers url={url} />}/>
          <Route path='/tablereservation' element={<TableReservation />}/>
          <Route path='/reservationlist' element={<ReservationsList />}/>
          <Route path='/promocodes' element={<PromoCodes url={url} />}/>


        </Routes>
        
      </div>
      </>
  )
}

export default App