import * as d3 from 'd3';


const highlightNode = (nodeId) => {
    d3.select(`#node-${nodeId}`)
      .transition()
      .duration(500)
      .style('fill', 'pink'); // Change as needed
  };
  
  const highlightPath = (sourceId, targetId) => {
    d3.select(`#path-${sourceId}-${targetId}`)
      .transition()
      .duration(3500)
      .style('stroke', 'black'); // Change as needed
  };

  
    export { highlightNode, highlightPath };