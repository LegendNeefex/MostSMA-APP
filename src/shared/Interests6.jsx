import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import MainButton from './MainButton';
import ProgressBar from './ProgressBar';
import MostSmaContext from '../context/Most-smaContext';
import Notifications from './Notifications';

function Interests6() {
    const {backHandler,finishHandler,checkedItems,handleCheckboxChange} = useContext(MostSmaContext)

    return (
        <div className="interest-container">
            <div className="bar-steps">
                <div className="steps">
                    <h3><strong>step 6:</strong> Goals</h3>
                    <NavLink onClick={backHandler}>
                        <h3><strong>Back</strong></h3>
                    </NavLink>
                </div>
                <ProgressBar progressClass={"100"} />
                <h3>What do you plan on doing later on?</h3>
                <p>having a career insights is a great achievement.</p>
            </div>
            <div className="questions">
                <h3><strong>6. What are your career goals ? (select all that apply)</strong></h3>
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
                <NavLink onClick={finishHandler}>
                    <MainButton buttonClass={"primary"}>
                        <span className='btn-text'>finish</span>
                    </MainButton>
                </NavLink>
            </div>
            <Notifications />
        </div>
    )
}

export default Interests6