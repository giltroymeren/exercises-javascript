type Day3Type = {
  original: string;
  modified: string;
};

const tests: Array<Day3Type> = [
  {
    original: "abcd",
    modified: "abcde",
  },
  {
    original: "stepfor",
    modified: "stepor",
  },
  {
    original: "abcde",
    modified: "abcde",
  },
  {
    original: "abcde",
    modified: "abcd",
  },
  {
    original: "xxxx",
    modified: "xxoxx",
  },
  {
    original: "iiiii",
    modified: "iiiii",
  },
];

function findNaughtyStep(original: string, modified: string) {
  /**
   * split both strings into characters
   *    sort alphabetically
   *    using array with more characters as base; otherwise keep original
   *    compare each character if exists in the same index as the other
   *    take note of characters that do not match criteria
   * return first character matched; otherwise empty string
   */
  const originalArr = original.split("");
  const modifiedArr = modified.split("");

  return originalArr.length > modifiedArr.length
    ? originalArr.filter((char, index) => modifiedArr[index] !== char)[0]
    : modifiedArr.filter((char, index) => originalArr[index] !== char)[0] || "";
}

for (let i = 0; i < tests.length; i++) {
  console.log(
    `Test # ${i + 1}: `,
    findNaughtyStep(tests[i].original, tests[i].modified)
  );
}

export {};
