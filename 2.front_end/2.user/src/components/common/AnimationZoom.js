import React from 'react'
import { useState } from 'react'
import { useSpring, animated, config } from 'react-spring'

export default function AnimationZoom({ children }) {
    const [hover, setHover] = useState(false)
    const props = useSpring({
        to: {
            transform: hover ? 'scale(1.2)' : ': scale(1)'
            
        },
        from: { transform: hover ? 'scale(1)' : ': scale(1)' },
        delay: 300,
        config: config.molasses,

    })
    return <animated.div 
    onMouseEnter={() => { setHover(true) }} 
// onMouseLeave={() => { setHover(false) }}
    style={props}>{children}</animated.div>
}
