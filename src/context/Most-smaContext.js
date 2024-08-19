import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const MostSmaContext = createContext();


export const MostSmaProvider = (({children})=>{
    const [buttonText,setButtonText] = useState("")
    const [otherButtonText,setOtherButtonText] = useState("")
    const [text,setText] = useState({
        email:"",
        password:""
    })
    const [pwdShow,setPwdShow] = useState(false)
    const [switchTopbar,setSwitchTopbar] = useState(false)
    const [addProfile, setAddProfile] = useState(true);
    const [switchTab,setSwitchTab] = useState(() => parseInt(localStorage.getItem('switchTab')) || 1)
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('history')) || []);
    const [selected,setSelected] = useState({})
    const [checkPage,setCheckPage] = useState(true)
    const [error,setError] = useState("Error")
    const [errOverLay,setErrOverLay] = useState(false)


    const location = useLocation();
    const navigate = useNavigate();

    const checkboxItemsPerTab = useMemo(()=>({
        tab1:{
            "writing code and developing software": false,
            "developing and maintaining websites": false,
            "building and programming hardware systems": false,
            "designing and implementing network systems": false,
            "analyzing data and finding patterns": false,
            "protecting systems from cyber threats": false,
        },
        tab2:{
            "software development and programming": false,
            "web design and development":false,
            "embedded system design": false,
            "network security and protocols": false,
            "data mining and statistical analysis": false,
            "cyber security and ethical hacking": false,
        },
        tab3:{
            "AWS certified developer":false,
            "IBM Full-stack software developer professional certifications":false,
            "Cisco CCNA": false,
            "Google data analytics certificate ": false,
            "certified ethical hacker":false,
            "none of the above":false,
        },
        tab4:{
            "developing software applications": selected["developing software applications"] || false,
            "designing websites and web applications": false,
            "building hardware and embedded systems":false,
            "building and managing computer networks":false,
            "analyzing large datasets":false,
            "securing computer networks":false,
        },
        tab5:{
            "writing efficient and maintainable codes": false,
            "creating user-friendly web interfaces": false,
            "designing and testing hardware components": false,
            "setting up and configuring networks":false,
            "extracting insights from data":false,
            "identifying and fixing security vulnerabilities": false,
        },
        tab6:{
            "becoming a software developer ":false,
            "becoming a web developer ": false,
            "becoming an embedded system engineer": false,
            "becoming a network engineer ": false,
            "becoming a data analyst": false,
            "becoming a cybersecurity experts":false,
        }
    }),[selected])

    const [checkedItems, setCheckedItems] = useState(() => {
        const currentTab = `tab${switchTab}`;
        return selected[currentTab] || checkboxItemsPerTab[currentTab];
    });
    
    const handleCheckboxChange = (event) => {
        const currentTab = `tab${switchTab}`;
        console.log(currentTab);
        const { name, checked } = event.target;


        setCheckedItems((prevItems) => ({
            ...prevItems,  // Keep the other checkboxes
            [name]: checked  // Update the clicked checkbox
        }))
        console.log(checkedItems);


        setSelected((prevSelected) => {
            // Only update the selected state if checkedItems are different
            if (JSON.stringify(prevSelected[currentTab]) !== JSON.stringify(checkedItems)) {
                return {
                    ...prevSelected,
                    [currentTab]: { ...checkedItems }
                };
            }
            return prevSelected;
        });
    };

    
    // useEffect(() => {
    //     console.log('checkedItems:', checkedItems);
    //     console.log('selected:', selected);
    // }, [checkedItems, selected]);


    useEffect(()=>{
        localStorage.setItem('switchTab', switchTab);
        localStorage.setItem('history', JSON.stringify(history));

        const currentTab = `tab${switchTab}`;
        setCheckedItems(selected[currentTab] || checkboxItemsPerTab[currentTab]);
        // console.log(currentTab);
        

        if (location.pathname === "/register") {
            setButtonText("Sign in");
            setCheckPage(false); // Set to false to navigate to "/"
            setOtherButtonText("About");
        } else if (location.pathname === "/login") {
            setButtonText("Sign up");
            setCheckPage(true); // Set to true to navigate to "/home"
            setOtherButtonText("Home");
        } else {
            setButtonText("Sign up");
            setOtherButtonText("About");
            setCheckPage(false); // Default case, navigate to "/"
        }

        if (location.pathname === "/profile-info-update") {
            setSwitchTopbar(true)
            setAddProfile(true)
            setCheckPage(false)
        }else if (location.pathname === "/interests") {
            setSwitchTopbar(true)
            setAddProfile(true)
            setCheckPage(false)
        }else if (location.pathname === "/home") {
            setSwitchTopbar(true)
            setAddProfile(false)
            setCheckPage(true)
        }else if (location.pathname === "/") {
            setCheckPage(false)
        }else{
            setSwitchTopbar(false)
            setCheckPage(false)
        }

    },[location.pathname, setButtonText, setOtherButtonText, switchTab, history, selected,checkboxItemsPerTab])

    const linkHandler = (text) => {
        if (text === "Sign up") {
            navigate("/register");
        } else if (text === "About") {
            navigate("/about-us");
        } else if (text === "Home") {
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    const textHandler = (e) => {
        setText((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            
        }));
        // setText({[e.target.name]: e.target.value,})
        // console.log(text);
    }

    const pwdHandler = () =>{
        if (!pwdShow) {
            setPwdShow(true)
        }else{
            setPwdShow(false)
        }
    }

    const skipHandler = (()=>{
        if (switchTab < 6) {
            setHistory((prevHistory) => {
              const updatedHistory = [...prevHistory, switchTab]; // Save the current tab
              return updatedHistory;
            });
            setSwitchTab((prev) => prev + 1); // Move to the next tab
        }
    })


    const backHandler = (()=>{
        if (history.length > 0) {
            const previousTab = history[history.length - 1]; // Get the last tab from history
            setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove the last tab from history
            setSwitchTab(previousTab); // Go back to the previous tab
        }
    })

    const continueHandler = (()=>{
        let hasTrueValue = false;
    
        for (const value of Object.values(selected)) {
            if (value === true) {
                hasTrueValue = true;
                break;
            }
        }

        if (hasTrueValue) {
            console.log(selected);
            alert("At least one checkbox is checked");
            setHistory((prevHistory) => {
                const updatedHistory = [...prevHistory, switchTab]; // Save the current tab
                return updatedHistory;
              });
            setSwitchTab((prev) => prev + 1); // Move to the next tab
        } else {
            alert("No checkboxes are checked");
        }
    
    })

    const finishHandler = (()=>{
        alert("all done")
        setTimeout(() => {
            navigate("/home")
        }, 2000);
    })

    const stateData = {
        buttonText,
        otherButtonText,
        pwdShow,
        text,
        switchTopbar,
        switchTab,
        addProfile,
        selected,
        checkPage,
        error,
        errOverLay,
        checkedItems,
        setText,
        linkHandler,
        textHandler,
        pwdHandler,
        skipHandler,
        backHandler,
        setSelected,
        continueHandler,
        finishHandler,
        setErrOverLay,
        setError,
        handleCheckboxChange
        
    }

    return (
        <MostSmaContext.Provider value={stateData}>
            {children}
        </MostSmaContext.Provider>
    )
})

export default MostSmaContext;