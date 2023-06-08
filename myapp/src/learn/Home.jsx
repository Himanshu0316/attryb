import React, { useEffect, useState } from 'react'
import axios from "axios";
import styles from './Main.module.css';
const Home = () => {
  const [data,setData] = useState([])
  const handlePriceFilter=(e)=>{
    let value = e.target.value
    console.log('value:', value)
   
        
    
}
const handleColorFilter=(e)=>{
    let value = e.target.value
    console.log('value:', value)
       
    
}
const handleMileageFilter=(e)=>{
    let value = e.target.value
    console.log('value:', value)
        
}

const getData = async()=>{
 

}
console.log(data)
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className={styles.Home}>
      <h1 className={styles.H1tag}>Second Hand cars</h1>
      <div className={styles.HomeBox}>
      <div className={styles.FilterBox}>
      <select className={styles.Slctag} onChange={handlePriceFilter}>
            <option value="">Select Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
        </select>
        <select className={styles.Slctag} onChange={handleColorFilter}>
            <option value="">Select Color</option>
            <option value="Silver">Silver</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Gray">Gray</option>
            <option value="Red">Red</option>
        </select>
        <select className={styles.Slctag} onChange={handleMileageFilter}>
            <option value="">Select Mileage</option>
            <option value="lowToHigh">Mileage: Low to High</option>
            <option value="highToLow">Mileage: High to Low</option>
        </select>
      </div>
      <div className={styles.GridBox}>

      </div>
      </div>
      
    </div>
  )
}

export default Home