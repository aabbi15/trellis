import React, { useState } from 'react';

// function Graph({ K, k, n, parsedLogic }) {
//   const [inputString, setInputString] = useState('');
//   const [outputString, setOutputString] = useState('');

//   const handleInputChange = (event) => {
//     setInputString(event.target.value);
//   };

//   const startAnimation = () => {
//     animateInput(inputString, 0);
//   };





export default function Inputbox() {
  const [inputString, setInputString] = useState('');
  const [outputString, setOutputString] = useState('');

  const handleInputChange = (event) => {
    setInputString(event.target.value);
  };

  return (
    <div className='bg-yellow-200 p-6 m-5 rounded-lg'>
    <div className="p-4 flex gap-10 justify-center items-center">
      <input
        type="text"
        value={inputString}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        onClick={null}
        className=" px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Start Animation
      </button>
      
    </div>
    <div className="mt-4">Output: {outputString}</div>
    </div>
  );
}

