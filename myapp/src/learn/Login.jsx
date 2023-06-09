import React, { useState } from 'react'
import styles from './styles/Auth.module.css';
import axios from "axios";
import Signup from './Signup';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { NavLink ,useNavigate} from 'react-router-dom';

const Login = () => {
  const [data,setData] = useState({
    email:"",
    password:""
  });
  const [error,setError] = useState("");
  const [toggle, settoggle] = useState(true);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const handleChange = ({currentTarget:input})=>{
    setData({...data,[input.name]:input.value});
  }
  const handleClick = (input) => {
    settoggle(input);
    if (input) {
      setInputType("password");
    } else {
      setInputType("text");
    }
  };
 
  const handleSubmit = async(e)=>{
     e.preventDefault();
     try{
      const url = "http://localhost:8080/dealer/login";
      const res = await axios.post(url,data);
      console.log(res.data.msg)
      var token = res.data.token;
       localStorage.setItem("token",token)
       alert(res.data.msg)
      if(token){
      navigate("/")
      window.location = "/"
      }
     }catch(err){
      console.log(err)
     }
  }
  return (
    <div className={styles.Login}>
       <h1 className={styles.H1Login}>Login</h1>
       <form className={styles.Form} action="" onSubmit={handleSubmit}>
       <input className={styles.inputs} type="email" name="email" onChange={handleChange} value={data.email} required  placeholder='Email'/><br /><br />
             
              <div className={styles.inputs} id={styles.pwipt}>
              <input className={styles.input} type={inputType}  name="password" onChange={handleChange} value={data.password} required placeholder='Password'/><br /><br />
              {toggle ? (
                  <div className={styles.inptd} onClick={() => handleClick(false)}><AiOutlineEye/></div>
                ) : (
                  <div className={styles.inptd} onClick={() => handleClick(true)}><AiOutlineEyeInvisible/></div>
                )}
              </div>
              <button className={styles.buttons} type='submit'>Login</button>
       </form>

       

      <p className={styles.pnaviGate}><NavLink className={styles.naviGate} to='/signup'>Click Here</NavLink> to Create Your Account</p> 
    </div>
  )
}

export default Login