import React from 'react'
import { logo } from '../../assets/images'

function Logo({width = "100px"}) {
  return (
    <img src={logo} alt="" />
  )
}

export default Logo