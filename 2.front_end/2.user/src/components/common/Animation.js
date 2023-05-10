import React from 'react'
import { useState } from 'react'
import { useSpring, animated, config } from 'react-spring'

export default function Animation({ children } ) {
    const [flip, set] = useState(false)
    const props = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        delay: 200,
        reset: true,
        reverse: flip,
        config: config.molasses,
        onRest: () => set(!flip),
      
    })
    return <animated.div style={props}>{children}</animated.div>
}
