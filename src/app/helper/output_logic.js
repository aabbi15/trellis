function output_setter(register,xorlogic) {


    let  output = '';

    //xorlogic is a 2D array of all the genrator matrices
    let n = xorlogic.length;

    //register represents current value of the register
    let K = register.length;

    // console.log({register});


    //this loop runs for each output bit i.e, for all generator matrices
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

        //sum represents exor of required bits of the register
        
        
        //we add this to the set of already calculated output bits
         output =  output + sum.toString();
        // console.log(j,sum, output);
       
    }
    
   

    return  output;
};


export default output_setter;