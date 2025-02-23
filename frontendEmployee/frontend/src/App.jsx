import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponents from './components/HeaderComponents'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'


function App() {
  
  return (
    <>
    <HeaderComponents/>
    <BrowserRouter>
      
      <Routes>
        {/* // http://localhost:3000 */}
          <Route path='/' element = {<ListEmployeeComponent/>}></Route>
        {/* // http://localhost:3000/employees */}
          <Route path='/employees' element ={<ListEmployeeComponent/>}></Route>
        {/* // http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<EmployeeComponent/>}></Route>

        {/* // http://localhost:3000/update-employee/1 */}
        <Route path='/update-employee/:id' element={<EmployeeComponent/>}></Route>
      </Routes>
      
      
    </BrowserRouter>
    <FooterComponent/>
    </>
  )
}

export default App
