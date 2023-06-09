import React, { useEffect, useState } from 'react';
import styles from './styles/Addcar.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddCar = () => {
  let {id} = useParams()
  console.log(id)
  const [obj,setObj] = useState({})
  console.log('obj:', obj)
  const [carDetails, setCarDetails] = useState({
    image: '',
    title: '',
    description: [''],
    kmsOnOdometer: '',
    majorScratches: false,
    originalPaint: true,
    accidentsReported: 0,
    previousBuyers: 0,
    registrationPlace: '',
    currentPrice:0,
    oemSpecs:id
  });
  const navigate = useNavigate();
  const getData = () =>{
    axios.get(`https://attrybbackend.vercel.app/OEM/${id}`,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
      }
  })
    .then((res)=>setObj(res.data[0]))
    .catch((Error)=>(<h1>{Error.message}</h1>))
  }
  useEffect(()=>{
    getData()
  },[])
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleDescriptionChange = (index, event) => {
    const { value } = event.target;
    setCarDetails((prevDetails) => {
      const updatedDescription = [...prevDetails.description];
      updatedDescription[index] = value;
      return {
        ...prevDetails,
        description: updatedDescription
      };
    });
  };

  const handleAddDescription = () => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      description: [...prevDetails.description, '']
    }));
  };
  
  const submitRegister = (event) => {
    event.preventDefault();
    
    axios.post(`https://attrybbackend.vercel.app/MarketInventory/create`,carDetails,{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token")
      }
  }

).then((res)=>console.log(res))
.catch((Error)=>(<h1>{Error.message}</h1>))
//console.log("ddd", data)
navigate(`/inventory`)
    // }catch(e){
    //   console.log(e)
    // }
    
  };
  const { model, year, listPrice, availableColors, mileage, power, maxSpeed } = obj
  return (
    <div className={styles.container} >
        <form onSubmit={submitRegister} className={styles.box}>
            <input name="image" type="text" value={carDetails.carImage} onChange={handleInputChange} placeholder="Image URL" className={styles.input} required/>
            <input name="title" type="text" value={carDetails.title} onChange={handleInputChange} placeholder="Title" className={styles.input} required/>
            <input name="kmsOnOdometer" type="number" value={carDetails.kmsOnOdometer} onChange={handleInputChange} placeholder="Kilometers on Odometer" className={styles.input} required   />
            <div className={styles.checkbox_label}>
              <input name="majorScratches" type="checkbox" checked={carDetails.majorScratches} onChange={() => setCarDetails((prevDetails) => ({ ...prevDetails, majorScratches: !prevDetails.majorScratches })) } className={styles.checkbox_input} />
              Major Scratches
            </div>
            <div className={styles.checkbox_label}>
              <input name="originalPaint" type="checkbox" checked={carDetails.originalPaint} onChange={() => setCarDetails((prevDetails) => ({ ...prevDetails, originalPaint: !prevDetails.originalPaint })) } className={styles.checkbox_input} />
              Original Paint
            </div>
            <input name="accidentsReported" type="number" value={carDetails.accidentsReported} onChange={handleInputChange} placeholder="Accidents Reported" className={styles.input}   />
            <input name="previousBuyers" type="number" value={carDetails.previousBuyers} onChange={handleInputChange} placeholder="Previous Buyers" className={styles.input}   />
            <input name="registrationPlace" type="text" value={carDetails.registrationPlace} onChange={handleInputChange} placeholder="Registration Place" className={styles.input} required   />
            <input name="currentPrice" type="text" value={carDetails.currentPrice} onChange={handleInputChange} placeholder="Current Price" className={styles.input} required   />
            <button type="submit" className={styles.button}>ADD</button>
        </form>
        <div className={styles.box}>
            {carDetails.description.map((desc, index) => (
            <input key={index} name={`description${index}`} type="text" value={desc} onChange={(event) => handleDescriptionChange(index, event)} placeholder="Description" className={styles.description_input} required/>
            ))}
            <button type="button" onClick={handleAddDescription} className={styles.add_description_button}> Add Description </button>
            <input name="model" type="text" value={`Model: ${model}`} onChange={handleInputChange} placeholder="Model" className={styles.input} required/>
            <input name="year" type="text" value={`Year: ${year}`} onChange={handleInputChange} placeholder="Year" className={styles.input} required/>
            <input name="listPrice" type="text" value={`List Price: ${listPrice}`} onChange={handleInputChange} placeholder="ListPrice" className={styles.input} required/>
          <p>Available Colors:</p>
          <ul className={styles.colorList}>
            {availableColors?.map((color, index) => (
              <li key={index} className={styles.colorItem} style={{ backgroundColor: color }}></li>
              ))}
          </ul>
          <input name="listPrice" type="text" value={`Mileage: ${mileage} miles`} onChange={handleInputChange} placeholder="ListPrice" className={styles.input} required/>
          <input name="listPrice" type="text" value={`Power: ${power} BHP`} onChange={handleInputChange} placeholder="ListPrice" className={styles.input} required/>
          <input name="listPrice" type="text" value={`Max Speed: ${maxSpeed} mph`} onChange={handleInputChange} placeholder="ListPrice" className={styles.input} required/>
        </div>


    </div>
    );
};
          
          export default AddCar;