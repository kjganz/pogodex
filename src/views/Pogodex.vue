<template>
    <div class="pokedex">
        <pokemon-card v-for="data in pokeData" :key="data.name" :pokemon="data"></pokemon-card>
    </div>
</template>

<script>
// @ is an alias to /src
import PokemonCard from '@/components/PokemonCard.vue';
import pogoData from '@/def/pogodata.json';
import pokemonData from '@/def/pokemon.json';

export default {
    name: 'pogodex',
    components: {
        PokemonCard
    },
    data() {
        return {
            pokemonData,
            defaultPokemonState: {
                male: false,
                female: false,
                shiny: false,
                lucky: false
            }
        }
    },
    computed: {
        pokeData() {
            let data = pogoData
                .filter(pokemon => pokemon.available)
                .map(pokemon => {
                    pokemon.state = this.pokemonData[pokemon.id] || this.defaultPokemonState;
                    return pokemon
                });
            return data;
        }
    }
}
</script>

<style scoped lang="scss">
.pokedex {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 4rem 2rem;

    padding: 2rem;
    min-width: 0;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 450px) {
        grid-template-columns: repeat(1, 1fr);
    }
}

.pokemon-card {
    min-width: 0;
}
</style>
