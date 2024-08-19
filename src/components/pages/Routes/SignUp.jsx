import React from 'react'
import MainButton from '../../../shared/MainButton'
import { NavLink } from 'react-router-dom'
import MostSmaContext from '../../../context/Most-smaContext'
import { useContext } from 'react'
import Error from '../../../shared/Error/Error'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const {pwdShow,textHandler,pwdHandler,text,setText,setErrOverLay,setError} = useContext(MostSmaContext)

    const navigate = useNavigate()


    const formHandler = (e) =>{
        e.preventDefault();
        const emailFieldValue = text.email.trim();
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

        const fields = [
            {name:"email", message:"email"},
            { name: "password", min: 6, max: Infinity, message: "password" }
        ]

        for (const field of fields) {
            const fieldValue = text[field.name]?.trim();

            if (text.email === "" || text.password === "") {
                console.log("processing");
                setError("Both fields are required")
                setErrOverLay(true)
                setTimeout(() => {
                    setErrOverLay(false)
                }, 2000);
                return;
            }else if (!emailFieldValue.includes("@")) {
                //email validation check
                setError("Email must contain '@' symbol")
                setErrOverLay(true)
                setTimeout(() => {
                    setErrOverLay(false)
                }, 2000);
                return;
            }else if (!passwordReg.test(text.password.trim())) {
                setError(`Password must contain at least 1 symbol, 1 uppercase letter, 1 lowercase letter, and 1 numeric letter`)
                setErrOverLay(true)
                setTimeout(() => {
                    setErrOverLay(false)
                }, 2000);
                return;
            }else if (fieldValue.length < field.min) {
                setError(`${field.message} cannot be lesser than ${field.min} characters`)
                setErrOverLay(true)
                setTimeout(() => {
                   setErrOverLay(false)
                }, 2000);
                return;
            }
        }

        const studentData = {
            email:text.email,
            password:text.password
        }

        console.log("submitted");
        console.log(studentData);


        setText({
            email:"",
            password:""
        })

        setError("Account created successfully")
        setErrOverLay(true)
        setTimeout(() => {
            setErrOverLay(false)
            setTimeout(() => {
                navigate("/profile-info-update")
            }, 1000);
        }, 2000);
    }

  return (
    <div className="form-container">
        <div className="form-details">
            <div className="top-part">
                <img src="/images/mdi_register.png" alt="user icon" />
                <h2>Create an account with us!</h2>
            </div>
            <div className="sign-in-options">
                <MainButton buttonClass={"tertiary"}>
                    <span className="btn-text">Sign up with Google</span>
                </MainButton>
                <div className="option">
                    <hr className='line' />
                    <p>or sign up with</p>
                    <hr className='line' />
                </div>
            </div>
            <div className="input-buttons">
                <form method="post" onSubmit={formHandler}>
                    <input type="text" placeholder='Email' autoComplete="off" name="email" value={text.email} onChange={textHandler} />
                    <input type={pwdShow ? "text" : "password"} placeholder='Password' autoComplete="off" name="password" value={text.password} onChange={textHandler} />
                    <i onClick={pwdHandler} className={pwdShow ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} ></i>
                    <MainButton buttonType="submit" buttonClass={"secondary"}>
                        <span className='btn-text'>Sign up</span>
                    </MainButton>
                </form>
            </div>
            <div className='p'>
                <p>By clicking signup, you agree to MOST SMA <strong>standard terms</strong> and <strong>conditions</strong>.</p>
                <p>Already have an account with us? <strong className='style'><NavLink to="/login" className="activeclassname">Sign in here</NavLink></strong></p>
            </div>
        </div>
        <Error errClass={"badErr"} />
    </div>
  )
}

export default SignUp