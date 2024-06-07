let s =
  "M152.282,126.116L152.361,126.764L153.555,127.824L153.263,129.089L153.661,129.618L152.653,129.971L152.096,130.587L151.566,129.736L150.743,129.354L149.497,129.442L149.073,128.883L150.107,127.913L150.08,126.588L150.876,126.411L151.035,126.057Z";



export const movepoint_to_origin = (s) => {
  const commands = s.split(/[ML]/).filter(Boolean);
  const firstCommand = commands[0].split(",").map(parseFloat);

  const subtractedCommands = commands.map((command, index) => {
    const [x, y] = command.split(",").map(parseFloat);
    const [x0, y0] = firstCommand;
    return `${x - x0},${y - y0}`;
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

console.log(movepoint_to_origin(s));
// console.log("\n\n");
// console.log(movepoint_to_origin(s2));

const get_min = (s) => {
  const commands = s.split(/[ML]/).filter(Boolean);
  let minX = Infinity;
  let minY = Infinity;
  commands.forEach((coord) => {
    const [x, y] = coord.split(",").map(parseFloat);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
  });
  console.log(commands, minX, minY);
};

// get_min(s);
