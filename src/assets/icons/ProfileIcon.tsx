import React from 'react'
import { IconProps } from '../../models';

const ProfileIcon:React.FC<IconProps> = ({size}) => {
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_82_53)">
        <circle cx="10" cy="10" r="9.375" stroke="black" strokeWidth="1.25"/>
        <circle cx="10" cy="7" r="2.375" stroke="black" strokeWidth="1.25"/>
        <path d="M3 16C5 13.3333 11.5 10.5 17 16" stroke="black" strokeWidth="1.25"/>
      </g>
      <defs>
        <clipPath id="clip0_82_53">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default ProfileIcon;