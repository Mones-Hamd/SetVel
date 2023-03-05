import React from 'react'
import classes from "./Styles.module.css"
const Header = () => {
  return (
    <div className={classes.headerContainer}>
        <h1 className={classes.textGreen}>Set<span className={classes.textBlack}>Vel</span></h1>
    </div>
  )
}

export default Header