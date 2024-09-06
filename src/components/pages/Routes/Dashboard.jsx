  import React, {useState} from "react";
  import MainButton from "../../../shared/MainButton"
  import { NavLink, useNavigate } from "react-router-dom";
  import ProgressBar from "../../../shared/ProgressBar";
  import { useEffect } from "react";
  import { useContext } from "react";
  import MostSmaContext from "../../../context/Most-smaContext";
  import Error from "../../../shared/Error/Error";
  import { useCallback } from "react";
  import { useMemo } from "react";


  function Dashboard() {

    const contextValue = useContext(MostSmaContext);
    const navigate = useNavigate();

    const { setErrOverLay, setError, setErrorType } = useMemo(() => contextValue, [contextValue]);

    const [student, setStudent] = useState(() => {
      const storedUser = localStorage.getItem("studentData");
      return storedUser ? JSON.parse(storedUser) : null;
    });

    const [jwt, setJwt] = useState(() => {
      const storedJwt = localStorage.getItem("jwt");
      return storedJwt ? JSON.parse(storedJwt) : null;
    });

    const [progress, setProgress] = useState(0);

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
      if (!student) {
        navigate("/login");
        return;
      }

      const percent = student.progress ? parseInt(student.progress) : 0;
      const newProgress = calculateProgress(percent);

      if (progress !== newProgress) {
        setProgress(newProgress);
      }

      // Handle error messages
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

      // Handle completion
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
    }, [student, calculateProgress, progress, setErrOverLay, setErrorType, setError, navigate, jwt, errorMessage]);
    
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
              <div className="information-image"></div>
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
                <NavLink to="/profile" className="activeclassname">
                  <MainButton buttonClass={"primary"}>
                    <span className="btn-text">View profile</span>
                  </MainButton>
                </NavLink>
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
      </>
    );
  }

  export default Dashboard;
