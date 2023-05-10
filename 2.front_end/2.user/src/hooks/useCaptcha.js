import { createRef, useEffect, useRef, useState } from "react";
import makeCaptcha from "../utils/rand.js";

export default function useCaptcha() {
  const [state, setState] = useState(false);
  const captcha  = useRef(makeCaptcha(7));
  const ref=createRef()


  const CaptchaComponent = () => {
    return (
      <div className="d-flex">
        <div className="w-50 captcha p-2 text-center">{captcha.current}</div>
        <input
          className="w-50"
          type="text"
          value={ref.current}
          onChange={(e) => {
            console.log("event",e.target.value,captcha.current.toLocaleUpperCase())
            if (e.target.value === captcha.current.toLocaleUpperCase()) {
              setState(true);
            }
          }}
        />
      </div>
    );
  };

  return {
    state,
    CaptchaComponent,
  };
}
