const pokemonContainer = document.getElementById("pokemon-container");
const searchButton = document.getElementById("search-button");

const getPokemon = async () => {
  const pokemonNumber = document.getElementById("pokemon-number").value;
  if (!pokemonNumber) {
    renderError("por favor ingrese un numero valido");
    return;
  }
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.name) {
    renderPokemonCard(data);
  } else {
    renderError("No se encontró ningún Pokémon con ese número.");
  }
};

const renderPokemonCard = (pokemonData) => {
  const { name, types, height, weight, sprites } = pokemonData;
  const typeNames = types.map((type) => type.type.name).join(", ");
  const heightInMeters = height / 10;
  const weightInKg = weight / 10;

  const cardHTML = `
        <div class="pokemon-card">
            <h2>${name}</h2>
            <p><strong>Tipo:</strong> ${typeNames}</p>
            <p><strong>Altura:</strong> ${heightInMeters} m</p>
            <p><strong>Peso:</strong> ${weightInKg} kg</p>
            <img src="${sprites.front_default}" class="img-fluid" alt="${name}">
        </div>
    `;

  pokemonContainer.innerHTML = cardHTML;
};

const renderError = (error) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
  pokemonContainer.innerHTML = errorHTML;
};

init = () => {
  searchButton.addEventListener("click", getPokemon);
};

init();
