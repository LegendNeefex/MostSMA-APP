import React, { useContext } from 'react'
import Interests1 from '../../../shared/Interests1'
import Interests2 from '../../../shared/Interests2'
import Interests3 from '../../../shared/Interests3'
import Interests4 from '../../../shared/Interests4'
import Interests5 from '../../../shared/Interests5'
import Interests6 from '../../../shared/Interests6'
import MostSmaContext from '../../../context/Most-smaContext'

function Interests() {
  const {switchTab} = useContext(MostSmaContext)

  const renderCurrentTab = () => {
    switch (switchTab) {
      case 1:
        return <Interests1 />;
      case 2:
        return <Interests2 />;
      case 3:
        return <Interests3 />;
      case 4:
        return <Interests4 />;
      case 5:
        return <Interests5 />;
      case 6:
        return <Interests6 />;
      default:
        return <Interests1 />;
    }
  }


  return (
    <div>
      {renderCurrentTab()}
    </div>
  )
  
}


export default Interests