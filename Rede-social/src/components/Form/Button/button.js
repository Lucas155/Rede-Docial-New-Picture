import React from 'react';
import './Button.css'; 

const Button = ({children, ...props}) => {
  return (
    <button>{children}</button>
  )
}

export default Button;