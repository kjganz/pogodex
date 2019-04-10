<template>
    <div id="app">
        <div id="nav">
            <amplify-authenticator v-if="!isAuthenticated"></amplify-authenticator>
            <amplify-sign-out v-else></amplify-sign-out>
            <router-link :to="{name:'pogodex'}">Dex</router-link>
        </div>
        <router-view v-if="isAuthenticated"></router-view>
        <div>
            Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
    </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus, components } from 'aws-amplify-vue';

export default {
    name: 'app',
    components: {
        ...components
    },
    async created() {
        AmplifyEventBus.$on('authState', info => {
            this.isAuthenticated = info === "signedIn";
        });
        this.isAuthenticated = !!(await Auth.currentAuthenticatedUser());
    },
    data() {
        return {
            isAuthenticated: false
        }
    },
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
          color: #42b983;
        }
    }
}
</style>
