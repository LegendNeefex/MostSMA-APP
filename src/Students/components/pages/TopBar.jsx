import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import MainButton from '../../shared/MainButton';
import MostSmaContext from '../../../context/Most-smaContext';
import { PuffLoader } from 'react-spinners';
import Error from '../../shared/Error/Error';

const override = {
    display: "block",
    margin: "60px auto",
    position: "fixed",
    left: "20px"
};

function TopBar() {
    const {
        otherButtonText,
        buttonText,
        linkHandler,
        switchTopbar,
        addProfile,
        checkPage,
        setLoading,
        loading,
        setErrorType,
        setErrOverLay,
        notBox,
        setError,
        setNotBox,
        lognot,
        setLogNot
    } = useContext(MostSmaContext);

    
    const [user, setUser] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("studentData");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                // setTimeout(() => {
                //     console.log(user);
                // }, 2000);
            } catch (error) {
                console.log("Error parsing user data:", error);
                setUser(null);
            }
        }
    }, []);

    const location = useLocation();

    useEffect(()=>{
        if(location.pathname === "/profile"){
            setLogNot(true)
            return;
        }
    },[setLogNot,location.pathname])


    const logOutHandler = () => {
        try {
            const storedUser = localStorage.getItem("studentData");
            const storedJwt = storedUser ? JSON.parse(storedUser).jwt : null;
    
            if (storedJwt) {
                // Proceed with logout
                setLoading(true);
    
                setTimeout(() => {
                    // Remove data from localStorage
                    localStorage.removeItem("studentData");
                    localStorage.removeItem("studentEmail");
    
                    // Show a logout success message
                    setLoading(false);
                    setErrOverLay(true);
                    setError("Account has been logged out successfully");
                    setErrorType(true);
    
                    // Wait 2 seconds before redirecting to login page
                    setTimeout(() => {
                        setErrorType(false);
                        setErrOverLay(false);
                        navigate("/");
                    }, 2000);
                }, 2000);
    
                console.log("Logging out...");
            } else {
                // If no user is logged in, navigate to login
                console.log("No user logged in");
                navigate("/login");
            }
        } catch (error) {
            console.log("An error occurred during logout");
            console.error(error);
        }
    };
    
    

    const notBoxHandler = () => {
        setNotBox(!notBox);
    };

    return (
        <div className="TopBarContainer">
            {loading && <PuffLoader color="#0B3F88" size={40} cssOverride={override} />}
            <div className="TopBarFlex">
                <NavLink to={checkPage ? "/home" : "/"} className="activeclassname">
                    <div className='profile-picture'>
                        <img src="/images/MOST SMA-logo-white.png" alt="most-sma-logo" />
                    </div>
                </NavLink>
                <div className="buttons">
                    {lognot ? (
                        <>
                            <i className="fa-solid fa-bell special" onClick={notBoxHandler}></i>
                            <MainButton buttonClass={"primary"} onClick={logOutHandler}>
                                <span className='btn-text'>LogOut</span>
                            </MainButton>
                        </>
                    ) 
                    : 
                    (
                        <>
                            {switchTopbar ? (
                                <>
                                    <i className="fa-solid fa-bell" onClick={notBoxHandler}></i>
                                    {!addProfile && (
                                        <NavLink to="/profile" className="activeclassname">
                                            <img src="/images/Screenshot 2024-08-06 145349.png" alt="profile-pic" />
                                        </NavLink>
                                    )}
                                </>
                            ) : (
                                <>
                                    <MainButton buttonClass={"primary"} onClick={() => linkHandler(otherButtonText)}>
                                        <span className='btn-text'>{otherButtonText}</span>
                                    </MainButton>
                                    <MainButton buttonClass={"secondary"} onClick={() => linkHandler(buttonText)}>
                                        <span className='btn-text'>{buttonText}</span>
                                    </MainButton>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Error />
        </div>
    );
}

export default TopBar;