import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import MainButton from "../../../shared/MainButton"
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "../../../shared/ProgressBar";
import MostSmaContext from "../../../../context/Most-smaContext";
import Error from "../../../shared/Error/Error";
import Notifications from "../../../shared/Notifications";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const contextValue = useContext(MostSmaContext);
  const navigate = useNavigate();
  const location = useLocation();


  const { setErrOverLay, setError, setErrorType } = useMemo(() => contextValue, [contextValue]);

  const [student, setStudent] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem("studentData");
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Check if parsedUser and parsedUser.imgUrl are valid
        if (parsedUser && parsedUser.imgUrl) {
          setImgUrl(parsedUser.imgUrl);
        } else {
          console.log("User data or imgUrl not found");
        }
  
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    } else {
      console.log("No user image found in local storage");
    }
  }, []);
  
  


  useEffect(() => {
    const loadData = () => {
      const storedUser = localStorage.getItem("studentData");
  
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
  
          // Check if parsed object contains jwt before accessing it
          if (parsed && parsed.jwt) {
            setStudent(parsed);
            setJwt(parsed.jwt);
          } else {
            console.log("JWT not found in the stored user data");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error parsing stored data:", error);
          setError("Error loading user data. Please log in again.");
          localStorage.removeItem("studentData");
          navigate("/login");
        }
      } else {
        console.log("No user jwt found in local storage");
        navigate("/login");
      }
  
      setIsLoading(false);
    };
  
    loadData();
  }, [navigate, setError]);

  useEffect(() => {
    const noRedirectRoutes = ["/", "/about-us", "/login", "/register", "/profile"];
    const restrictedRoutes = ["/login", "/register", "/"];

    if (!isLoading) {
      if (!student && !noRedirectRoutes.includes(location.pathname)) {
        console.log("User data is missing, redirecting to login...");
        navigate("/login");
      } else if (student && restrictedRoutes.includes(location.pathname)) {
        console.log("Redirecting to home because this page is restricted if user is present");
        navigate("/home");
      }
    }
  }, [location.pathname, navigate, student, isLoading]);


  const calculateProgress = useCallback((percent) => {
    return Math.floor(percent / 10) * 10;
  }, []);

  const errorMessage = useMemo(() => {
    if (student?.firstName && student.firstName !== "NOT_SET") {
      return (
        <>
          Congratulations, Your industrial training at MIST is completed!
          <strong> GOOD LUCK </strong> {student.firstName}!
        </>
      );
    } else if (student?.firstName === "NOT_SET") {
      return (
        <>
          <strong>Your profile is on default, please update before proceeding.</strong>
        </>
      );
    }
    return null;
  }, [student?.firstName]);

  useEffect(() => {
    if (student) {
      const percent = student.progress ? parseInt(student.progress) : 0;
      const newProgress = calculateProgress(percent);

      if (progress !== newProgress) {
        setProgress(newProgress);
      }

      if (errorMessage) {
        setError(errorMessage);
        if (student.firstName === "NOT_SET") {
          setErrOverLay(true);
          const timer = setTimeout(() => {
            setErrOverLay(false);
          }, 2000);
          return () => clearTimeout(timer);
        }
      }

      if (percent === 100) {
        setErrOverLay(true);
        setErrorType(true);
        const timer = setTimeout(() => {
          setErrOverLay(false);
          setErrorType(false);
          if (jwt) {
            localStorage.removeItem("studentData");
            setStudent(null);
          } else {
            navigate("/login");
          }
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [student, calculateProgress, progress, setErrOverLay, setErrorType, setError, navigate, jwt, errorMessage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!jwt || !student) {
    navigate("/login");
    return null;
  }


  const goToProfileHandler = () => {
    navigate("/profile");
  };  

  return (
    <>
      <section className="dashboard-welcome-container">
        <div className="welcome-back-flex">
          <div className="welcome-back-message">
            <h1 className="welcome-back-message-header">WELCOME BACK USER !</h1>
            <p className="welcome-back-message-text">
              We're exited to have you on board. Get ready to streamline your
              SIWES journey with ease and efficiency. Lets make your industrial
              training experience exceptional!
            </p>
          </div>
          <div>
            <img src="/images/welcome 1.png" alt="welcome-back icon" />
          </div>
        </div>
        <p className="welcome-back-message-note">
          <b>NOTE :</b> Your next group meeting is on the 12th of August
        </p>
      </section>
      <section className="dashboard-progress-container">
        <div className="dashboard-progress-flex">
          <h1>YOUR PROGRESS</h1>
          <div className="progress-information">
          {imgUrl ? (
            <img
              src={imgUrl.startsWith("http") ? imgUrl : `http://${imgUrl}`}
              alt="profile"
            />
            ) : student && student.imgUrl ? (
              <img
                src={student.imgUrl.startsWith("http") ? student.imgUrl : `http://${student.imgUrl}`}
                alt="profile"
              />
            ) : (
              <p>No profile image available</p>
          )}
            <div className="information-details">
              {
                <>
                  <h1 className="information-details-header">
                    {`${student.firstName} ${student.middleName} ${student.lastName}`}
                  </h1>
                  <ProgressBar progressClass={progress} />
                  <div className="date">
                    <div className="startdate">
                      <p className="title">Start Date</p>
                      <p className="date-date">{student.startDate}</p>
                    </div>
                    <div className="end-date">
                      <p className="title" >End Date</p>
                      <p className="date-date" >{student.endDate}</p>
                    </div>
                  </div>
                </>
              }
              <MainButton buttonClass={"primary"} onClick={goToProfileHandler}>
                <span className="btn-text">View profile</span>
              </MainButton>
            </div>
            <Error/>
          </div>
        </div>
      </section>
      <section className="dashboard-support-container" >
        <h1>HELP & SUPPORT</h1>
        <div className="buttons">
          <NavLink to="">
            <MainButton buttonClass={"primary"}>
              <span className="btn-text">Give Feedback</span>
            </MainButton>
          </NavLink>
          <NavLink to="">
            <MainButton buttonClass={"primary"}>
              <span className="btn-text">Complaint</span>
            </MainButton>
          </NavLink>
          <NavLink to="">
            <MainButton buttonClass={"secondary"}>
              <span className="btn-text">Ask for help</span>
            </MainButton>
          </NavLink>
        </div>
      </section>
        <Notifications />
    </>
  );
}

export default Dashboard;