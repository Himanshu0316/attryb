import React, { useEffect, useState } from 'react'
import axios from "axios";
import styles from './styles/Oem.module.css'
import { useNavigate } from 'react-router-dom';
const Oem = () => {

  const [data,setData] = useState([])
  const navigate = useNavigate();
  const getData = async()=>{
    try{
      const url = "https://attrybbackend.vercel.app/OEM";
      const res = await axios.get(url,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
    });
    var d = res.data
    setData([...d])
      console.log("dd",d)
      
     }catch(err){
      console.log(err)
     }
  }

  useEffect(()=>{
    getData()
  },[])
  console.log(data)
  return (
    <div className={styles.Oem}>
    {data.map((d)=>(
       <div className={styles.oemGrid} key={d._id} onClick={()=>navigate(`/oem/addcar/${d._id}`)}> 
         <h2>Model: {d.model}</h2>
        <p>Price: Rs.{d.listPrice}</p>
        <p>Mileage:{d.mileage}</p>
        <p>Power:{d.power}</p>
        <p>MaxSpeed: {d.maxSpeed}</p>
        <p>Available Colors:
          <ul className={styles.colorList}>
            {d.availableColors?.map((color, index) => (
              <li key={index} className={styles.colorItem} style={{ backgroundColor: color }}></li>
              ))}
          </ul>
      </p>
       </div>

       ))}

    </div>
  )
}

export default Oem