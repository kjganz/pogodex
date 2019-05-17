<template>
    <div class="pokedex">
        <pokemon-card
            v-for="data in pokeData"
            :key="data.id"
            :pokemon="data"
            :state="getState(data.id)"
            v-on:state-update="updateState">
        </pokemon-card>
    </div>
</template>

<script>
import debounce from 'lodash.debounce';
import PokemonCard from '@/components/PokemonCard.vue';
import pogoData from '@/def/pogodata.json';

import { API } from 'aws-amplify';

export default {
    name: 'pogodex',
    components: {
        PokemonCard
    },
    props: {
        id: {
            required: false,
            type: String
        }
    },
    async created() {
        if (this.id) {
            const pokedex = await API.get("pokedex", `/pokedex/${this.id}`);
            this.pokedexId = pokedex.pokedexId;
            this.pokemonData = pokedex.dexData;
        } else {
            const pokedexList = await API.get("pokedex", "/pokedex/list");
            if (pokedexList.length === 0) {
                const createdPokedex = await API.post("pokedex", "/pokedex");
                this.pokemonData = createdPokedex.dexData;
            } else {
                // this.$set("pokemonData", pokedexList[0].dexData);
                this.pokedexId = pokedexList[0].pokedexId,
                this.pokemonData = pokedexList[0].dexData;
            }
        }
    },
    data() {
        return {
            pokedexId: null,
            pokemonData: {},
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
                .filter(pokemon => pokemon.available);
                // .map(pokemon => {
                //     pokemon.state = this.pokemonData[pokemon.id] || this.defaultPokemonState;
                //     return pokemon
                // });
            return data;
        }
    },
    methods: {
        getState(id) {
            return this.pokemonData[id] || this.defaultPokemonState;
        },  
        async updateState(payload) {
            const id = payload.id;
            this.$set(this.pokemonData, id, {...this.pokemonData[id], ...payload.state});
            this.saveDexState();
        },
        saveDexState: debounce(async function() {
            let result = await API.put(
                "pokedex",
                `/pokedex/${this.pokedexId}`,
                { body: this.pokemonData }
            );
            if (!result.status) {
                alert("Issue saving data, please make sure you're connected to the internet.")
            }
        }, 2000)
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
