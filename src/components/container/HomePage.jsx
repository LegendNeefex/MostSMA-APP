import React, { useContext } from 'react'
import Banner from '../pages/Banner'
import Section1 from '../pages/Section1'
import Section2 from '../pages/Section2'
import { BarLoader } from 'react-spinners'
import MostSmaContext from '../../context/Most-smaContext'

function HomePage() {
  const {loading} = useContext(MostSmaContext)

  return (
    <>
      {
        loading ?
        <BarLoader />
        :
        <>
          <Banner />
          <Section1 />
          <Section2 />
        </>
      }
        
    </>
  )
}

export default HomePage