import React from 'react';
import parseLogic from '../helper/parselogic';

const InfoNote = ({ data }) => {

    // const g  = parseLogic(data.parsedLogic);
    console.log(data);
    const g = data.parsedLogic.join(', ');
    const numStates = 2 ** (data.K -1);
    return (
        <div className="bg-yellow-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Sticky Note</h2>
            <div className="flex flex-col">
                <p><strong>k:</strong> {data.k}</p>
                <p><strong>K:</strong> {data.K}</p>
                <p><strong>n:</strong> {data.n}</p>
                <p><strong>Number of States:</strong> {numStates}</p>
                <p><strong>generator matrices g:</strong> {g}</p>
            </div>
        </div>
    );
};

export default InfoNote;