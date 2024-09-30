import React, { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { MostSmaProvider } from './context/Most-smaContext'
import ScrollToTop from './Students/components/pages/Routes/ScrollToTop'
import HomePage from './Students/components/container/HomePage'
import TopBar from './Students/components/pages/TopBar'
import Footer from './Students/./components/pages/Footer'
import SignUp from './Students/components/pages/Routes/SignUp'
import SignIn from './Students/./components/pages/Routes/SignIn'
import About from './Students/components/pages/Routes/About'
import Dashboard from './Students/components/pages/Routes/Dashboard'
import ProfileInfoUpdate from './Students/components/pages/Routes/ProfileInfoUpdate'
import Interests from './Students/components/pages/Routes/Interests'
import Profile from './Students/components/pages/Routes/Profile'
import { BarLoader } from 'react-spinners'
import { useEffect } from 'react'

const override = {
  display: "flex",
  width:"40%",
  margin:"300px auto",
};

function App() {
  const [loading,setLoading] = useState(false)

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 3000);
  };

  useEffect(() => {
      startLoading();
  }, []); // Only run once when the component mounts
  
  
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MostSmaProvider>
        {
          loading ?
          <>
            <BarLoader color={"#0B3F88"} cssOverride={override} />
          </>
          :
          <>
            <TopBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/register' element={<SignUp />}/>
              <Route path='/login' element={<SignIn />}/>
              <Route path='/about-us' element={<About />}/>
              <Route path='/home' element={<Dashboard />}/>
              <Route path="/profile-info-update" element={<ProfileInfoUpdate/>} />
              <Route path="/interests" element={<Interests/>} />
              <Route path="/profile" element={<Profile/>} />
            </Routes>
            <Footer />  
          </>
        }
      </MostSmaProvider>
    </BrowserRouter>
  )
}

export default App