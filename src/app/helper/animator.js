const animateInput = (input, index) => {
    if (index < input.length) {
      const bit = input[index];
      highlightNode(currentNode);
      setTimeout(() => {
        const { nextNode, outputBit } = moveAlongPath(bit);
        setOutputString(prev => prev + outputBit);
        highlightPath(currentNode, nextNode);
        currentNode = nextNode; // Update the current node
        highlightNode(currentNode);
        animateInput(input, index + 1);
      }, 1000); // Delay to allow for viewing the transition
    }
  };

  
  export default animateInput;