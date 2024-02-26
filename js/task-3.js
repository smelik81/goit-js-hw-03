function filterArray(numbers, value) {
  let res = [];
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] > value) {
      res.push(numbers[i]);
    }
  }
  return res;
}
console.log(filterArray([1, 2, 3, 4, 5], 3)); // [4, 5]
console.log(filterArray([1, 2, 3, 4, 5], 4)); // [5]
console.log(filterArray([1, 2, 3, 4, 5], 5)); // []
console.log(filterArray([12, 24, 8, 41, 76], 38)); // [41, 76]
console.log(filterArray([12, 24, 8, 41, 76], 20)); // [24, 41, 76]


// Example -2
function filterArray1(numbers, value) {
  let arrSum = [];
  for (const item of numbers) {
    if (item > value) {
      arrSum.push(item);
    }
  }
  return arrSum;
};

console.log(filterArray1([1, 2, 3, 4, 5], 3)); // [4, 5]
console.log(filterArray1([1, 2, 3, 4, 5], 4)); // [5]
console.log(filterArray1([1, 2, 3, 4, 5], 5)); // []
console.log(filterArray1([12, 24, 8, 41, 76], 38)); // [41, 76]
console.log(filterArray1([12, 24, 8, 41, 76], 20)); // [24, 41, 76]