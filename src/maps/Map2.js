import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { india_state_paths } from "./paths";

export default function Map2() {
  const ref = useRef();
  const region = useRef();

  const [dimenstion, setDimensions] = useState({ left: 0, top: 0 });

  const [hoverelement, setHoverElement] = useState("");

  const regions = [
    {
      states: [
        {
          state: "Tamil Nadu",
          value: 0.9714024172670754,
        },
        {
          state: "Andhra Pradesh",
          value: 69.9525402801807,
        },
        {
          state: "Telangana",
          value: 20.50489806984579,
        },
        {
          state: "Kerala",
          value: 26.401481264512917,
        },
        {
          state: "Karnataka",
          value: 80.86700108481897,
        },
      ],
      value: 100,
      region_name: "South Zome",
      fill_color: "#3EBF6D",
    },
    {
      states: [
        {
          state: "West Bengal",
          value: 62.37812131346389,
        },
        {
          state: "Bihar",
          value: 87.38891552270913,
        },
        {
          state: "Jharkhand",
          value: 22.400968958301327,
        },
        {
          state: "Odisha",
          value: 76.9294993077827,
        },
      ],
      value: 90,
      region_name: "East Zone",
      fill_color: "#82D160",
    },
    {
      states: [
        {
          state: "Madhya Pradesh",
          value: 45.62336846210204,
        },
        {
          state: "Chhattisgarh",
          value: 67.6166547990131,
        },
      ],
      value: 80,
      region_name: "Central Zone",
      fill_color: "#9DDEB5",
    },
    {
      states: [
        {
          state: "Goa",
          value: 40.72466723514945,
        },
        {
          state: "Gujarat",
          value: 24.72193213501448,
        },
        {
          state: "Maharashtra",
          value: 24.288468488710024,
        },
        {
          state: "Rajasthan",
          value: 31.25588080868711,
        },
      ],
      value: 70,
      region_name: "West Zone",
      fill_color: "#B8E5A4",
    },
    {
      states: [
        {
          state: "Uttar Pradesh",
          value: 45.06317514220035,
        },
        {
          state: "Uttarakhand",
          value: 28.069155128508694,
        },
        {
          state: "Delhi",
          value: 37.65803970754009,
        },
        {
          state: "Haryana",
          value: 99.654386594483,
        },
        {
          state: "Punjab",
          value: 39.15028550020836,
        },
        {
          state: "Himachal Pradesh",
          value: 17.77732030718555,
        },
        {
          state: "Jammu & Kashmir",
          value: 59.57327863340674,
        },
      ],
      value: 60,
      region_name: "North Zone",
      fill_color: "#82D160",
    },
    {
      states: [
        {
          state: "Assam",
          value: 17.619533468680505,
        },
        {
          state: "Manipur",
          value: 49.86822354606755,
        },
        {
          state: "Meghalaya",
          value: 54.62311326544147,
        },
        {
          state: "Mizoram",
          value: 68.95549618543035,
        },
        {
          state: "Nagaland",
          value: 3.8419389410867977,
        },
        {
          state: "Sikkim",
          value: 92.00305132330078,
        },
        {
          state: "Tripura",
          value: 62.02841385243485,
        },
        {
          state: "Arunachal Pradesh",
          value: 28.30741690601757,
        },
      ],
      value: 50,
      region_name: "North East Zone",
      fill_color: "#E9F7E3",
    },
  ];

  const movepoint_to_origin = (s) => {
    const commands = s.split(/[ML]/).filter(Boolean);
    const firstCommand = commands[0].split(",").map(parseFloat);

    const subtractedCommands = commands.map((command, index) => {
      const [x, y] = command.split(",").map(parseFloat);
      const [x0, y0] = firstCommand;
      //   return `${x - x0 + 100},${y - y0 + 100}`;
      if (index === 0) {
        return `${0},${0}`;
      }
      return `${x},${y}`;
    });

    const newPathCommands = subtractedCommands.map((command, index) => {
      if (index === 0) {
        return `M${command}`;
      } else {
        return `L${command}`;
      }
    });

    const newPathString = newPathCommands.join("");

    return newPathString;
  };

  const get_min = (s) => {
    const commands = s.split(/[ML]/).filter(Boolean);
    let minX = Infinity;
    let minY = Infinity;
    let maxX = 0;
    let maxY = 0;
    commands.forEach((coord) => {
      const [x, y] = coord.split(",").map(parseFloat);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
    console.log(commands, minX, minY, maxX, maxY);
    return { minX, minY, maxX, maxY };
  };

  const getpathforregion = (region) => {
    let path = "";
    for (let i of region) {
      path += india_state_paths[i?.state]?.path;
    }
    return path;
  };

  const getregionmap = (region) => {
    let path = "";
    for (let i of region) {
      path += india_state_paths[i?.state]?.path;
      //   path += movepoint_to_origin(india_state_paths[i?.state]?.path);
    }

    console.log(path);
    return path;
  };

  useEffect(() => {
    const svg = d3.select(ref.current).classed("svg-main", true);
    svg.selectAll("*").remove();
    const group = svg
      .append("g")
      .attr("transform", `scale(${2})`)
      .classed("my-group", true);

    regions.map((region) => {
      group
        .append("path")

        .attr("d", getpathforregion(region["states"]))

        .attr("stroke", "#fff")
        .attr("fill", region?.fill_color)
        .attr("stroke-width", "0.5")
        .on("mouseover", function (event) {
          setHoverElement(region?.region_name);
          setDimensions({ left: event.x, top: event.y });

          d3.select(this).attr("fill", "orange").attr("stroke", "#fff");
        })
        .on("mouseout", function () {
          setHoverElement("");
          d3.select(this).attr("fill", region?.fill_color);
        });
    });
  }, []);

 
  const svg_width=80
  const svg_height=80



  useEffect(() => {
    const svg = d3.select(region.current);
    svg.selectAll("*").remove();
    const group = svg.append("g").classed("my-group", true);
    let path = getregionmap(regions[0]["states"]);
    path = india_state_paths["Maharashtra"].path;

    const { minX, minY, maxX, maxY } = get_min(path);
    const tranx=(svg_width-(maxX-minX))/2
    const trany=(svg_height-(maxY-minY))/2

    group
      .append("path")

      .attr("d", `${path}`)
      .attr("stroke", "#fff")
      .attr("fill", "red")
      .attr("stroke-width", "0.5")
      .attr("transform", `translate(-${minX - tranx}, -${minY - trany})`);

    
  }, []);

  return <svg style={{ width: `${svg_width}px`, height: `${svg_height}px`,border:'1px solid red' }} ref={region}></svg>;

  return (
    <div
      style={{
        width: "calc(405px * 2)",
        height: "calc(358px * 2)",
        position: "relative",
      }}
      className=""
    >
      {/* <svg ref={ref}></svg> */}

      {hoverelement !== "" && (
        <div
          style={{
            position: "absolute",
            left: `${dimenstion.left - 100}px`,
            top: `${dimenstion.top - 100}px`,
          }}
          className="hoverinfo-custom"
        >
          {hoverelement}
        </div>
      )}
    </div>
  );
}
