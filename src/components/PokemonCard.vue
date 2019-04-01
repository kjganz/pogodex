<template>
    <div class="pokemon-card">
        <h2 class="pokemon-name">{{pokemon.name}}</h2>
        <img class="pokemon-image" :src="require(`@/assets/image/pokemon/${pokemon.image}`)">
        <div class="status-container">
            <!-- Male -->
            <label class="status-label" v-if="pokemon.male">
                <input class="status-checkbox status-male" type="checkbox" name="gender-male" :checked="pokemon.state.male">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-male.svg" alt="male gender symbol" />
            </label>
            <div v-if="!pokemon.male && pokemon.female"></div>
            <!-- Female -->
            <label class="status-label" v-if="pokemon.female">
                <input class="status-checkbox status-female" type="checkbox" name="gender-female" :checked="pokemon.state.female">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-female.svg" alt="female gender symbol" />
            </label>
            <div v-if="pokemon.male && !pokemon.female"></div>
            <!-- Genderless -->
            <label class="status-label" v-if="!pokemon.male && !pokemon.female">
                <input class="status-checkbox status-genders" type="checkbox" name="genders" :checked="pokemon.state.male">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-genders.svg" alt="genders symbol" />
            </label>
            <div v-if="!pokemon.male && !pokemon.female"></div>
            <!-- Shiny  -->
            <label class="status-label">
                <input class="status-checkbox status-shiny" type="checkbox" name="shiny" :checked="pokemon.state.shiny">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-shining.svg" alt="shiny symbol" />
            </label>
            <!-- Lucky -->
            <label class="status-label">
                <input class="status-checkbox status-lucky" type="checkbox" name="lucky" :checked="pokemon.state.lucky">
                <img svg-inline svg-sprite class="status-icon" src="@/assets/image/icon-dice.svg" alt="lucky symbol" />
            </label>
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
        }
    },
    mounted() {
        console.log(this.pokemon);
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
    /* fill: var(--blue); */
    fill: var(--light-yellow);
    background-color: var(--purple);
}
</style>
