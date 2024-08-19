import React from "react";
import MainButton from "../../../shared/MainButton"
import { NavLink } from "react-router-dom";
import ProgressBar from "../../../shared/ProgressBar";


function Dashboard() {
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
              <h1 className="information-details-header">
                Jacob Jones
              </h1>
              <ProgressBar progressClass={"60"}/>
              <div className="date">
                <div className="startdate">
                  <p className="title">Start Date</p>
                  <p className="date-date">24/03/24</p>
                </div>
                <div className="end-date">
                  <p className="title" >End Date</p>
                  <p className="date-date" >13/08/24</p>
                </div>
              </div>
              <NavLink to="" className="activeclassname">
                <MainButton buttonClass={"primary"}>
                  <span className="btn-text">View profile</span>
                </MainButton>
              </NavLink>
            </div>
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
