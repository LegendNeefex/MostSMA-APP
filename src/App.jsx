import React, { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { MostSmaProvider } from './context/Most-smaContext'
import ScrollToTop from './components/pages/Routes/ScrollToTop'
import HomePage from './components/container/HomePage'
import TopBar from './components/pages/TopBar'
import Footer from './components/pages/Footer'
import SignUp from './components/pages/Routes/SignUp'
import SignIn from './components/pages/Routes/SignIn'
import About from './components/pages/Routes/About'
import Dashboard from './components/pages/Routes/Dashboard'
import ProfileInfoUpdate from './components/pages/Routes/ProfileInfoUpdate'
import Interests from './components/pages/Routes/Interests'
import Profile from './components/pages/Routes/Profile'
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