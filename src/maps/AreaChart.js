import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const AreaChartWithDivisions = ({ data }) => {
  const chartRef = useRef();

  //   const data = [
  //     0, 0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21,
  //     22, 27, 28, 30, 31, 32, 33, 35, 37, 39, 40, 41, 42, 44, 45, 46, 48, 49, 50,
  //     52, 53, 54, 55, 59, 60, 60, 60, 57, 56, 55, 54, 53, 52, 51, 50, 43, 42, 41,
  //     40, 39, 38, 37, 36, 35, 34, 33, 30, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
  //     20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 5, 5, 4, 4, 3, 3, 1, 0, 0, 0,
  //   ];

  //   const [points, setPoints] = useState([
  //     { x: 5, y: 13 },
  //     { x: 10, y: 13 },
  //     { x: 20, y: 14 },
  //     { x: 30, y: 13 },
  //     { x: 40, y: 24 },
  //     { x: 50, y: 13 },
  //     { x: 52, y: 13 },
  //     { x: 60, y: 0 },
  //   ]);

  const points = data.map((e, i) => {
    return { x: i, y: e };
  });

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const border = { left: 20 };

    const svg = d3
      .select(chartRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("border", "1px solid lightgrey");

    svg.selectAll("*").remove();
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, points.length]).range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(points, (d) => d.y)])
      .range([height, 0]);

    const makeXGridLines = () => d3.axisBottom(x).ticks(11);
    const makeYGridLines = () => d3.axisLeft(y).ticks(11);

    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(makeXGridLines().tickSize(-height).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "lightgrey")
      .attr("stroke-dasharray", "2,2");

    g.append("g")
      .attr("class", "grid")
      .call(makeYGridLines().tickSize(-width).tickFormat(""))
      .selectAll("line")
      .attr("stroke", "lightgrey")
      .attr("stroke-dasharray", "2,2");

    // const xAxis = g
    //   .append("g")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(x));

    const yAxis = g
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll(".tick line")
      .remove();

    // xAxis.selectAll(".domain").attr("stroke", "lightgrey");

    yAxis.selectAll("path").attr("stroke", "lightgrey");
    yAxis.selectAll(".domain").attr("stroke", "lightgrey");

    svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%") // 180deg means top to bottom in linear gradient
      .selectAll("stop")
      .data([
        { offset: "6%", color: "#B8B2FF", opacity: 0.5 },
        { offset: "100%", color: "#EAE8FF", opacity: 0.5 },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color)
      .attr("stop-opacity", (d) => d.opacity);

    const area = d3
      .area()
      .x((d) => x(d.x))
      .y0(height)
      .y1((d) => y(d.y))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(points)
      .attr("fill", "url(#gradient)")
      .attr("d", area);
    // g.selectAll("circle")
    //   .data(points)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", (d) => x(d.x))
    //   .attr("cy", (d) => y(d.y))
    //   .attr("r", 2)
    //   .attr("fill", "pink")
    //   .attr("stroke", "none");

    const lineX = (30 / 100) * width;
    const lineY = y(30);

    const lineX1 = (70 / 100) * width;

    const lineY1 = y(28);

    const yourX = (50 / 100) * width;
    const yourY = y(45);

    g.append("line")
      .attr("x1", lineX)
      .attr("y1", y(0))
      .attr("x2", lineX)
      .attr("y2", lineY)
      .attr("stroke", "#242424");
    g.append("circle")
      .attr("cx", lineX)
      .attr("cy", lineY)
      .attr("r", 2)
      .attr("fill", "#242424")
      .attr("stroke", "none");

    g.append("text")
      .attr("x", lineX)
      .attr("y", lineY - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#242424")
      .text("30%")
      .style("font-size", "14px")
      .style("font-weight", "bold");

    g.append("line")
      .attr("x1", lineX1)
      .attr("y1", y(0))
      .attr("x2", lineX1)
      .attr("y2", lineY1)
      .attr("stroke", "#242424");

    g.append("circle")
      .attr("cx", lineX1)
      .attr("cy", lineY1)
      .attr("r", 2)
      .attr("fill", "#242424")
      .attr("stroke", "none");

    g.append("text")
      .attr("x", lineX1)
      .attr("y", lineY1 - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#242424")
      .text(`28%`)
      .style("font-size", "14px")
      .style("font-weight", "bold");

    const text = "You are here";
    const padding = 10;
    const fontSize = 12;

    g.append("circle")
      .attr("cx", yourX)
      .attr("cy", yourY)
      .attr("r", 4)
      .attr("fill", "#242424");
    g.append("circle")
      .attr("cx", yourX)
      .attr("cy", yourY)
      .attr("r", 8)
      .attr("fill", "#24242470");

    const textGroup = g
      .append("g")
      .attr("transform", `translate(${yourX}, ${yourY - 18})`);

    const textElement = textGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", fontSize)
      .attr("fill", "white")
      .text(text);

    const textWidth = textElement.node().getBBox().width;

    textGroup
      .insert("rect", "text")
      .attr("x", -textWidth / 2 - padding / 2)
      .attr("y", -fontSize + 2 - padding / 2)
      .attr("width", textWidth + padding)
      .attr("height", fontSize + padding)
      .attr("fill", "#24242470")
      .attr("rx", 5);
  }, []);

  useEffect(() => {
    document.title = "heloo";
  }, []);

  return (
    <div>
      <svg ref={chartRef}></svg>;
    </div>
  );
};

export default AreaChartWithDivisions;
