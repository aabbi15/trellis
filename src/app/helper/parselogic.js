//used to get generators matrix from the input

const parseLogic = (logic) => {

    const operations = logic.split(',')
    .map(op => {
      const generators = op.trim();
      
      return generators;
    });
  

    return operations;
  };


  export default parseLogic;