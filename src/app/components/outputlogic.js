const { sum } = require("d3");

function logicfxn(K,k,n,parsedLogic){


    if(parsedLogic.length != n){
        return {err:'Invalid number Generator Matrix'};
    }

    if(parsedLogic[0].length != K){
        return {err:'Invalid Generator Matrix'};
    }

    if(K<=1){
        return {err:'Invalid Constraint Length'};
    }

    if(k<=0 || n<=0){ 
        return {err:'Invalid  Output Length'};
    }

    // console.log(K,k,n,parsedLogic);

    const xorlogic = parsedLogic;

    // console.log(xorlogic[0]);

    


    const numStates = Math.pow(2,k*(K-1));
    // console.log(numStates);
    const numBranches = Math.pow(2,k);


    const states = []
    
    for(let zz=0;zz<numStates;zz++){
        states.push({
            id: zz,
            label: zz.toString(2).padStart(k*(K-1), '0'),
            target: [],
            // targetLabel:[]
        
        });
    }

    

    
    //   console.log(states);

      

   states.forEach(state => {

    for (let input = 0; input < numBranches; input++) {

        // console.log(input);

        let temp = state.label;

        let pathbit = input.toString(2).padStart(k, '0');

        let register = pathbit + state.label;

        
        let target = register.slice(0, K-1);

        let output = output_setter(register,xorlogic);

        console.log({temp,pathbit ,register,target,output});


        
        state.target.push({
                            input,
                            target:parseInt(target,2),
                            output

                        });

    }

    
   })

    

    
   states.forEach(state => {
    console.log(state);
   })
    

   return states;
}



function output_setter(register,xorlogic) {
    let temp = '';
    let n = xorlogic.length;
    let K = register.length;

    // console.log({register});
    for(let j=0;j<n;j++){
        let sum=0;

        // console.log(xorlogic[j]);
        for(let bitit=0;bitit<K;bitit++){
            if(xorlogic[j][bitit] == '1' ){
                sum += Number(register[bitit]);
            }

            // console.log(j,bitit,register[bitit],xorlogic[j][bitit],sum);
        }
        
        sum = sum % 2;

        
        
        temp = temp + sum.toString();
        // console.log(j,sum,temp);
       
    }
    
   

    return temp;
};

export default logicfxn;