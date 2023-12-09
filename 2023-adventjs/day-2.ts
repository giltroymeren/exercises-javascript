type Day2Type = {
  gifts: Array<string>;
  materials: string;
};

const tests: Array<Day2Type> = [
  {
    gifts: ["tren", "oso", "pelota"],
    materials: "tronesa",
  },
  {
    gifts: ["juego", "puzzle"],
    materials: "jlepuz",
  },
  {
    gifts: ["libro", "ps5"],
    materials: "psli",
  },
  {
    gifts: ["coche", "muñeca", "balon"],
    materials: "ocmuñalb",
  },
  {
    gifts: ["patineta", "robot", "libro"],
    materials: "nopor",
  },
  {
    gifts: [],
    materials: "letras",
  },
];

function manufacture(gifts: Array<string>, materials: string) {
  // iterate over each gift
  // split strings into character arrays
  const materialsArr = materials.split("").sort();

  const results: Array<string> = [];
  for (let i = 0; i < gifts.length; i++) {
    // check if all characters of gift exist in the material
    const gift = gifts[i].split("").sort();
    // add to result if passes
    if (gift.every((letter) => materialsArr.includes(letter))) {
      results.push(gifts[i]);
    }
  }

  return results;
}

for (var i = 0; i < tests.length; i++) {
  console.log(manufacture(tests[i].gifts, tests[i].materials));
}

export {};
