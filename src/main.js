import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from "axios"

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './registerServiceWorker'


//axios.defaults.headers.common['Authorization'] = "Bearer " + store.state.currentUser.token;




/*store.dispatch('currentUser/getToken').then(resp=>{
  axios.interceptors.request.use(function(config){
      const token = store.state.currentUser.token
      if (token!=null) {
        config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  });
})*/

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

router.isReady().then(() => {
  app.mount('#app');
});