import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'
import AppDownload from '../components/AppDownload'
import TableReservation from '../components/TableReservation'


const Home = () => {

  const [category, setCategory] = useState("All")
  return (
  <>

  <Header />
  <ExploreMenu category={category} setCategory={setCategory} />
  <FoodDisplay category={category} />
  <TableReservation />
  <AppDownload />
  </>
  )
}

export default Home