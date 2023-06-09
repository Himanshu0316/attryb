import React, { useState } from 'react'
import styles from './styles/Auth.module.css';
import axios from "axios";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom';

const Signup = () => {
  const[data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [toggle, settoggle] = useState(true);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    console.log(input.name)
    setData({ ...data, [input.name]: input.value });
  }
  const handleClick = (input) => {
    settoggle(input);
    if (input) {
      setInputType("password");
    } else {
      setInputType("text");
    }
  };
  const handleSubmit = async (e) => {
    console.log("hii")
    e.preventDefault();
    try {
      const url = "http://localhost:8080/dealer/register";
      const res = await axios.post(url, data);
      navigate("/login")
     // window.location.href = "/login"
      console.log(res)
    } catch (err) {
        // setError(err); 
        console.log(err)
  }
}

  return (
    <div className={styles.Login}>
      <h1 className={styles.H1Login}>Login</h1>
      <form className={styles.Form} action="" onSubmit={handleSubmit}>
        <input className={styles.inputs} type="text" name="name" onChange={handleChange} value={data.name} required placeholder='FirstName'/><br /><br />

        <input className={styles.inputs} type="text" name="lastname" onChange={handleChange} value={data.lastname} required placeholder='LastName'/><br /><br />
        <input className={styles.inputs} type="email" name="email" onChange={handleChange} value={data.email} required placeholder='Email' /><br /><br />

        <div className={styles.inputs} id={styles.pwipt}>
          <input className={styles.input} type={inputType} name="password" onChange={handleChange} value={data.password} required placeholder='Password' /><br /><br />
          {toggle ? (
            <div className={styles.inptd} onClick={() => handleClick(false)}><AiOutlineEye /></div>
          ) : (
            <div className={styles.inptd} onClick={() => handleClick(true)}><AiOutlineEyeInvisible /></div>
          )}
        </div>
        <button className={styles.buttons} type='submit'>Sign up</button>
      </form>

      

      <p className={styles.pnaviGate}><NavLink className={styles.naviGate} to='/login'>Click Here</NavLink>If You Already registerd</p>
    </div>
  )
}

export default Signup