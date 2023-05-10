

import React from 'react';
import { useSpring, config, animated } from "react-spring";


const AnimateNumber = (props) => {
    const { number } = useSpring({
      reset: true,
      reverse: false,
      to: { number: props.number },
      from: { number: 0 },

      delay: 200,
      config: config.molasses,
    });
    return (
      <>
        <animated.div>
          {number.to((n) => {
            if (props.type == "currency") {
              var formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              });
              return formatter.format(n); 
            }else{

              return n.toFixed(0)
            }
             
          })}
        </animated.div>
      </>
    );
};




export default AnimateNumber;
