import React from 'react'
import MainButton from '../../shared/MainButton'
import { NavLink } from 'react-router-dom'
// import Error from '../../shared/Error/Error'

function Banner() {

  return (
    <div className="bannerContainer">
        <div className="bannerFlex">
            <h2>WELCOME TO MIST SMA</h2>
            <div className='p'>
              <p>Welcome to the Ministry of Science and Technology SIWES Management App (MIST SMA), your comprehensive    platform for managing and enhancing your Students Industrial Work Experience Scheme (SIWES) journey.</p>
              <p>At MIST SMA, we are dedicated to streamlining the SIWES process, providing students, institutions, and employers with the tools and resources they need for a successful and enriching industrial training experience. Our user-friendly app ensures efficient communication, seamless management, and valuable support throughout the SIWES program.</p>
            </div>
            <NavLink to="/about-us">
              <MainButton buttonClass={"secondary"} className="add-btn">
                <span className='btn-text'>Know More</span>
              </MainButton>
            </NavLink>
        </div>
        {/* <Error errClass={"badErr"} /> */}
    </div>
  )
}

export default Banner