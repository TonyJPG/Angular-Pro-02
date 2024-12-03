const TOTAL_POKEMON = 151;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require("fs");

  const generateIds = (length) => Array.from({ length }, (_, i) => i + 1);

  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${TOTAL_POKEMON}`)
    .then((resp) => resp.json());

  const pokemonIds = generateIds(TOTAL_POKEMON);
  const pageIds = generateIds(TOTAL_PAGES);

  let fileContent = pokemonIds.map((id) => `/pokemon/${id}`).join("\n");
  fileContent += "\n";
  fileContent += pageIds.map((id) => `/pokemon/page/${id}`).join("\n");
  fileContent += "\n";
  fileContent += pokemonNameList.results.map((pokemon) => `/pokemon/${pokemon.name}`).join("\n");

  fs.writeFileSync("routes.txt", fileContent);
})();
