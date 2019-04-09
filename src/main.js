import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import './assets/css/base.css'
import './assets/css/reset.css'

Vue.config.productionTip = false

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsConfig from './aws-config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "pokedex",
        endpoint: awsConfig.apiGateway.URL,
        region: awsConfig.apiGateway.REGION
      },
    ]
  }
});
Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
