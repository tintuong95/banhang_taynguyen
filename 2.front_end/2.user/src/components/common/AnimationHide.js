import React from 'react'
import { useState } from 'react'
import { useSpring, animated, config } from 'react-spring'

export default function AnimationHide({ children }) {

    const props = useSpring({
        to: {
            height:'auto'
            
        },
        from: { height:0 },
        delay: 1000,
        config: config.molasses,

    })
    return <animated.div 
   

    style={props}>{children}</animated.div>
}
