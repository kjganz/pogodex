<template>
    <div class="pokemon-card">
        <h2 class="pokemon-name">{{pokemon.name}}</h2>
        <img class="pokemon-image" :src="require(`@/assets/image/pokemon/${pokemon.image}`)">
        <div class="status-container">
            <!-- Male -->
            <label class="status-label" v-if="pokemon.male">
                <input class="status-checkbox" type="checkbox" name="male" :checked="state.male" @change="stateChange">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-male.svg" alt="male gender symbol" />
            </label>
            <div v-if="!pokemon.male && pokemon.female"></div>
            <!-- Female -->
            <label class="status-label" v-if="pokemon.female">
                <input class="status-checkbox" type="checkbox" name="female" :checked="state.female" @change="stateChange">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-female.svg" alt="female gender symbol" />
            </label>
            <div v-if="pokemon.male && !pokemon.female"></div>
            <!-- Genderless -->
            <label class="status-label" v-if="!pokemon.male && !pokemon.female">
                <input class="status-checkbox" type="checkbox" name="male" :checked="state.male" @change="stateChange">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-genders.svg" alt="genders symbol" />
            </label>
            <div v-if="!pokemon.male && !pokemon.female"></div>
            <!-- Shiny  -->
            <label v-if="pokemon.shiny" class="status-label">
                <input class="status-checkbox" type="checkbox" name="shiny" :checked="state.shiny" @change="stateChange">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-shining.svg" alt="shiny symbol" />
            </label>
            <div v-else></div>
            <!-- Lucky -->
            <label v-if="pokemon.lucky" class="status-label">
                <input class="status-checkbox" type="checkbox" name="lucky" :checked="state.lucky" @change="stateChange">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-dice.svg" alt="lucky symbol" />
            </label>
            <div v-else></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokemonCard',
    props: {
        pokemon: {
            required: true,
            type: Object
        },
        state: {
            type: Object,
            required: true
        }
    },
    methods: {
        stateChange(e) {
            const attr = e.target.getAttribute('name');
            const status = e.target.checked; 
            
            this.$emit('state-update', {
                id: this.pokemon.id,
                state: { ...this.state, [attr]: status }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.pokemon-card {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(255,205,65, 0.5));
    border-radius: 5px;
}

.pokemon-name {
    margin: 10px 0;
    font-size:  1.5rem;
    font-weight: bold;
    user-select: none;
}

.pokemon-image {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    user-select: none;
}

.status-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background-color: var(--light-gray);
    border-radius: 5px;
    overflow: hidden;
}

.status-checkbox {
    display: none;
}

.status-label {
    position:  relative;
    padding-top: 100%;
    width:  100%;
    height: 0;
}

.status-icon {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
    width: 100%;
    height: 100%;
    fill: var(--dark-gray);
    box-sizing: border-box;
    transition: all 0.25s ease-in-out;

    &:hover, &:focus {
        background-color: var(--light-purple);
    }
}

:checked + .status-icon {
    fill: var(--light-yellow);
    background-color: var(--purple);
}
</style>
