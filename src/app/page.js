'use client'

import InputForm from "./components/form";
import TrellisDiagram from "./components/trellis";
import React from "react";
import { useState } from "react";
import Graph from "./components/d3graph";
import Graph2 from "./components/graph2";

export default function App(){
  const [inputs, setInputs] = useState(null);

  // const inputs2 = {K:3,k:1,n:3,parsedLogic:['100','101','111']};
  // console.log(setInputs);

  return (
    <div>
      <InputForm onSubmit={setInputs} />
      {/* {inputs && <TrellisDiagram {...inputs} />} */}
      {inputs && <Graph {...inputs} />}
      {/* {inputs && <Graph2 {...inputs}/> } */}
    </div>
  )
}