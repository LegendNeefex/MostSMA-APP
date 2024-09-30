
function  MainButton({children, buttonType,buttonClass, onClick}) {
  
    return ( 
        <button type={buttonType} className={`btn btn-${buttonClass}`} onClick={onClick}>
            {children}
        </button>
    )
}
  
// MainButton.defaultProps ={
//   buttonClass:'primary',
// }

export default  MainButton; 