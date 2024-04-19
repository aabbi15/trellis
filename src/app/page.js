'use client'

import InputForm from "./components/form";

import React from "react";
import { useState } from "react";
import Graph from "./components/d3graph";

import GraphLegend from "./components/legend";
import Heading from "./components/heading";
import Note from "./components/note";

export default function App(){
  const [inputs, setInputs] = useState(null);

  // const inputs2 = {K:3,k:1,n:3,parsedLogic:['100','101','111']};
  // console.log(setInputs);

  return (
    <div className="flex flex-col justify-center items-center">
      <Heading/>
      <InputForm onSubmit={setInputs} />

      {inputs && <GraphLegend/>}
      {inputs && <Note/> }
      {inputs && <Graph {...inputs} />}
      
    </div>
  )
}