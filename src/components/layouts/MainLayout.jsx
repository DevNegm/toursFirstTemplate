import React, { useEffect } from 'react'
import classes from './MainLayout.module.scss'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../main/Navbar'
const MainLayout = () => {
  const location = useLocation()
  useEffect(() => {
    const handleNavigation = () => {
        window.scrollTo(0, 0); 
    };
    handleNavigation(); 
}, [location]); 
  return (
    <main className={classes.main}>
        <Navbar/>
        <Outlet/>
    </main>
  )
}

export default MainLayout
