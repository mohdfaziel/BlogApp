import React from 'react'
import { ldr } from '../../assets/images'
import Lottie from 'lottie-react'
function Loader({loader = ldr}) {
  return (
    <div className="w-fit h-fit scale-50">
    <Lottie animationData={loader} />
  </div>
  )
}

export default Loader