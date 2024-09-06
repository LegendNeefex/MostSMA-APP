import React, { useEffect } from 'react'
import MainButton from '../../../shared/MainButton'
import { useState } from 'react';
import { PuffLoader } from 'react-spinners'
import { useContext } from 'react';
import MostSmaContext from '../../../context/Most-smaContext';
import { useNavigate } from 'react-router-dom';


const override = {
    display: "block",
    margin: "60px auto",
    position:"fixed",
    left:"20px"
};

function Profile() {
    const {loading} = useContext(MostSmaContext)

    const [user, setUser] = useState((()=>{
        const storedUser = localStorage.getItem("studentData");
        return JSON.parse(storedUser);
    }));

    const [isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{
        // console.log(user);

        if (!isLoading && (!user || !user.firstName)) {
            console.log("Student details are missing or incomplete, redirecting to login...");
            // setError("Incomplete user data. Please update your profile.");
            navigate("/login");
        }
        
    },[user,isLoading,navigate])

    if (!user) {
        // navigate("/login")
        console.log("Friendly user error js to make code run : student is empty or null");
        return;
      }

  return (
    <div className="profile-container">
        {
            loading ?
            <PuffLoader color="#0B3F88" size={40} cssOverride={override} />
            :
            <></>
        }
        <div className="flexA">
            <div className="profile-picture">
                <div className="frame"></div>
                <img src="/images/picture.png" alt="profiel-picture" />
            </div>
            <div className="user-details">
                <h2>{`${user.firstName} ${user.middleName} ${user.lastName}`}</h2>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
            </div>
            <MainButton buttonClass={"primary"}>
                <span className='btn-text'>Edit Profile Picture</span>
            </MainButton>
        </div>
        <div className="flexB">
            <div className="flexBi">
                <h2>Profile Info</h2>
                <div className="details">
                    <div className="detail">
                        <h3>Course <span style={{padding:"54px"}}>:</span></h3>
                        <p>{user.course}</p>
                    </div>
                    <div className="detail">
                        <h3>Institution <span style={{paddingLeft:"20px",paddingRight:"55px"}}>:</span></h3>
                        <p>{user.institution}</p>
                    </div>
                    <div className="detail">
                        <h3>IT Start Date <span style={{paddingRight:"55px"}}>:</span></h3>
                        <p>{user.startDate}</p>
                    </div>
                    <div className="detail">
                        <h3>Duration <span style={{paddingLeft:"38px",paddingRight:"55px"}}>:</span></h3>
                        <p>{user.duration}</p>
                    </div>
                    <div className="detail">
                        <h3>IT End Date <span style={{paddingLeft:"11px",paddingRight:"55px"}}>:</span></h3>
                        <p>{user.endDate}</p>
                    </div>
                </div>
            </div>
            <div className="flexBii">
                <MainButton buttonClass={"primary"}>
                    <span className='btn-text'>Edit Profile</span>
                </MainButton>
                <div className="group-detail">
                    <div className="flex1">
                        <h3>Group</h3>
                        <p>Programming</p>
                    </div>
                    <div className="flex2">
                        <img src="/images/whatsapp.png" alt="whatsapp logo" />
                        <MainButton buttonClass={"primary"}>
                            <span className='btn-text'>Group Chat</span>
                        </MainButton>
                    </div>
                </div>
                <div className="support">
                    <MainButton buttonClass={"others1"}>
                        <span className='btn-text'>Complaint</span>
                    </MainButton>
                    <MainButton buttonClass={"others2"}>
                        <span className='btn-text'>Contact admin</span>
                    </MainButton>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile