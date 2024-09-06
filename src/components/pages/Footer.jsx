import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import MostSmaContext from '../../context/Most-smaContext'

function Footer() {
    const {checkPage} = useContext(MostSmaContext)
  return (
    <div className="footer-container">
        <div className="footerFlex">
            <NavLink to={checkPage ? "/" : "/home"} className="activeclassname" >
                <img src="/images/MOST SMA-logo-white.png" alt="most-sma-logo" /> 
            </NavLink>
            <div className="contact">
                <h3>CONTACTS</h3>
                <p>(406) 555-0120</p>
                <p>2715 Ash Dr. San Jose, South Dakota 83475.</p>
            </div>
            <div className="inquiriesFlex">
                <div className="inquiries">
                    <h3>INQUIRIES</h3>
                    <p>dolores.chambers@example.com</p>
                </div>
                <div className="copyright">
                    <h1>&copy;</h1>
                    <h4>MIST SMA. All right reserved.</h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer