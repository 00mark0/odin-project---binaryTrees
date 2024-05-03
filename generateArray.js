// generate an array of random numbers < 100
const generateArray = (size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

module.exports = generateArray;
