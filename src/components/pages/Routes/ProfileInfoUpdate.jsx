import React from 'react'
import { NavLink } from 'react-router-dom'
import MainButton from '../../../shared/MainButton'
import Universities from '../../../shared/Universities'
import Courses from '../../../shared/Courses'

function ProfileInfoUpdate() {
  return (
    <div className="form-container">
        <div className="form-content">
            <h2>Fill in your details</h2>
            <p>Let's know who you're.</p>
            <form action="" method="post">
                <input type="text" placeholder='first name' />
                <input type="text" placeholder='middle name' />
                <input type="text" placeholder='last name' />
                <input type="text" placeholder='phone number' />
                <Universities />
                <Courses />
                <label htmlFor="IT start date">
                    IT start date
                    <input type="date"/>
                </label>
                <input type="text" placeholder='IT duration' />
                <label htmlFor="IT end date">
                    IT start date
                    <input type="date" />    
                </label>
            </form>
            <p><strong>Note:</strong> Dates to be calculated based on start date & duration date.</p>
            <NavLink to="/interests" className="activeclassname">
                <MainButton buttonClass={"secondary"}>
                    <span className='btn-text'>continue</span>
                </MainButton>
            </NavLink>
        </div>
    </div>
  )
}

export default ProfileInfoUpdate