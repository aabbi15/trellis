import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import logicfxn from './outputlogic';


function TrellisDiagram({ K, k, n, parsedLogic }) {
  const d3Container = useRef(null);



  function color_setter(branch) {
    if (branch.input == 0) {
      return 'red';
    } else {
      return 'blue';
    }
  }

  function tickfxn(){
    {
      // Update positions of normal links
      link.attr('d', function (d) {
        if (d.source === d.target) {
          const x = d.source.x, y = d.source.y;
          const dx = 20, dy = 20; // Dimensions for the loop
          return `M ${x},${y} C ${x + dx},${y - dy} ${x + dx},${y + dy} ${x},${y}`;
        } else {
          return `M ${d.source.x},${d.source.y} L ${d.target.x},${d.target.y}`;
        }
      });

      // Update node positions
      node.attr('cx', d => d.x)
        .attr('cy', d => d.y);

      // Update node labels
      nodeLabels.attr('x', d => d.x + 5)
        .attr('y', d => d.y);

      // Update branch labels, including self-links
      text.attr('x', d => d.source.x + 0.75 * (d.target.x - d.source.x))
        .attr('y', d => d.source.y + 0.75 * (d.target.y - d.source.y) - 5)
        .attr('fill', d => d.color);
    }
  }

  function ticked() {
    // Update loop positions for self-referencing nodes
    link.attr('d', function(d) {
      const x = d.source.x, y = d.source.y;
      const dx = 20, dy = 20; // Adjust these values for loop size and shape
      return `M ${x},${y} C ${x + dx},${y - dy} ${x + dx},${y + dy} ${x},${y}`;
    });
    node.attr('cx', d => d.x)
      .attr('cy', d => d.y);

  // Update node label positions
  nodeLabels.attr('x', d => d.x)
            .attr('y', d => d.y + 5); // Adjust for visual centering
}

  function selfLink(d,nodes)  {
          
    const node = nodes.find(n => n.id == d.source);
    console.log(node);
    const dx = 20; 
    const dy = 20;
    return `M ${node.x},${node.y} C ${node.x + dx},${node.y - dy} ${node.x + dx},${node.y + dy} ${node.x},${node.y}`;

};



  useEffect(() => {
    if (d3Container.current) {

      // Clears old diagram if any
      d3.select(d3Container.current).selectAll("*").remove();






      const numNodes = Math.pow(2, k * (K - 1));

      

      // console.log(K, k, n, parsedLogic);

      // const nodes = logicfxn(K, k, n, parsedLogic);

      // // console.log(nodes);


      // const links = [];

      // nodes.forEach(node => {
      //   node.target.forEach(branch => {

      //     links.push({

      //       source: node.id,
      //       target: branch.target,
      //       label: branch.output,
      //       color: color_setter(branch)

      //     });

      //   });
      // });

      // console.log(links);


      const nodes = []
    
  
      nodes.push({
          id: 1,
          label: '000',
          target: [{
            input:0,
            target:1,
            output:101

        }],
         
      
      });

      const links = [];

      nodes.forEach(node => {
        node.target.forEach(branch => {

          links.push({

            source: node.id,
            target: branch.target,
            label: branch.output,
            color: color_setter(branch)

          });

        });
      });



      const width = 175 * numNodes;
      const height = 125 * numNodes;
      

      //initialize svg element
      const svg = d3.select(d3Container.current).append('svg')
        .attr('width', width)
        .attr('height', height);

      
      
        // Create arrow markers for the links
      // svg.append('defs').selectAll('marker')
      //   .data(links)
      //   .enter().append('marker')
      //   .attr('id', d => `arrow-${d.source}-${d.target}`)
      //   .attr('viewBox', '0 -5 10 10')
      //   .attr('refX', 39) 
      //   .attr('refY', 0)
      //   .attr('markerWidth', 5)
      //   .attr('markerHeight', 5)
      //   .attr('orient', 'auto')
      //   .append('path')
      //   .attr('d', 'M0,-5L10,0L0,5')
      //   .attr('fill', d => d.color);

      // Add links (paths)
      const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', 2)
        .attr('stroke', d => d.color)
        .attr('marker-end', d => `url(#arrow-${d.source}-${d.target})`)
        .attr('d',d => selfLink(d,nodes));


  

      // Add nodes (circles)
      const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 30)
        .attr('stroke', 'black') 
        .attr('stroke-width', 2) 
        .attr('fill', 'pink')


      // Labels for nodes
      const nodeLabels = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('text-anchor', 'middle') // Ensure text is centered on its coordinates
        .text(d => d.label);

      // Text labels for branches
      const text = svg.append('g')
        .selectAll('text')
        .data(links)
        .join('text')
        .text(d => d.label)
        .attr('x', d => d.source.x + 0.75 * (d.target.x - d.source.x)) // One-fourth along the way from the source to the target
        .attr('y', d => d.source.y + 0.75 * (d.target.y - d.source.y) - 5) // Adjust y similarly, slightly above the line
        .attr('fill', 'black')
        .attr('text-anchor', 'middle');

      // Force simulation for positioning
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-2800))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick',tick)


   


      const drag = d3.drag()
        .on('start', (event) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();  // Reheat the simulation
          })

        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })

        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null; 
          d.fy = null;
        });

      node.call(drag);  // Apply drag behavior to nodes

    }


    function tick() {
      link.attr("d", function(d) {
        var x1 = d.source.x,
          y1 = d.source.y,
          x2 = d.target.x,
          y2 = d.target.y,
          dx = x2 - x1,
          dy = y2 - y1,
          dr = Math.sqrt(dx * dx + dy * dy),
  
          // Defaults for normal edge.
          drx = dr,
          dry = dr,
          xRotation = 0, // degrees
          largeArc = 0, // 1 or 0
          sweep = 1; // 1 or 0
  
        // Self edge.
        if (x1 === x2 && y1 === y2) {
          // Fiddle with this angle to get loop oriented.
          xRotation = -45;
  
          // Needs to be 1.
          largeArc = 1;
  
          // Change sweep to change orientation of loop. 
          //sweep = 0;
  
          // Make drx and dry different to get an ellipse
          // instead of a circle.
          drx = 30;
          dry = 20;
  
          // For whatever reason the arc collapses to a point if the beginning
          // and ending points of the arc are the same, so kludge it.
          x2 = x2 + 1;
          y2 = y2 + 1;
        }
  
        return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
      });
  
      node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
    }
  

    
  }, [K, k, n]);  // Redraw graph when K, k, or n changes

  return (
    <div ref={d3Container}></div>
  );
}

export default TrellisDiagram;




// for (let i = 0; i < numBranches; i++) {
//   // const target = target_setter(i, numNodes);  // Random target node for simplicity
//   const outputBits = output_setter();  // Random n-bit output
//   const pathcolor = color_setter();  // Random color
//   links.push({
//     source: node.id,
//     target: node.target,
//     // label: `(${outputBits})`,
//     label: `${outputBits}`,
//     color: pathcolor // Cycle through colors
//   });
// }