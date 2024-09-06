import React from 'react'
import MainButton from '../../../shared/MainButton'
import { NavLink } from 'react-router-dom'
import MostSmaContext from '../../../context/Most-smaContext'
import { useContext } from 'react'
import Error from '../../../shared/Error/Error'
// import { useNavigate } from 'react-router-dom'
import PopUp from '../../../shared/PopUp'
import { PuffLoader } from 'react-spinners'
import { useEffect,useState } from 'react'

const override = {
    display: "block",
    margin: "60px auto",
    position:"fixed",
    left:"20px"
};


function SignUp() {
    const {pwdShow,textHandler,pwdHandler,text,setText,setErrOverLay,setError,setShowCode,setErrorType,loading,setLoading} = useContext(MostSmaContext)

    const [studentData, setStudentData] = useState(null);

    // const navigate = useNavigate()

    // const createStudent = async (studentData) => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch("http://192.168.100.30/smaApi/api/students/authenticate", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(studentData),
    //         });
    //         const data = await response.json();
    //         console.log(data);

    //         const checkData = data.title;
    //         console.log(checkData);

    //         setTimeout(() => {
    //             setLoading(false);
    //             if (checkData === "Failed") {
    //                 setErrOverLay(true);
    //                 setError("Student already exists, Try new email!");
    //             } else if (checkData === "badRequest") {
    //                 setErrOverLay(true);
    //                 setError("Error authenticating with server");
    //             } else if (checkData === "successful") {
    //                 setErrOverLay(true);
    //                 setError("Account created successfully!");
    //                 setErrorType(true);
    //                 setTimeout(() => {
    //                     setShowCode(true);
    //                 }, 2000);
    //             } else {
    //                 console.log("Error, other error found");
    //             }
    //             setTimeout(() => {
    //                 setErrOverLay(false);
    //                 setErrorType(false);
    //                 setText({
    //                     email: "",
    //                     password: ""
    //                 });
    //             }, 2000);
    //         }, 2000);
    //     } catch (error) {
    //         console.error("Error creating student", error);
    //         setLoading(false);
    //         setErrOverLay(true);
    //         setError("An error occurred. Please try again.");
    //         setTimeout(() => {
    //             setErrOverLay(false);
    //         }, 2000);
    //     }
    // };

    // const formHandler = async (e) => {
    //     e.preventDefault();

    //     const caseCheck = text.email;
    //     const passCheck = text.password;

    //     const changeCase = caseCheck.toLowerCase();

    //     const newStudentData = {
    //         email: changeCase,
    //         password: passCheck
    //     };

    //     console.log("json log", JSON.stringify(newStudentData));

    //     const emailFieldValue = caseCheck.trim();
    //     const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;
    //     const fields = [
    //         { name: "email", message: "email" },
    //         { name: "password", min: 6, max: Infinity, message: "password" }
    //     ];

    //     for (const field of fields) {
    //         const fieldValue = text[field.name]?.trim();

    //         if (caseCheck === "" || passCheck === "") {
    //             setError("Both fields are required");
    //             setErrOverLay(true);
    //             setTimeout(() => {
    //                 setErrOverLay(false);
    //             }, 2000);
    //             return;
    //         } else if (!emailFieldValue.includes("@")) {
    //             setError("Email must contain '@' symbol");
    //             setErrOverLay(true);
    //             setTimeout(() => {
    //                 setErrOverLay(false);
    //             }, 2000);
    //             return;
    //         } else if (!passwordReg.test(passCheck.trim())) {
    //             setError("Password must contain at least 1 symbol, 1 uppercase letter, 1 lowercase letter, and 1 numeric letter");
    //             setErrOverLay(true);
    //             setTimeout(() => {
    //                 setErrOverLay(false);
    //             }, 2000);
    //             return;
    //         } else if (fieldValue.length < field.min) {
    //             setError(`${field.message} cannot be lesser than ${field.min} characters)`)
    //             setErrOverLay(true);
    //             setTimeout(() => {
    //                 setErrOverLay(false);
    //             }, 2000);
    //             return;
    //         }
    //     }

    //     // If all validations pass, create the student
    //     await createStudent(newStudentData);
    // };

    // // ... rest of the component (return statement) remains the same



    function formHandler(e) {
        e.preventDefault();

        const caseCheck = text.email
        const passCheck = text.password

        const changeCase = caseCheck.toLowerCase();
        // console.log(changeCase);

        const newStudentData = {
            email:changeCase,
            password:passCheck
        }

        console.log("json log",JSON.stringify(newStudentData));
        
         
        const emailFieldValue = caseCheck.trim();
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

        const fields = [
            {name:"email", message:"email"},
            { name: "password", min: 6, max: Infinity, message: "password" }
        ]

        for (const field of fields) {
            const fieldValue = text[field.name]?.trim();

            if (caseCheck === "" || passCheck === "") {
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
            }else if (!passwordReg.test(passCheck.trim())) {
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
            }else{
                setStudentData(newStudentData)
            }
        }
    }

    useEffect(()=>{
        const createStudent = async () => {
            if (!studentData) return;

            setLoading(true);
            try {
                const response = await fetch(`http://192.168.100.30/smaApi/api/students/authenticate`, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(studentData),
                });
                const data = await response.json();
                console.log(data)

                const checkData = data.title;
                console.log(checkData);
                

                setTimeout(() => {
                    setLoading(false)
                    if (checkData === "Failed") {
                        setErrOverLay(true)
                        setError("Student already exist, Try new email!")
                        setTimeout(() => {
                            setErrOverLay(false)
                            setText({
                                email:"",
                                password:""
                            })
                        }, 2000);
                    }else if (checkData === "badRequest") {
                        setErrOverLay(true)
                        setError("Error authenticating with server")
                        setTimeout(() => {
                            setErrOverLay(false)
                            setText({
                                email:"",
                                password:""
                            })
                        }, 2000);
                    }else if (checkData === "Successful") {
                        setErrOverLay(true)
                        setError("Account created successfully!")
                        setErrorType(true)
                        setTimeout(() => {
                            setErrOverLay(false)
                            setErrorType(false)
                            setShowCode(true)
                        }, 2000);
                    }else{
                        console.log("Error, other error found");
                    }
                }, 2000);
            }catch (error) {
                console.error("Error creating student",error)
                setLoading(false)
                setErrOverLay(true)
                setError("An error occured. Please try again.")
                setTimeout(() => {
                    setErrOverLay(false)
                }, 2000);
            }
        }

        createStudent();
    },[studentData,setErrOverLay,setError,setLoading,setShowCode,setText,setErrorType])
    
    return (
        <div className="form-container">
            {
                loading ?
                <PuffLoader color="#0B3F88" size={40} cssOverride={override} />
                :
                <></>
            }
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
                    <p>By clicking signup, you agree to MIST SMA <strong>standard terms</strong> and <strong>conditions</strong>.</p>
                    <p>Already have an account with us? <strong className='style'><NavLink to="/login" className="activeclassname">Sign in here</NavLink></strong></p>
                </div>
            </div>
            <Error/>
            <PopUp />
        </div>
    )
}


export default SignUp