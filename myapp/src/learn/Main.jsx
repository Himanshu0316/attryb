import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import styles from './Main.module.css';
import { Route, Routes } from 'react-router-dom'
import Addcar from './Addcar'
import Login from './Login';
import Signup from './Signup';
import Inventory from './Inventory';
import Editcar from './Editcar';
import Oem from './Oem';
const Main = () => {
  return (
    <div className={styles.Container}>
      <Navbar />
      <Routes> 
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/inventory" element={<Inventory/>}></Route>
      <Route path="/editcar/:id" element={<Editcar/>}></Route>
      <Route path="//oem/addcar/:id" element={<Addcar/>}></Route>
      <Route path="/oem" element={<Oem/>}></Route>
     </Routes> 
      
    </div>
  )
}

export default Main