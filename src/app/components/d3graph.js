import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import logicfxn from './logicfxn';

import color_setter from '../helper/colorsetter';


function Graph({ K, k, n, parsedLogic }) {

  //initializes svg
  const d3Container = useRef(null);


  useEffect(() => {
    if (d3Container.current) {


      // Clear the existing SVG to prevent duplication
      d3.select(d3Container.current).selectAll("*").remove();



      const numNodes = Math.pow(2, k * (K - 1));


      const width = 800 + 50 * numNodes;
      const height = 400 + 40 * numNodes;

      // console.log(K, k, n, parsedLogic);

      // Get the nodes and links from the logic function
      const nodes = logicfxn(K, k, n, parsedLogic); 

      

      // // console.log(nodes);


      const links = [];

      // Create links from the nodes for each branch for d3
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

      // console.log(links);





      // Create SVG element
      const svg = d3.select(d3Container.current).append('svg')
        .attr('width', width)
        .attr('height', height);



      // Create arrow markers for the links 
      svg.append('defs').selectAll('marker')
        .data(links)
        .enter().append('marker')
        .attr('id', d => `arrow-${d.source}-${d.target}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 30) 
        .attr('refY', -1.5)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', d=> {
          if(d.source === d.target) return '';
          else return 'M0,-5L10,0L0,5'})
        .attr('fill', d => d.color);


        // [help taken from https://observablehq.com/@harrylove/draw-an-arrowhead-marker-connected-to-a-line-in-d3]

  


      // Add links (paths)
      const link = svg.append('g')
        .selectAll('.link')
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr('stroke-width', 2)
        .attr('stroke', d => d.color)
        .attr('fill', 'none')
        .attr('marker-end', d => `url(#arrow-${d.source}-${d.target})`);



      // Add link labels whihc are the ouput
        var text = svg.selectAll(".link-text")
          .data(links)
          .enter().append("text")
          .attr("class", "link-text")
          .text(d => d.label);



      // Add nodes whihc are states
      const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 20)
        .attr('stroke', 'black') 
        .attr('stroke-width', 2) 
        .attr('fill', 'yellow')


      // Add labels for nodes whihc are states value
      const nodeLabels = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')

        .attr('text-anchor', 'middle') 
        .text(d => {
          // console.log(d);
          return d.label

        });

      



      // Force simulation for positioning
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-3000))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', () => {
          link.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('d', d => {
              

                // console.log(d.source, d.target);

                const node = d.source;

                // const node = nodes.find(n => n.id == d.source);

                  

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
                if(x1==x2 && y1==y2){
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
            
            
      node.attr('cx', d => d.x)
        .attr('cy', d => d.y);
      nodeLabels.attr('x', d => d.x + 5)
        .attr('y', d => d.y);
      text
        .attr('x', d =>{
          if(d.source === d.target) return d.source.x + 20;
        
          else return d.source.x + 0.75 * (d.target.x - d.source.x)
        })
        .attr('y', d =>{
          if(d.source === d.target) return d.source.y - 50;
        
          else return d.source.y + 0.75 * (d.target.y - d.source.y) - 1
        })
        .attr('fill', d => d.color);
    });


    //help taken from https://jsfiddle.net/LUrKR/



  const drag = d3.drag()
    .on('start', (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();  
      d.fx = d.x;  
      d.fy = d.y; 
    })
    .on('drag', (event, d) => {
      d.fx= event.x;
      d.fy =event.y;
    })
    .on('end', (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx=null;  
      d.fy= null;
    });


    // Apply drag behavior to nodes for easire visibility 
    node.call(drag);  

}


  }, [K, k, n,parsedLogic]); 

return (
  <div ref={d3Container}></div>
);
}

export default Graph;




