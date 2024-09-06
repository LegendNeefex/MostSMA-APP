import React, { useEffect, useState } from 'react'
import MainButton from '../../../shared/MainButton'
import Universities from '../../../shared/Universities'
import Courses from '../../../shared/Courses'
import { useContext } from 'react'
import MostSmaContext from '../../../context/Most-smaContext'
import Error from '../../../shared/Error/Error'
import { PuffLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'


const override = {
    display: "block",
    margin: "60px auto",
    position:"fixed",
    left:"20px"
};

function ProfileInfoUpdate() {
    const {update,updateHandler,setErrOverLay,setError,setLoading,setErrorType,loading} = useContext(MostSmaContext)
    const [dateChange,setDateChange] = useState({
        startDate:"",
        endDate:""
    })

    const navigate = useNavigate();

    useEffect(()=>{
        if (update.startDate !== "") {
            // console.log("start not empty");
            let dateInput = document.getElementById('dateInput').value;
            let dateParts = dateInput.split('-');
            let formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            setDateChange(prevState => ({
                ...prevState,
                startDate: formattedDate,
            }));
        }
        
        if (update.endDate !== "") {
            // console.log("end not empty");
            let dateInput = document.getElementById('dateInput2').value;
            let dateParts = dateInput.split('-');
            let formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            setDateChange(prevState => ({
                ...prevState,
                endDate: formattedDate,
            }));
        }
    },[update])

    const profileUpdateHandler = (e) =>{
        e.preventDefault();
        // console.log("clicked");

        const storedUser = localStorage.getItem("studentData")
        const token = storedUser ? JSON.parse(storedUser) : null;
        // console.log(token.jwt);
        
        // const storedEmail = localStorage.getItem("studentEmail")
        // const studentEmail = storedUser ? JSON.parse(storedEmail) : null;
        

        const userData = {
            "firstName": update.firstName,
            "middleName": update.middleName,
            "lastName": update.lastName,
            "phoneNumber": update.phoneNumber,
            "institution": update.institution,
            "course": update.course,
            "startDate": dateChange.startDate,
            "duration": update.duration,
            "endDate": dateChange.endDate,
            "jwt": token.jwt,
            "email": token.email
        }

        const fields = [
            { name: "firstName", min: 3, max: 20, message: "firstname" },
            { name: "middleName", min: 3, max: 20, message: "middlename" },
            { name: "lastName", min: 3, max: 20, message: "lastname" },
            {name: "institution", message: "institution"},
            { name: "course", min: 6, max: 25, message: "course" },
            { name: "phoneNumber", min: 11, max: 11, message: "phone number" },
            { name: "startDate", message: "startDate" },
            { name: "duration", message: "duration" },
            { name: "endDate", message: "endDate" }
        ];
        
        // console.log('Current update state:', update);
        const emptyField = fields.find(field => !update[field.name] || !update[field.name].trim());
        if (emptyField) {
            // console.log('Empty field found:', emptyField);
            setErrOverLay(true)
            setError(`${emptyField.message} is required`);
            setTimeout(() => {
                setErrOverLay(false)
            }, 2000);
            return;
        }
        console.log(userData);

        for (const field of fields) {
            const fieldValue = update[field.name]?.trim() || '';
     
            if (field.min && fieldValue.length < field.min) {
                 setErrOverLay(true)
                 setError(`${field.message} cannot be lesser than ${field.min} characters`);
                 setTimeout(() => {
                     setErrOverLay(false)
                 }, 2000);
            } else if (field.max && fieldValue.length > field.max) {
                 setTimeout(() => {
                     setError("")
                 }, 2000);
                 setError(`${field.message} cannot be greater than ${field.max} characters`);
            }
        }
        updateStudent(userData)
    }

    // console.log("got here");
    
    const updateStudent = async (userData) => {
        
        // console.log("got here");

        try {
            const response = await fetch (`http://192.168.100.30/smaApi/api/students/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
    
            const data = await response.json();
            console.log(data);
    
            if (data) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setErrOverLay(true);
                    setError("Profile updated successfully!");
                    localStorage.setItem("studentData", JSON.stringify(data));
                    setErrorType(true);
                    setTimeout(() => {
                        setErrOverLay(false);
                        setErrorType(false);
                        setTimeout(() => {
                            navigate("/Interests");
                        }, 1000);
                    }, 2000);
                }, 2000);
            }
        } catch (error) {
            console.error("Error occurred while updating profile:", error);
            setErrOverLay(true);
            setError("An unexpected error occurred. Please try again later.");
            setTimeout(() => {
                setErrOverLay(false);
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
        <div className="form-content">
            <h2>Fill in your details</h2>
            <p>Let's know who you're.</p>
            <form action="" method="post" onSubmit={profileUpdateHandler}>
                <input type="text" placeholder='first name' autoComplete="off" name="firstName" value={update.firstName} onChange={updateHandler} />
                <input type="text" placeholder='middle name' autoComplete="off" name="middleName" value={update.middleName} onChange={updateHandler} />
                <input type="text" placeholder='last name' autoComplete="off" name="lastName" value={update.lastName} onChange={updateHandler} />
                <input type="text" placeholder='phone number' autoComplete="off" name="phoneNumber" value={update.phoneNumber} onChange={updateHandler} />
                <Universities />
                <Courses />
                <label htmlFor="IT start date">
                    IT start date
                    <input type="date" autoComplete="off" name="startDate" id='dateInput' value={update.startDate} onChange={updateHandler}/>
                </label>
                <input type="text" placeholder='IT duration' autoComplete="off" name="duration" value={update.duration} onChange={updateHandler} />
                <label htmlFor="IT end date">
                    IT end date
                    <input type="date" autoComplete="off" name="endDate" id='dateInput2' value={update.endDate} onChange={updateHandler} />    
                </label>
                <p><strong>Note:</strong> Dates to be calculated based on start date & duration date.</p>
                <MainButton buttonType={"submit"} buttonClass={"secondary"}>
                    <span className='btn-text'>continue</span>
                </MainButton>
            </form>  
        </div>
        <Error/>
    </div>
  )
}

export default ProfileInfoUpdate