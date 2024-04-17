'use client'
import React, { useState } from 'react';
import logicfxn from './outputlogic';

function InputForm({ onSubmit }) {
  const [K, setK] = useState('');
  // const [k, setk] = useState('');
  const [n, setn] = useState('');
  const [logic, setLogic] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  

    const parsedLogic = parseLogic(logic);

    // console.log(parsedLogic);
    onSubmit({ K, k:1, n, parsedLogic });
    
  };


  const parseLogic = (logic) => {

  const operations = logic.split(',')
  .map(op => {
    const generators = op.trim();
    
    return generators;
  });

  //creates an array of generator matrix strings
  return operations;
};


return (
  <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
    <div className="mb-4">
      <label htmlFor="K" className="block text-sm font-medium text-gray-700">Constraint Length (K)</label>
      <input type="number" id="K" value={K} onChange={e => setK(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter constraint length" />
    </div>
    {/* <div className="mb-4">
      <label htmlFor="k" className="block text-sm font-medium text-gray-700">Input Length (k)</label>
      <input type="number" id="k" value={k} onChange={e => setk(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter input length" />
    </div> */}
    <div className="mb-4">
      <label htmlFor="n" className="block text-sm font-medium text-gray-700">Output Length (n)</label>
      <input type="number" id="n" value={n} onChange={e => setn(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter output length" />
    </div>
    <div className="mb-6">
      <label htmlFor="logic" className="block text-sm font-medium text-gray-700">Enter rows of Generator Matrix (e.g., "111,010,101")</label>
      <textarea id="logic" value={logic} onChange={e => setLogic(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter Generator Matrices"></textarea>
    </div>
    <button type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Generate State Diagram
    </button>
  </form>
);
}

export default InputForm;
