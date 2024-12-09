import React from 'react'
import { logo } from '../../assets/images'

function Logo({width}) {
  return (
    <img src={logo} className={`${width}`} alt="" />
  )
}

export default Logo