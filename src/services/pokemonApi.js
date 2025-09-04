import axios from "axios";
import { API_CONFIG, ERROR_MESSAGES } from "../utils/constants.js";

class PokemonApiService {
  async fetchRandomPokemon(typeFilter = null) {
    if (typeFilter) {
      return this.fetchPokemonByType(typeFilter);
    }

    const randomId = this.generateRandomPokemonId();
    const response = await axios.get(
      `${API_CONFIG.BASE_URL}/pokemon/${randomId}`
    );
    return this.transformPokemonData(response.data);
  }

  async fetchPokemonByType(type) {
    try {
      const typeResponse = await axios.get(
        `${API_CONFIG.BASE_URL}/type/${type.toLowerCase()}`
      );

      const pokemonList = typeResponse.data.pokemon;

      if (!pokemonList || pokemonList.length === 0) {
        throw new Error(`Nenhum Pokémon encontrado do tipo ${type}`);
      }

      const randomPokemon = this.selectRandomPokemonFromList(pokemonList);
      const pokemonResponse = await axios.get(randomPokemon.pokemon.url);

      return this.transformPokemonData(pokemonResponse.data);
    } catch (error) {
      console.error("Error fetching Pokemon by type:", error);

      if (error.response?.status === 404) {
        throw new Error(`Tipo "${type}" não encontrado`);
      }

      throw new Error(
        error.message || `Erro ao carregar Pokémon do tipo ${type}`
      );
    }
  }

  selectRandomPokemonFromList(pokemonList) {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    return pokemonList[randomIndex];
  }

  generateRandomPokemonId() {
    return Math.floor(Math.random() * API_CONFIG.POKEMON_COUNT) + 1;
  }

  transformPokemonData(rawData) {
    return {
      id: rawData.id,
      name: this.capitalizeName(rawData.name),
      hp: this.extractHpStat(rawData.stats),
      types: this.extractTypes(rawData.types),
      image: this.getBestImage(rawData.sprites),
      weight: rawData.weight || 0,
      height: rawData.height || 0,
      abilities: this.extractAbilities(rawData.abilities),
    };
  }

  capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  extractHpStat(stats) {
    const hpStat = stats.find((stat) => stat.stat.name === "hp");
    return hpStat ? hpStat.base_stat : 0;
  }

  extractTypes(types) {
    return types.map((typeObj) => typeObj.type.name);
  }

  extractAbilities(abilities) {
    return abilities.map((abilityObj) => abilityObj.ability.name).slice(0, 3);
  }

  getBestImage(sprites) {
    return (
      sprites.other?.["official-artwork"]?.front_default ||
      sprites.front_default ||
      API_CONFIG.DEFAULT_IMAGE
    );
  }

  isValidPokemonType(type) {
    const validTypes = [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ];

    return validTypes.includes(type.toLowerCase());
  }
}

export const pokemonApiService = new PokemonApiService();
