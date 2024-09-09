import React, { useContext, useState } from 'react'
// import MostSmaContext from '../context/Most-smaContext'
import MainButton from './MainButton'
import MostSmaContext from '../context/Most-smaContext';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners'

const override = {
    display: "block",
    margin: "60px auto",
    position:"fixed",
    left:"20px"
};

function PopUp() {
    const [code, setCode] = useState(Array(6).fill(''))
    const {setErrOverLay,setError,text,setErrorType,showCode,setShowCode,loading,setLoading} = useContext(MostSmaContext)
    const navigate = useNavigate();
    
        
    const handleInput = (event, index) => {
        const value = event.target.value;
        if (/^\d$/.test(value)) { // Ensure it's a single digit
            const newCode = [...code];
            newCode[index] = value; // Update the value at the current index
            setCode(newCode);

            // Move to the next input if it exists
            const nextInput = event.target.nextElementSibling;
            if (nextInput && nextInput.tagName === 'INPUT') {
                nextInput.focus();
            }
        } else {
            event.target.value = ''; // Clear the input if it's not a valid digit
        }
    };

    const handleKeyDown = (event, index) => {
        const input = event.target;
    
        // Check if backspace was pressed
        if (event.key === 'Backspace') {
            if (input.value === '') {  // Current input is empty
                const prevInput = input.previousElementSibling;
                
                if (prevInput && prevInput.tagName === 'INPUT') {
                    const newCode = [...code];
                    newCode[index - 1] = '';  // Clear the previous input's value
                    setCode(newCode);
                    prevInput.focus();  // Move focus to the previous input field
                }
            } else {
                // Clear the current input if it has a value
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            }
        }
    };

    const combine = code.join('' )   
    // const data = 123456;
    // console.log(data);

    const verifyHandler = () => {
        const trimmedCombine = parseInt(combine.trim())
        console.log("clicked");
        navigate("/profile-info-update")
        
    
        // console.log("Combined Code:", trimmedCombine);
        // console.log("Expected Data:", data);
    
        if (!trimmedCombine) {
            setErrOverLay(true);
            setError("Code input fields can't be empty");
            setErrorType(false);
            setTimeout(() => {
                setErrOverLay(false);
            }, 2000);
            return;
        }else {
            validateCode(trimmedCombine)
            console.log(trimmedCombine);
            
        }
    };


    const validateCode = async (trimmedCombine) =>{
        const response = await fetch(`http://192.168.100.30/smaApi/api/students/validate`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: text.email,
                password:text.password,
                code: trimmedCombine
            }),
        });

        const data = await response.json();
        console.log(data);
        localStorage.setItem("studentData", JSON.stringify(data));

        if (data) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setCode(Array(6).fill(''))
                setShowCode(false)
                setTimeout(() => {
                    navigate("/profile-info-update")
                }, 2000);
            }, 2000);
        }else{
            console.log("data isn't valid");
        }
        
    }

  return (
    <>
        {
            loading ?
            <PuffLoader color="#0B3F88" size={40} cssOverride={override} />
            :
            <></>
        },
        {
            showCode 
            ?
            <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-flex">
                        <h2>A verification code was sent to user351 , please check and input below</h2>
                        <div className="code-input">
                            {code.map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={code[index]}
                                    onInput={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                            </div>
                        <MainButton buttonClass={"secondary"} onClick={verifyHandler}>
                            <span className={"btn-text"}>Verify</span>
                        </MainButton>
                    </div>
                </div>
            </div>
            :
            <></>
        }
    </>
  )
}

export default PopUp