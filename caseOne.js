const createMatrix = (count) => {
  let matrix = "";
  for (let i = 1; i <= count; i++) {
    for (let j = 1; j <= count; j++) {
      if (i === j) matrix += `${i} |`;
      else matrix += "_,_ |";
      if (j === count) matrix += "\n";
    }
  }

  return matrix;
};

console.log(createMatrix(4));
