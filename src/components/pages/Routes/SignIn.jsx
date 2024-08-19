import React from 'react'
import MainButton from '../../../shared/MainButton'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import MostSmaContext from '../../../context/Most-smaContext'

function SignIn() {
    const {pwdShow,textHandler,pwdHandler} = useContext(MostSmaContext)

  return (
    <div className="form-container">
        <div className="form-detail">
            <div className="header-part">
                <h2>Hi, Welcome back!</h2>
                <p>Sign in to continue</p>
            </div>
            <div className="input-buttons">
                <form action="" method="post">
                    <input type="text" placeholder='Email' />
                    <input type={pwdShow ? "text" : "password"} placeholder='Password' autoComplete="off" name="password" onChange={textHandler} />
                    <i onClick={pwdHandler} className={pwdShow ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} ></i>
                    <NavLink to="/">
                        <MainButton buttonType="submit" buttonClass={"secondary"}>
                            <span className='btn-text'>Log in</span>
                        </MainButton>
                    </NavLink>
                </form>
            </div>
            <div className='p'>
                <p>If you don't have an account with us, <strong className='style'><NavLink to="/register" className="activeclassname">Sign up</NavLink></strong></p>
            </div>
        </div>
    </div>
  )
}

export default SignIn