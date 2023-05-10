import React, { useState, useEffect } from "react";

import { Column } from "@ant-design/plots";

const DemoColumn = ({data}) => {
  console.log(data)

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: "#272727",
    maintainAspectRatio:false ,
    height:250,
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: "type",
      },
      value: {
        alias: "sales",
      },
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;