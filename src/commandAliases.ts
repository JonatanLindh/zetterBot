const aliases: { [command: string]: string[] } = {
  request: ["req", "r"],
  archive: ["a"],
};

const remappedAliases: { [alias: string]: string } = {};

for (let key in aliases) {
  let value = aliases[key];
  value.forEach((alias: string) => {
    remappedAliases[alias] = key;
  });
}

export default remappedAliases;
