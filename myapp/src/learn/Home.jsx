import React, { useEffect, useState } from 'react'
import axios from "axios";
import styles from './Main.module.css';
const Home = () => {
  const [data, setData] = useState([])
  const handlePriceFilter = (e) => {
    let value = e.target.value
    if(value == "hl"){
     var d = data.sort((a,b)=> {
      return  a.listPrice - b.listPrice
      })
      setData(data)
    }else{
     var d = data.sort((a,b)=> {
       return b.listPrice - a.listPrice
      })
      setData(d)
    }
    console.log('value:', value)



  }
  const handleColorFilter = (e) => {
    let value = e.target.value
    console.log('value:', value)


  }
  const handleMileageFilter = (e) => {
    let value = e.target.value
    console.log('value:', value)

  }

  const getData = async () => {
    try {
      let d = await axios.get(`https://attrybbackend.vercel.app/Marketinventory`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
        }
      }
      )
      var dd = d.data
      setData([...dd])

    } catch (err) {
      console.log(err)
    }

  }
  console.log(data)
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={styles.Home}>
      <h1 className={styles.H1tag}>Second Hand cars</h1>
      <div className={styles.HomeBox}>
        <div className={styles.FilterBox}>
          <select className={styles.Slctag} onChange={handlePriceFilter}>
            <option value="">Select Price</option>
            <option value="lh">Price: Low to High</option>
            <option value="hl">Price: High to Low</option>
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
          {data.map((car, index) => (
            <div key={index} className={styles.grid}>
              <h2>{car.title}</h2>
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
            
           ))}
      </div>
    </div>
      
    </div >
  )
}

export default Home