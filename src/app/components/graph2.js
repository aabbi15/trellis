import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import logicfxn from './outputlogic';

function Graph2({ K, k, n, parsedLogic }) {
  const d3Container = useRef(null);

  function color_setter(branch) {
    return branch.input === 0 ? 'red' : 'blue';
  }

  useEffect(() => {
    if (d3Container.current) {
      d3.select(d3Container.current).selectAll("*").remove();
  
      const numNodes = Math.pow(2, k*(K-1));
      const width = 125 * numNodes;
      const height = 100 * numNodes;
  
      const nodes = logicfxn(K, k, n, parsedLogic);
  
      const links = nodes.flatMap(node => node.target.map(branch => ({
        source: node.id,
        target: branch.target,
        label: branch.output,
        color: color_setter(branch)
      })));
  
      const svg = d3.select(d3Container.current).append('svg')
        .attr('width', width)
        .attr('height', height);
  
      // Create arrow markers for the links
      svg.append('defs').selectAll('marker')
        .data(links)
        .enter().append('marker')
        .attr('id', d => `arrow-${d.source}-${d.target}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', d => d.color);
  
      // Add paths for links
      const link = svg.append('g')
        .selectAll('path')
        .data(links)
        .join('path')
        .attr('stroke', d => d.color)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('marker-end', d => `url(#arrow-${d.source}-${d.target})`)
        .attr('d', function(d) {
          const x1 = nodes[d.source].x, y1 = nodes[d.source].y;
          const x2 = nodes[d.target].x, y2 = nodes[d.target].y;
          const dx = x2 - x1, dy = y2 - y1;
          const dr = Math.sqrt(dx * dx + dy * dy);
  
          // Defaults for normal edge
          let drx = dr, dry = dr, xRotation = 0, largeArc = 0, sweep = 1;
  
          // Self edge
          if (d.source === d.target) {
            xRotation = -45;
            largeArc = 1;
            sweep = 1;
            drx = 20;
            dry = 20;
            return `M${x1},${y1}A${drx},${dry} ${xRotation} ${largeArc},${sweep} ${x2+1},${y2+1}`;
          }
  
          // Normal edge
          return `M${x1},${y1}A${drx},${dry} ${xRotation} ${largeArc},${sweep} ${x2},${y2}`;
        });
  
      // Add nodes (circles)
      const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 20)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'pink');
  
      // Labels for nodes
      const nodeLabels = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y + 5)
        .attr('text-anchor', 'middle')
        .text(d => d.label);
  
      // Text labels for branches
      const text = svg.append('g')
        .selectAll('text')
        .data(links)
        .join('text')
        .text(d => d.label)
        .attr('x', d => (nodes[d.source].x + nodes[d.target].x) / 2)
        .attr('y', d => (nodes[d.source].y + nodes[d.target].y) / 2 - 10)
        .attr('fill', d => d.color);
    }
  }, [K, k, n]);  // Redraw graph when K, k, or n changes
  
  return <div ref={d3Container}></div>;
  }
  
  
  export default Graph2;
  
