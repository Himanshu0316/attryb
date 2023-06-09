import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles/Oem.module.css';
import axios from 'axios';

const Inventory = () => {
  const [data,setData] = useState([])
  const [update,setUpdate] = useState(false)
  const [selected,setSelected] = useState(null)
  const navigate = useNavigate();
 // let {id} = useParams()
  const getData = async()=>{
    try{
    console.log("gggg")
    var d = await axios.get(`https://attrybbackend.vercel.app/MarketInventory/dealer`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        }
    )
    
    var dd = d.data
    console.log(dd)
    setData([...dd])
      }catch(e){
        console.log(e)
      }
}
  useEffect(() => {
    getData();
  }, []);
  
  const deleteData = (id) => {
      var d = axios.delete(`https://attrybbackend.vercel.app/MarketInventory/delete/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        }
    }
    
)
getData()
  };
  return (
    <div className={styles.Inventory}>
      {data.map((car)=>(
        <div  key={car._id} className={ styles.gridDiv}>
     <h1 className={styles.Inv}>{car.title}</h1>
              <img src={car?.image} alt="Car" className={styles.carImage} />
            <div className={styles.middle}>
              <h2 className={styles.title}>{car?.title}</h2>
              <ul className={styles.descriptionList}>
                <li className={styles.List}>Current Price: {car?.currentPrice}Rs.</li>
                <li className={styles.List}>Kms on Odometer: {car?.kmsOnOdometer}</li>
                <li className={styles.List}>Major Scratches: {car?.majorScratches ? 'Yes' : 'No'}</li>
                <li className={styles.List}>Original Paint: {car?.originalPaint ? 'Yes' : 'No'}</li>
                <li className={styles.List}>Accidents Reported: {car?.accidentsReported}</li>
                <li className={styles.List}>Previous Buyers: {car?.previousBuyers}</li>
                <li className={styles.List}>Registration Place: {car?.registrationPlace}</li>
              </ul>
              <div>
              <button onClick={()=>{navigate(`/editcar/${car._id}`)}} className={styles.edit_button}> Edit</button>

              <button onClick={(e)=>{e.preventDefault(); deleteData(car?._id)}} className={styles.edit_button}> Delete</button>
              </div>
            </div>
            <div className={styles.left}>
              <ul className={styles.carDetails}>
                {car?.description && car?.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <div className={styles.specs}>
                <ul className={styles.colorList}>
                  {car?.oemSpecs?.availableColors?.map((color, index) => (
                    <li key={index} className={styles.colorItem} style={{ backgroundColor: color }}></li>
                    ))}
                </ul>
                <ul className={styles.descriptionList}>
                  <li>model: {car?.oemSpecs?.model} {car?.oemSpecs?.year}</li>
                  <li>mileage: {car?.oemSpecs?.mileage}</li>
                  <li>power: {car?.oemSpecs?.power} BHP</li>
                  <li>maxSpeed: {car?.oemSpecs?.maxSpeed}</li>
                  <li>List-Price: {car?.oemSpecs?.listPrice}Rs.</li>
                </ul>
              </div>
            </div>
        </div>
      ))
      }
    
    </div>
  )
}
export default Inventory