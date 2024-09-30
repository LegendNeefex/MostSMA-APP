import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import MainButton from './MainButton';
import ProgressBar from './ProgressBar';
import MostSmaContext from '../../context/Most-smaContext';
import Notifications from './Notifications';

function Interests1() {
    const {skipHandler,continueHandler,checkedItems,handleCheckboxChange} = useContext(MostSmaContext)


  return (
    <div className="interest-container">
        <div className="bar-steps">
            <div className="steps">
                <h3><strong>step 1:</strong> Interests</h3>
                <NavLink onClick={skipHandler}>
                    <h3><strong>Skip</strong></h3>
                </NavLink>
            </div>
            <ProgressBar progressClass={"10"} />
            <h3>What are your interests?</h3>
            <p>Collaborate your home feed to what suits you</p>
        </div>
        <div className="questions">
            <h3><strong>1. Which of the activities do you enjoy ? (select all that apply)</strong></h3>
            <div className='main-questions'>
                {Object.keys(checkedItems).map((item) => (
                    <label key={item}>
                    <input
                        type="checkbox"
                        name={item}
                        checked={checkedItems[item]}
                        onChange={handleCheckboxChange}
                    />
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    </label>
                ))}
            </div>
        </div>
        <div className="buttons">
            <NavLink onClick={continueHandler}>
                <MainButton buttonClass={"primary"}>
                    <span className='btn-text'>continue</span>
                </MainButton>
            </NavLink>
        </div>
        <Notifications />
    </div>
  )
}

export default Interests1