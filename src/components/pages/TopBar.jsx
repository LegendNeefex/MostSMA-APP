import React, { useContext } from 'react'
import MainButton from '../../shared/MainButton'
import { NavLink } from 'react-router-dom'
import MostSmaContext from '../../context/Most-smaContext'


function TopBar() {
    const {otherButtonText,buttonText,linkHandler,switchTopbar,addProfile,checkPage} = useContext(MostSmaContext)
   

  return (
    <div className="TopBarContainer">
        <div className="TopBarFlex">
            <NavLink to={checkPage ? "/home" : "/"} className="activeclassname">
                <img src="/images/MOST SMA-logo-white.png" alt="most-sma-logo" />
            </NavLink>
            <div className="buttons">
                {switchTopbar ?
                    <>
                        {
                            addProfile ? 
                            <>
                                <i className="fa-solid fa-bell"></i>
                            </>
                            :
                            <>
                                <i className="fa-solid fa-bell"></i>
                                <NavLink>
                                    <img src="/images/Screenshot 2024-08-06 145349.png" alt="profile-pic" />
                                </NavLink>
                            </>  
                        }
                    </> 
                    :
                    <>
                        <MainButton buttonClass={"primary"} onClick={() => linkHandler(otherButtonText)}>
                            <span className='btn-text'>{otherButtonText}</span>
                        </MainButton>
                        <MainButton buttonClass={"secondary"} onClick={() => linkHandler(buttonText)}>
                            <span className='btn-text'>{buttonText}</span>
                        </MainButton>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default TopBar