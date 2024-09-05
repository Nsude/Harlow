import React from "react"

const ErrorSvg: React.FC<{size?: number}> = ({size}) => {
  return (
    <svg width={size || 18} height={size || 18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.625" y="0.625" width="18.75" height="18.75" rx="9.375" stroke="#F0A560" strokeWidth="1.25"/>
      <rect width="2" height="8.66667" transform="translate(9 4)" fill="#F0A560"/>
      <rect width="2" height="2" transform="translate(9 14)" fill="#F0A560"/>
    </svg>

  )
}

export default ErrorSvg