import Vue from 'vue'
import {vuetify,router} from '../imports/ui/plugins'
import '../imports/ui/plugins/meteor-tracker'
import '../imports/ui/styles/main.scss'
import App from '../imports/ui/App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)
Meteor.startup(() => {
  let app = new Vue({
   vuetify,
   router,
   el: '#app',
   ...App,
 });
 export default app;
});
