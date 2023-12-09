const tests = [
  [2, 1, 3, 5, 3, 2],
  [1, 2, 3, 4],
  [5, 1, 5, 1],
  [2, 4, 3, 5, 1],
  [1, 3, 4, 5, 0, 1, 3, 0, 7],
  [],
  [10, 20, 30],
  [5, 1, 2, 3, 2, 5, 1],
  [1, 10, 2, 10, 20, 50, 7, 0, 0, 7],
];

function findFirstRepeated(gifts: Array<number>) {
  // get all repeated digits in order of appearance
  const duplicates = gifts.filter(
    (item, index) => gifts.indexOf(item) !== index
  );
  // return first element if there is otherwise default value
  return duplicates.length ? duplicates[0] : -1;
}

for (var i = 0; i < tests.length; i++) {
  console.log(`Test # `, i + 1, `: `, findFirstRepeated(tests[i]));
}

export {};
