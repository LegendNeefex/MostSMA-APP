import React, { useState, useContext, useRef, useEffect } from 'react';
import MostSmaContext from '../../context/Most-smaContext';
import Error from './Error/Error';
import { useNavigate } from 'react-router-dom';

function Notifications() {
    const { notBox, setNotBox, setErrOverLay, setError } = useContext(MostSmaContext);
    const notBoxRef = useRef(null);    
    const notCommentRef = useRef(null);    

    const [notComment, setNotComment] = useState(false);
    const [filter, setFilter] = useState(true);
    const [user, setUser] = useState(null);
    const [generalNotifications, setGeneralNotifications] = useState([]);
    const [groupNotifications, setGroupNotifications] = useState([]);

    const navigate = useNavigate();

    // const notification = [
    //     {
    //         type: 'general',
    //         data: [
    //             {
    //                 header: "Task",
    //                 title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //                 time: "Just now"
    //             },
    //             {
    //                 header: "Welcome",
    //                 title: "Id, est ratione doloribus perspiciatis fugit enim!",
    //                 time: "2 mins ago"
    //             },
    //             {
    //                 header: "Welcome",
    //                 title: "Id, est ratione doloribus perspiciatis fugit enim!",
    //                 time: "2 mins ago"
    //             }
    //         ]
    //     },
    //     {
    //         type: 'group',
    //         data: [
    //             {
    //                 header: "Urgent Meeting",
    //                 title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    //                 time: "12 hours ago"
    //             },
    //             {
    //                 header: "Another Urgent Meeting",
    //                 title: "Id, est ratione doloribus perspiciatis fugit enim!",
    //                 time: "2 hours ago"
    //             }
    //         ]
    //     }
    // ];

    

    useEffect(() => {
        const storedUser = localStorage.getItem("studentData");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [notBox]); // Re-run this effect when notBox changes

    const commentHandler = () => {
        setNotComment(true);
    };

    useEffect(() => {
        if (!notBox && !notComment) {
            setFilter(true);
        }
    }, [notBox, notComment]);

    const generalSwitchHandler = () => {
        if (!filter) {
           setFilter(true);
        }
    };

    useEffect(() => {
        async function fetchNotifications() {
            const storedUser = localStorage.getItem("studentData");
            const parsed = JSON.parse(storedUser);
      
          try {
            const response = await fetch(`http://192.168.100.30/smaApi/api/students/notifications`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ jwt: parsed.jwt }), // Sending JWT
            });
      
            const data = await response.json();
            // Filter and map for 'General' type notifications
            const generalNotifications = data
            .filter(item => item.type.toLowerCase() === 'programming') // Filter by type
            .flatMap(item => item.data); // Map through the nested data array
            setGroupNotifications(generalNotifications);

            // Filter and map for 'programming' (group) type notifications
            const groupNotifications = data
            .filter(item => item.type.toLowerCase() === 'general') // Filter by type
            .flatMap(item => item.data); // Map through the nested data array
            setGeneralNotifications(groupNotifications);

            // console.log('General Notifications:', generalNotifications);
            // console.log('Group Notifications:', groupNotifications);
        
          } catch (error) {
            console.log("An error occurred, No JWT");
            navigate("/login")
          }
        }
      
        fetchNotifications();
    }, [navigate,]);
      

    const groupSwitchHandler = () => {
        if (!user || user.group === "null") {
            setErrOverLay(true);
            setError("Sorry, action couldn't be performed because you don't belong to a group");
            setNotBox(false);
            setNotComment(false);
            setTimeout(() => {
                setErrOverLay(false);
                setFilter(true);
            }, 3000);
        } else {
            setFilter(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            const clickedOutsideNotBox = notBoxRef.current && !notBoxRef.current.contains(e.target);
            const clickedInsideNotComment = notCommentRef.current && notCommentRef.current.contains(e.target);
            const clickedOutsideNotComment = notCommentRef.current && !notCommentRef.current.contains(e.target);

            if (clickedOutsideNotBox && clickedOutsideNotComment) {
                setNotBox(false);
                setNotComment(false);
            } else if (clickedOutsideNotComment && notBox && !clickedInsideNotComment) {
                setNotComment(false);
            } else if (clickedOutsideNotBox && !clickedInsideNotComment) {
                setNotBox(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notBox, notComment, setNotBox, setNotComment]);

    if (!user) {
        return null; // Don't render anything if there's no user data
    }

    // const general = generalNotifications.forEach((notification) => {
    //     console.log(notification);
    // })
    

    return (
        <>
            {notBox && ( 
                <div className="main-container" ref={notBoxRef}>
                    <div className="header">
                        <h2>Notifications</h2>
                        <i className="fa-solid fa-ellipsis" onClick={commentHandler}></i>
                    </div>

                    <div className="filter">
                        <div className={`filt-cont ${filter ? 'active' : ''}`} onClick={generalSwitchHandler}>
                            <p>General</p>
                        </div>
                        <div className={`filt-cont ${!filter ? 'active' : ''}`} onClick={groupSwitchHandler}>
                            <p>Group</p>
                        </div>
                    </div>
                    {filter ? (
                        <>
                            {generalNotifications.map((notification, index) => {
                                // console.log(notification); 
                                return (
                                    <div className="not-container" key={index}>
                                        <div className="not-box">
                                            <h3>{notification.title}</h3>
                                            <p>{notification.content}</p>
                                            <p className='span'>{notification.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                        ) : (
                        <>
                            {groupNotifications.map((notification, index) => {
                                // console.log(notification);
                                return (
                                    <div className="not-container" key={index}>
                                        <div className="not-box">
                                            <h3>{notification.title}</h3>
                                            <p>{notification.content}</p>
                                            <p className='span'>{notification.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>            
            )}

            {notComment && (
                <div className="comment-container" ref={notCommentRef}>
                    <div className="not space">
                        <i className="fa-solid fa-clock" ></i>
                        <p>Unread</p>
                    </div>
                    <div className="not">
                        <i className="fa-solid fa-check-double"></i>
                        <p>Mark all as read</p>
                    </div>
                </div>
            )}
            <Error />
        </>
    );
}

export default Notifications;