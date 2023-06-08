import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Main.module.css';
import { AiOutlineClose , AiOutlineMenu ,AiOutlineMobile } from "react-icons/ai";
const Navbar = () => {
  const [dis,setDis] = useState(true)
  const [isicon ,setIsicon] = useState(true)
  const handleclick = () => {
    setDis(!dis)
    setIsicon(!isicon)
  }
  // window.onscroll
  return (
    <div className={styles.Navbar}>
      <div onClick={handleclick} className={styles.Menu}>{isicon ? <AiOutlineMenu /> : <AiOutlineClose /> }</div>
      <NavLink className={styles.Logo} to="/">Home</NavLink>
      
      <div className={dis ? styles.Navdiv : styles.blackDiv}>
        <nav>
        <ul className={styles.Ulnav}>
        <li className={styles.Linav}><NavLink className={styles.Linknav} to="/">Add Cars</NavLink></li>
        <li className={styles.Linav}><NavLink className={styles.Linknav} to="/">Inventory</NavLink></li>
        <li className={styles.Linav}><NavLink className={styles.Linknav} to="/">Login</NavLink></li>
        </ul>
        </nav>
      </div>
     
    </div>
  )
}

export default Navbar
