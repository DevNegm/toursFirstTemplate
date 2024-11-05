import React, { useState } from 'react'
import classes from './Navbar.module.scss'
import b1 from '../../assets/images.jpeg'
import b2 from '../../assets/b2.jpg'
import b3 from '../../assets/b3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import logo from '../../assets/logo.jpg'
import { CiClock1 } from 'react-icons/ci'
import { FormControl, MenuItem, Select } from '@mui/material'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPhone, FaTiktok } from 'react-icons/fa'
const Navbar = () => {
  const data = [b1, b2, b3]
  const [language, setLanguage] = useState('EN');
  return (
    <section className={classes.header}>
    <div className={classes.language}>
    <FormControl sx={{minWidth:110}}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          inputProps={{ 'aria-label': 'Without label' }}
          size='small'
          className='select'
        >
         
          <MenuItem value={'EN'}>English</MenuItem>
          <MenuItem value={'AR'}>العربية</MenuItem>
          <MenuItem value={'HE'}>עברית</MenuItem>
        </Select>
      </FormControl>
    </div>
      <div className={classes.headerPhoto}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        loop={true}
        direction={'vertical'}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false
        }}
      >
      {data.map((item, index) =>
      <SwiperSlide><img className={classes.image} src={item} alt={index} /></SwiperSlide>
      )}
    </Swiper>
      </div>
      <div className={classes.headerText}>
        <img src={logo} alt="logo" />
        <h3>Company Name</h3>
        {/* <p className={classes.workinghours} style={{backgroundColor:'#7FB23C'}}>
            11:00 - 24:00 <CiClock1 />
        </p> */}
        <div className={classes.social} style={{'--color': '#7FB23C'}}>
            <Link to='/'><FaFacebookF/> <p>Facebook</p></Link>
            <Link to='/'><FaInstagram/> <p>Instagram</p></Link>
            <Link to='/'><FaTiktok/> <p>Tiktok</p></Link>
            <Link to='/'><FaPhone style={{transform:'rotateY(180deg)'}} />  <p>Phone</p></Link>
        </div>
      </div>
    </section>
  )
}

export default Navbar