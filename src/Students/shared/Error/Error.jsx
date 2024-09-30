import React, { useContext } from 'react'
import MostSmaContext from '../../../context/Most-smaContext'

function Error() {
  const {error,errOverLay,errorType} = useContext(MostSmaContext)

  return (
    <>
      {
        errOverLay
        ?
        <>
          {
            errorType ?
            <div className={`err err-${"goodErr"}`}>
              <i className="fa-solid fa-circle-check"></i>
              <h2>{error}</h2>
            </div>
            :
            <div className={`err err-${"badErr"}`}>
              <i className="fa-solid fa-circle-exclamation"></i>
              <h2>{error}</h2>
            </div>
          }
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