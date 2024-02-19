import React from 'react'
import NavBar from '../components/NavBar.js';
import Lottie from 'react-lottie';
import animationData from "./careeranimation.json"
export const LandingPage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
  return (
    <div>
        <NavBar/>
        <div
        style={{
            display:'flex',
            width:'100%',
            padding:'1%',
            flexDirection:'column',
            alignItems:'center'
        }}
        >
            <Lottie options={defaultOptions} height={450} width={450} />
            <h6>Find the best career opportunities, Just by Logining In or Register if you donot have account.</h6>
        </div>
    </div>
  )
}
