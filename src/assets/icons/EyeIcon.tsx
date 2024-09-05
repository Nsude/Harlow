import React from 'react'

export interface EyeIcon {
  size?: number;
  display?: boolean;
}

const EyeIcon:React.FC<EyeIcon> = ({size, display}) => {
  const transition = {transition: `all ${250}ms linear`};
  return (
    <>
      <svg width={size || 18} height={size || 18} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.375 11.5C11.375 14.5959 10.719 17.3676 9.68853 19.3426C8.64232 21.3478 7.30652 22.375 6 22.375C4.69348 22.375 3.35768 21.3478 2.31147 19.3426C1.28104 17.3676 0.625 14.5959 0.625 11.5C0.625 8.40414 1.28104 5.63237 2.31147 3.65738C3.35768 1.65215 4.69348 0.625 6 0.625C7.30652 0.625 8.64232 1.65215 9.68853 3.65738C10.719 5.63237 11.375 8.40414 11.375 11.5Z" stroke="#171717" strokeWidth="1.25"/>
        <path d="M22.375 11.5C22.375 14.5959 21.719 17.3676 20.6885 19.3426C19.6423 21.3478 18.3065 22.375 17 22.375C15.6935 22.375 14.3577 21.3478 13.3115 19.3426C12.281 17.3676 11.625 14.5959 11.625 11.5C11.625 8.40414 12.281 5.63237 13.3115 3.65738C14.3577 1.65215 15.6935 0.625 17 0.625C18.3065 0.625 19.6423 1.65215 20.6885 3.65738C21.719 5.63237 22.375 8.40414 22.375 11.5Z" stroke="#171717" strokeWidth="1.25"/>
        <circle style={transition} cx={!display ? "8.5" : "3.5"} cy={!display ? "7.5" : "14.5"} r="2.5" fill="#171717"/>
        <circle style={transition} cx={!display ? "19.5" : "14.5"} cy={!display ? "7.5" : "14.5"} r="2.5" fill="#171717"/>
      </svg>
    </>
  )
}

export default EyeIcon;