import React from 'react'
import MainButton from '../../shared/MainButton'
import { NavLink } from 'react-router-dom'

function Section2() {
  
  return (
    <div className="section2-Container">
        <div className="section2-Flex">
            <img src="/images/Group 1.png" alt="unknown" />
            <div className="section2-details">
                <h2>Ready to start your SIWES with MIST?</h2>
                <p>If you’re a student planning to start an IT Career in tech world, Contact us for more details.</p>
                <NavLink to="" className="activeclassname">
                  <MainButton buttonClass={"primary"}>
                    <span className='btn-text'>Contact us</span>
                  </MainButton>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Section2