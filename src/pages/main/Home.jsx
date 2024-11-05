import React, { useEffect, useState } from 'react'
import classes from './Home.module.scss'
import ex from '../../assets/dish.jpeg'
import Modal from '../../components/ui/Modal'
import { Link } from 'react-router-dom'
import { BsTicketPerforatedFill } from 'react-icons/bs'
const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const scrollTo = (id) => {
    const element = document.getElementById(id)
    element.scrollIntoView({ behavior: 'smooth' })
  }
  const [data, setData] = useState(null)
  const handleModal = (data) => {
    setShowModal(true)
    setData(data)
  }

  

  useEffect(() => {
    if(showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showModal])
  
  return (
    <section className={classes.container}>
        <Modal data={data} showModal={showModal} setShowModal={setShowModal} />
        <Link to={'#'} style={{backgroundColor:'#7FB23C'}}  className={classes.orderNow}>Book Now <BsTicketPerforatedFill /></Link>
        <div className={classes.categories}>
            {Array(25).fill().map((_, index) => (
              <div className={classes.item} onClick={() => scrollTo('hehe')} key={index}>
                <img src={ex} alt={index} />
                <p>{index === 2 ? 'New York' : 'Dubai'}</p>
              </div>
            ))}
        </div>
        <div className={classes.itemsContainer} id='hehe'>
              <h3>Category Name</h3>
              <div className={classes.items}>
                {Array(10).fill().map((_, index) => (
                <div className={classes.item} onClick={() => handleModal('test')} key={index}>
                  <img src={ex} alt={index} />
                  <h4>Dubai Getaway Package</h4>
                  <p><b>Flights:</b> Round-trip from Cairo (Dec 10 - Dec 20)</p>
                  <p><b>Airline:</b> Emirates Airlines</p>
                  <p><b>Hotel:</b> Atlantis The Palm, Ocean View Suite, breakfast included</p>
                  <p><b>Tours:</b> City tour, desert safari, optional Marina cruise</p>
                  <p><b>Tours:</b> <span style={{color:'#7FB23C'}}>$1,200 </span> per person</p>
                  <p style={{color:'green',fontSize:'0.7rem'}}>Book by Nov 15 for 10% off!</p>
                </div>
              ))}
              </div>
        </div>
        <div className={classes.itemsContainer}>
              <h3>Category Name</h3>
              <div className={classes.items}>
                {Array(5).fill().map((_, index) => (
                <div className={classes.item} key={index}>
                  <img src={ex} alt={index} />
                  <h4>Dubai Getaway Package</h4>
                  <p><b>Flights:</b> Round-trip from Cairo (Dec 10 - Dec 20)</p>
                  <p><b>Airline:</b> Emirates Airlines</p>
                  <p><b>Hotel:</b> Atlantis The Palm, Ocean View Suite, breakfast included</p>
                  <p><b>Tours:</b> City tour, desert safari, optional Marina cruise</p>
                  <p><b>Tours:</b> <span style={{color:'#7FB23C'}}>$1,200 </span> per person</p>
                  <p style={{color:'green',fontSize:'0.7rem'}}>Book by Nov 15 for 10% off!</p>
                </div>
              ))}
              </div>
        </div>
        <div className={classes.itemsContainer}>
              <h3>Category Name</h3>
              <div className={classes.items}>
                {Array(8).fill().map((_, index) => (
                <div className={classes.item} key={index}>
                  <img src={ex} alt={index} />
                  <h4>Dubai Getaway Package</h4>
                  <p><b>Flights:</b> Round-trip from Cairo (Dec 10 - Dec 20)</p>
                  <p><b>Airline:</b> Emirates Airlines</p>
                  <p><b>Hotel:</b> Atlantis The Palm, Ocean View Suite, breakfast included</p>
                  <p><b>Tours:</b> City tour, desert safari, optional Marina cruise</p>
                  <p><b>Tours:</b> <span style={{color:'#7FB23C'}}>$1,200 </span> per person</p>
                  <p style={{color:'green',fontSize:'0.7rem'}}>Book by Nov 15 for 10% off!</p>
                </div>
              ))}
              </div>
        </div>
    </section>
  )
}

export default Home