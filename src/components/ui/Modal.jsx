import React, { useState } from 'react'
import classes from './Modal.module.scss'
import ex from '../../assets/dish.jpeg'
import { MdClose } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'

const Modal = ({data, showModal,setShowModal}) => {
    const [openExtra, setOpenExtra] = useState(false)
     const handleClose = (e) => {
        if (e.target.classList.contains(classes.modal)) {
            setShowModal(false);
            setOpenExtra(false);
        }
    };
    if(showModal) {
        return (
            <div className={classes.modal} onClick={handleClose}>
                <div className={classes.modalContent}>
                    <button style={{backgroundColor:'#7FB23C'}} className={classes.close} onClick={() => setShowModal(false)}><MdClose /></button>
                    <img src={ex} alt="example" />
                    <div className={classes.modalText}>
                    <h4>Dubai Getaway Package</h4>
                    <p><b>Flights:</b> Round-trip from Cairo (Dec 10 - Dec 20)</p>
                    <p><b>Airline:</b> Emirates Airlines</p>
                    <div className={classes.extras} >
                        <button onClick={() => setOpenExtra(!openExtra)}>More Details <IoIosArrowDown style={{transform:openExtra && 'rotate(180deg)',transition:'all 250ms ease-in-out'}} /></button>
                        { openExtra && <div className={classes.extrasContent}>
                            <p><b>Hotel:</b> Atlantis The Palm, Ocean View Suite, breakfast included</p>
                            <p><b>Tours:</b> City tour, desert safari, optional Marina cruise</p>
                            <p><b>Tours:</b> <span style={{color:'#7FB23C'}}>$1,200 </span> per person</p>
                            <p style={{color:'green',fontSize:'0.7rem'}}>Book by Nov 15 for 10% off!</p>
                        </div>}
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal