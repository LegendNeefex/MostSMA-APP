import React from 'react'
import { useContext,useRef,useEffect } from 'react'
import MostSmaContext from '../context/Most-smaContext'

function Notifications() {
    const {notBox,setNotBox} = useContext(MostSmaContext)
    const notBoxRef = useRef(null);    
    useEffect(() => {
        const handleClickOutside = (e) => {
          if (notBoxRef.current && !notBoxRef.current.contains(e.target)) {
            setNotBox(false); // Set to false if clicked outside
            
          }
        };
    
        // Add event listener to detect outside clicks
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          // Cleanup the event listener when the component is unmounted
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notBoxRef,setNotBox]);
    
  return (
    <>
        {
           notBox ?
           <>
                <div className="main-container" ref={notBoxRef}>
                    <div className="header">
                        <h2>Notifications</h2>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className="filter">
                        <div className="filt-cont">
                            <p>General</p>
                        </div>
                        <div className="filt-cont">
                            <p>Group</p>
                        </div>
                    </div>
                    <div className="not-container">
                        <div className="not-box">
                            <h3>Task</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, est ratione doloribus perspiciatis fugit enim!</p>
                            <p className='span'>Just now.</p>
                        </div>
                        <div className="not-box">
                            <h3>Welcome</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, est ratione doloribus perspiciatis fugit enim!</p>
                            <p className='span'>2mins now.</p>
                        </div>
                    </div>
                </div>
           </>
           :
           <></>
        }
    </>
  )
}

export default Notifications