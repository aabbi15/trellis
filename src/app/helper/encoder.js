import logicfxn from "../components/logicfxn";

function encoder_main(K,k,n,parsedLogic,input){


    const states = logicfxn(K,k,n,parsedLogic);

    console.log(states);

    // console.log(parsedLogic);
    // console.log(K);
    // console.log(k);
    // console.log(n);
    // console.log(input);

    let state = 0;
    let output = '';
    let stateList = [];
    let outputList = [];
    let stateOutputList = [];

    for (let i = 0; i < n; i++) {
        stateList.push(state);
        outputList.push(output);
        let inputIndex = parseInt(input[i]);
        let stateIndex = parseInt(state);
        let outputIndex = parseInt(parsedLogic[stateIndex][inputIndex]);
        stateOutputList.push(outputIndex);
        state = outputIndex;
        output = stateIndex;
    }

    return [stateList, outputList, stateOutputList];
}

export default encoder_main;