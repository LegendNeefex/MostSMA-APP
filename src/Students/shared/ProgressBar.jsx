import React from 'react'

function ProgressBar({progressClass}) {
  return (
    <div className={`bar bar-${progressClass}`}>
        <div className="step-bar"></div>
    </div>
  )
}

// ProgressBar.defaultProps={
//     progressClass:"10"
// }

export default ProgressBar