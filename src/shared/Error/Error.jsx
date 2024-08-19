import React, { useContext } from 'react'
import MostSmaContext from '../../context/Most-smaContext'

function Error({errClass}) {
  const {error,errOverLay} = useContext(MostSmaContext)

  return (
    <>
      {
        errOverLay
        ?
        <>
          <div className={`err err-${errClass}`}>
            <i className="fa-solid fa-circle-exclamation"></i>
            <h2>{error}</h2>
          </div>
        </>
        :
        <></>
      }
    </>
  )
}

// Error.defaultProps={
//     errClass:"badErr"
// }


export default Error