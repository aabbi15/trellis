'use client'
import React, { useState } from 'react';

import parseLogic from '../helper/parselogic';
import encoder_main from '../helper/encoder';






function InputForm({ onSubmit }) {

  
  // these sets dynamic variables for the form

  const [K, setK] = useState('');
  
  const [n, setn] = useState('');
  const [logic, setLogic] = useState('');
  const [error, setError] = useState('');

 
  //this function is activated when the form is submitted

  const handleSubmit = (event) => {
    
    // used to prevent automatic cancellation of the form
    event.preventDefault();
  
    const parsedLogic = parseLogic(logic);


    // conditions to check if the form is filled correctly

    if (parsedLogic.length !== parseInt(n)) {
      setError('Invalid number of Generator Matrices');
      return;
    }

    if (parsedLogic[0].length !== parseInt(K)) {
      setError('Invalid Generator Matrix');
      return;
    }

    if (parseInt(K) <= 1) {
      setError('Invalid Constraint Length [K >= 2]');
      return;
    }

    if (parseInt(n) <= 0) {
      setError('Invalid Output Length');
      return;
    }

    // console.log(parsedLogic);

    encoder_main(K,1 ,n,parsedLogic,'100');

    onSubmit({ K, k:1, n, parsedLogic });

    setError('');

  //scrolls the window down so graph is visible

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 300);
  
   
  };







return (

  <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
  
    <div className="mb-4">
      <label htmlFor="K" className="block text-sm font-medium text-gray-700">Constraint Length (K)</label>
      <input type="number" id="K" value={K} onChange={e => setK(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  "
        placeholder="Enter constraint length" />
    </div>
    
    <div className="mb-4">
      <label htmlFor="n" className="block text-sm font-medium text-gray-700">Output Length (n)</label>
      <input type="number" id="n" value={n} onChange={e => setn(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  "
        placeholder="Enter output length" />
    </div>
    <div className="mb-6">
      <label htmlFor="logic" className="block text-sm font-medium text-gray-700">Enter rows of Generator Matrix (e.g., &quot; 111,010,101 &quot;)</label>
      <textarea id="logic" value={logic} onChange={e => setLogic(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  "
        placeholder="Enter Generator Matrices"></textarea>
    </div>
    <button type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Generate State Diagram
    </button>

    {/* used to diplay errors */}
    {error && <div className="text-red-500">{error}</div>}
  </form>
);
}

export default InputForm;
