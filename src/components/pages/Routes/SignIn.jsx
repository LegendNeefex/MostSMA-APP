import React from 'react'
import MainButton from '../../../shared/MainButton'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import MostSmaContext from '../../../context/Most-smaContext'
import Error from '../../../shared/Error/Error'
import { useNavigate } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'


const override = {
    display: "block",
    margin: "60px auto",
    position:"fixed",
    left:"20px"
};


function SignIn() {
    const {pwdShow,loginTextHandler,pwdHandler,loginText,setErrOverLay,setError,setLoginText,loading,setLoading,setErrorType} = useContext(MostSmaContext)
    const navigate = useNavigate()

    const loginHandler = ((e)=>{
        e.preventDefault();

        const emailCheck = loginText.email
        const passCheck = loginText.password
        
        
        const emailChange = emailCheck.toLowerCase();

        const loggedinData = {
            email:emailChange,
            password:loginText.password
        }

        if (emailCheck === "" || passCheck === "") {
            // console.log("processing");
            setError("Both fields are required")
            setErrOverLay(true)
            setTimeout(() => {
                setErrOverLay(false)
            }, 2000);
            return;
        }

        // console.log("loggedin");
        // console.log(loggedinData);
        loginStudent(loggedinData);
        
    })

    const loginStudent = async (loggedinData) =>{
        const response = await fetch(`http://192.168.100.30/smaApi/api/students/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(loggedinData),
        });

        const data = await response.json();
        
        const checkData = data.title;
        // console.log(data);

        if (checkData === "Failed") {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setErrOverLay(true)
                setError("Incorrect credentials, try again!")
                setTimeout(() => {
                    setErrOverLay(false)
                    // setLoginText({
                    //     email:"",
                    //     password:""
                    // })
                }, 2000);
            }, 2000); 
            return;
        }else{
            const emailCheck = loginText.email
            const emailChange = emailCheck.toLowerCase();
            
            // console.log("loggedin");
            // localStorage.setItem("studentData", JSON.stringify(data));
            localStorage.setItem("studentEmail", JSON.stringify(emailChange));
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setErrOverLay(true)
                setErrorType(true)
                setError("Logged in successful")
                setTimeout(() => {
                    setErrOverLay(false)
                    setErrorType(false)
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        setLoginText({
                            email:"",
                            password:""
                        })
                        navigate("/home")
                    },1000);
                }, 2000);
            }, 2000);
            
        } 
    }

  return (
    
    <div className="form-container">
        {
            loading ?
            <PuffLoader color="#0B3F88" size={40} cssOverride={override} />
            :
            <></>
        }
        <div className="form-detail">
            <div className="header-part">
                <h2>Hi, Welcome back!</h2>
                <p>Sign in to continue</p>
            </div>
            <div className="input-buttons">
                <form method="post" onSubmit={loginHandler}>
                    <input type="text" placeholder='Email'  name="email" value={loginText.email} onChange={loginTextHandler} />
                    <input type={pwdShow ? "text" : "password"} placeholder='Password' autoComplete="off" name="password" value={loginText.password} onChange={loginTextHandler} />
                    <i onClick={pwdHandler} className={pwdShow ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} ></i>
                    <MainButton buttonType="submit" buttonClass={"secondary"}>
                        <span className='btn-text'>Log in</span>
                    </MainButton>
                </form>
            </div>
            <div className='p'>
                <p>If you don't have an account with us, <strong className='style'><NavLink to="/register" className="activeclassname">Sign up</NavLink></strong></p>
            </div>
        </div>
        <Error errClass={"badErr"} />
    </div>
  )
}

export default SignIn