import React from 'react';

function Heading() {
  return (
    <div className="bg-gray-100 p-8">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-4">Convolution Code State Diagram Generator</h1>
        
        <p className="text-gray-700">This component generates a state diagram for convolution codes, providing a visual representation of the encoding and decoding process.
        <br/>
        We have fixed the length of the input bits to 1 for simplification. 
        <br/>
        The generator matrix is represented as a string of binary numbers, separated by commas. For example, the generator matrix for the rate 1/2 code is "101,111".
        </p>
      </div>
    </div>
  );
}

export default Heading;
