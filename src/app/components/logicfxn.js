import output_setter from "../helper/output_logic";

function logicfxn(K,k,n,parsedLogic){



    // console.log(K,k,n,parsedLogic);

    const xorlogic = parsedLogic;

    // console.log(xorlogic[0]);

    


    const numStates = Math.pow(2,k*(K-1));
    // console.log(numStates);
    const numBranches = Math.pow(2,k);


    const states = []

    //fill in all the states with their ids and label
    for(let zz=0;zz<numStates;zz++){
        states.push({
            id: zz,
            label: zz.toString(2).padStart(k*(K-1), '0'),//converts integer to binart string
            target: [],
            
        
        });
    }

    
    //   console.log(states);

      

   states.forEach(state => {

    //find target for each branch of the state(in our case 2)
    for (let input = 0; input < numBranches; input++) {

        // console.log(input);

        let temp = state.label;

        let pathbit = input.toString(2).padStart(k, '0');

        let register = pathbit + state.label;

        

        let target = register.slice(0, K-1); //remove last recently added bit from register

        let output = output_setter(register,xorlogic);

        // console.log({temp,pathbit ,register,target,output});


        //push the target and output of the branch to the state

        state.target.push({
                            input,
                            target:parseInt(target,2),
                            output

                        });

    }

    
   })

    

    
//    states.forEach(state => {
//     console.log(state);
//    })
    

   return states;
}



export default logicfxn;