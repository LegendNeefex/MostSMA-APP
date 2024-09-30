import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from '../../../shared/MainButton';
import { PuffLoader } from 'react-spinners';
import MostSmaContext from '../../../../context/Most-smaContext';
import Notifications from '../../../shared/Notifications';
import Error from '../../../shared/Error/Error';
import { useRef } from 'react';

const override = {
  display: "block",
  margin: "60px auto",
  position: "fixed",
  left: "20px"
};

function Profile() {
  const { loading, setErrOverLay, setError, setErrorType, setLoading } = useContext(MostSmaContext);
  const [isLoading, setIsLoading] = useState(true);
  const [partA, setPartA] = useState(false);
  const [textChange, setTextChange] = useState("Edit Profile");
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState(null); // State to store the imgUrl

  const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("studentData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            // setTimeout(() => {
                // console.log(user.email);
                
            // }, 2000);
        }
        setIsLoading(false);
    }, []);

  useEffect(() => {
    if (!isLoading && (!user || !user.firstName)) {
      console.log("Student details are missing or incomplete, redirecting to login...");
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

    const [editText, setEditText] = useState({
        fullName: '',
        number: ''
    });

    const handleImage = ()=>{
        console.log('Input clicked!');
        inputRef.current.click(); 
    }

    useEffect(()=>{
        const uploadImage = async ()=>{
          try {
            if (image) {
                const storedUser = localStorage.getItem("studentData")
                const parsed = JSON.parse(storedUser)

                const token = parsed.jwt
                const email = parsed.email

                // console.log("token",token);
                // console.log("Email",email);

                const formData = new FormData();
                formData.append('profilePicture', image);
                formData.append('jwt',token)
                formData.append('email',email)
        
                const response = await fetch(`http://192.168.100.30/smaApi/uploadImage`, {
                    method: 'PUT',
                    body: formData
                })

                const data = await response.json();
                console.log(data);

                if (storedUser) {
                  const parsedUser = JSON.parse(storedUser);

                  const nested = data.imgUri
                
                  // console.log(nested);
                  parsedUser.imgUrl = nested; 
                  setImgUrl(nested);
                  
                  localStorage.setItem("studentData", JSON.stringify(parsedUser));
                
                  console.log("Data updated successfully in localStorage");
                } else {
                  console.log("No data found in localStorage to update.");
                }

              // localStorage.setItem("")
            }
          } catch (error) {
            console.error('Error uploading image:', error);   
          }
        }
        uploadImage();
    },[image])


    const handleChange = async (e)=>{
        const file = e.target.files[0]
        // console.log(file);
        setImage(file)
    }

    useEffect(() => {
        if (user) {
        setEditText({
            fullName: `${user.firstName} ${user.middleName} ${user.lastName}`,
            number: user.phoneNumber
        });
        }
        // console.log(user.phoneNumber);
        
    }, [user]);

  const [swap, setSwap] = useState({
    name: false,
    phoneNumber: false,
    course: false,
    institution: false
  });

 

  const handleInputChange = (e) => {
    setEditText((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const editProfileDetails = async () => {
    if (textChange === "Edit Profile") {
      setPartA(true);
      setTextChange("Save changes");
    } else {
      const nameParts = editText.fullName.split(' ');
      const firstName = nameParts[0] || '';
      const middleName = nameParts[1] || '';
      const lastName = nameParts[2] || '';
      const phoneNumber = editText.number;
      // console.log(phoneNumber);
      

      const updateData = { firstName, middleName, lastName, phoneNumber, jwt: user.jwt, email:user.email  };
      // console.log(updateData);
      

      try {
        const response = await fetch("http://192.168.100.30/smaApi/api/students/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (data) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setErrOverLay(true);
            setError("Profile updated successfully!");
            localStorage.setItem("studentData", JSON.stringify({ ...user, ...updateData }));
            setUser((prevUser) => ({ ...prevUser, ...updateData }));
            setErrorType(true);
            setTimeout(() => {
              setErrOverLay(false);
              setErrorType(false);
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

      setSwap({ name: false, course: false, institution: false, phoneNumber: false });
      setPartA(false);
      setTextChange("Edit Profile");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("studentData");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        navigate("/login");
      }
    } else {
      console.log("No user data found, redirecting to login...");
      navigate("/login");
    }
    setIsLoading(false);
  }, [navigate]);
  
  const edit = (iconText) => {
    setSwap((prev) => ({ ...prev, [iconText]: true }));
  };

  if (isLoading || !user) {
    return <PuffLoader color="#0B3F88" size={40} cssOverride={override} />;
  }

  return (
    <div className="profile-container">
      {loading && <PuffLoader color="#0B3F88" size={40} cssOverride={override} />}
      <div className="flexA">
        <div className="profile-picture">
          {imgUrl ? (
            <img src={`http://${imgUrl}`} alt="profile" />
          ) : user && user.imgUrl ? (
            user.imgUrl.includes("http")
            ?
            <img src={`${user.imgUrl}`} alt="profile" />
            :
            <img src={`http://${user.imgUrl}`} alt="profile" />
          ) : (
            // If neither are available, show a fallback message or image
            <p>No profile image available</p>
          )}
          <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleChange} />
        </div>
        <div className="user-details">
          <div className="div">
            {swap.name ? (
              <input
                type="text"
                name="fullName"
                value={editText.fullName}
                autoComplete='off'
                placeholder='Full name'
                onChange={handleInputChange}
              />
            ) : (
              <h2>{`${user.firstName} ${user.middleName} ${user.lastName}`}</h2>
            )}
            {partA && (
              <i className="fa-solid fa-pen-to-square" onClick={() => edit('name')}></i>
            )}
          </div>
          <p>{user.email}</p>
          <div className="div">
            {swap.phoneNumber ? (
              <input
                type="number"
                name="number"
                value={editText.number}
                autoComplete='off'
                placeholder='Phone Number'
                onChange={handleInputChange}
              />
            ) : (
              <p>{user.phoneNumber}</p>
            )}
            {partA && (
              <i className="fa-solid fa-pen-to-square" onClick={() => edit('phoneNumber')}></i>
            )}
          </div>
        </div>
        <MainButton buttonClass={"primary"} onClick={handleImage}>
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
          <MainButton buttonClass={"primary"} onClick={editProfileDetails}>
            <span className='btn-text'>{textChange}</span>
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
      <Notifications />
      <Error />
    </div>
  );
}

export default Profile;