import React, { useContext } from 'react'
import MainButton from '../../shared/MainButton'
import { NavLink, useNavigate } from 'react-router-dom'
import MostSmaContext from '../../context/Most-smaContext'
import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { PuffLoader } from 'react-spinners';
import Error from '../../shared/Error/Error';

const override = {
    display: "block",
    margin: "60px auto",
    position:"fixed",
    left:"20px"
};



function TopBar() {
    const {otherButtonText,buttonText,linkHandler,switchTopbar,addProfile,checkPage,setLoading,loading,setErrorType,setErrOverLay,setError} = useContext(MostSmaContext)
    const [lognot, setLogNot] = useState(false);
    const [user, setUser] = useState((()=>{
        const storedUser = localStorage.getItem("studentData");
        return JSON.parse(storedUser);
    }));
    // const [hasLoggedOut, setHasLoggedOut] = useState(false);
    

    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        // console.log(user);
        
        setLogNot(location.pathname === "/profile");

        const noRedirectRoutes = ["/", "/about-us", "/login", "/register", "/profile"];

        if (!user && !noRedirectRoutes.includes(location.pathname)) {
            console.log("User data is missing, redirecting to login...");
            navigate("/login");
        }
    }, [location.pathname, navigate, user]);

    const logOutHandler = () => {
        if (user && user.jwt) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                localStorage.removeItem("studentData");
                localStorage.removeItem("studentEmail");
                setUser(null);
                setErrOverLay(true);
                setError("Account has been logged out successfully");
                setErrorType(true)
                setTimeout(() => {
                    setErrorType(false)
                    setErrOverLay(false);
                    navigate("/");
                }, 2000);
            }, 2000);
            console.log("Logging out...");
        } else {
            console.log("No user logged in");
            navigate("/login");
        }
    };

    // useEffect(() => {
    //     if (location.pathname === "/profile") {
    //         setLogNot(true);
    //     } else {
    //         setLogNot(false); // Reset when not on the profile page
    //     }

    //     const noRedirectRoutes = ["/", "/about-us", "/login", "/register" , "/profile"];

    //     if (!user && !noRedirectRoutes.includes(location.pathname)) {
    //         console.log("token is null, redirecting to login...");
    //         navigate("/login");
    //     }

    // }, [location.pathname,navigate,user]); // Dependency on location.pathname


    // const logOutHandler = () => {
    //     if (!user.jwt) {
    //         setLoading(true)
    //         setTimeout(() => {
    //             setLoading(false)
    //             console.log("token is null");
    //             navigate("/login")
    //         }, 2000);
            
    //     }else{
    //         // Your logout logic here
    //         setLoading(true)
    //         setTimeout(() => {
    //             setLoading(false)
    //             localStorage.removeItem("studentData","studentEmail")
    //             setErrOverLay(true)
    //             setError("Account has been logged out successfully")
    //             setTimeout(() => {
    //                 setErrOverLay(false)
    //                 navigate("/login")
    //             }, 2000);
    //         }, 2000);
    //         console.log("Logging out...");
    //     }
    // };
   
    return (
        <div className="TopBarContainer">
            {
                loading ?
                <PuffLoader color="#0B3F88" size={40} cssOverride={override} />
                :
                <></>
            }
            <div className="TopBarFlex">
                <NavLink to={checkPage ? "/home" : "/"} className="activeclassname">
                    <img src="/images/MOST SMA-logo-white.png" alt="most-sma-logo" />
                </NavLink>
                <div className="buttons">
                    {
                        lognot ?
                            <>
                                <i className="fa-solid fa-bell special"></i>
                                <MainButton buttonClass={"primary"} onClick={logOutHandler}>
                                    <span className='btn-text'>LogOut</span>
                                </MainButton>
                            </>
                            :
                            <>
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
                                            <NavLink to="/profile" className="activeclassname">
                                                <img src="/images/Screenshot 2024-08-06 145349.png" alt="profile-pic" />
                                            </NavLink>
                                        </>  
                                    },
                                    
                                    
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
                        </>
                    }
                </div>
            </div>
            <Error />
        </div>
    )
}

export default TopBar