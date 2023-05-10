import { Button } from "antd";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Bill from "./Bill.jsx";

const Print = () => {
    const {state}=useLocation()
const componentRef = useRef();

 console.log(state)

  return (
    <div className="">
      <ReactToPrint
        trigger={() => <Button type="primary">Print</Button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className="">
        {state?.map((item, index) => (
          <Bill data={item} />
        ))}
      </div>
    </div>
  );
};

export default Print;
