import React from 'react'
import styles from './Main.module.css';
const Home = () => {
  return (
    <div className={styles.Home}>
      <h1 className={styles.H1tag}>Second Hand cars</h1>
      <div className={styles.HomeBox}>
      <div className={styles.FilterBox}></div>
      <div className={styles.GridBox}></div>
      </div>
      
    </div>
  )
}

export default Home