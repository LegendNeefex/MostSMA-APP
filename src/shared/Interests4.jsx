import React from 'react'
import { useContext} from 'react';
import { NavLink } from 'react-router-dom';
import MainButton from './MainButton';
import ProgressBar from './ProgressBar';
import MostSmaContext from '../context/Most-smaContext';
import Notifications from './Notifications';

function Interests4() {
    const {skipHandler,backHandler,continueHandler,checkedItems,handleCheckboxChange} = useContext(MostSmaContext)
    

    return (
        <div className="interest-container">
            <div className="bar-steps">
                <div className="steps">
                    <h3><strong>step 4:</strong> Projects</h3>
                    <NavLink onClick={backHandler}>
                        <h3><strong>Back</strong></h3>
                    </NavLink>
                </div>
                <ProgressBar progressClass={"60"} />
                <h3>What are your completed works and project?</h3>
                <p>Building projects helps build experience.</p>
            </div>
            <div className="questions">
                <h3><strong>4. What type of projects have you worked on or would you like to work on ?
                (select all that apply)</strong></h3>
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
                <NavLink onClick={skipHandler}>
                    <MainButton buttonClass={"secondary"}>
                        <span className='btn-text'>skip</span>
                    </MainButton>
                </NavLink>
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

export default Interests4