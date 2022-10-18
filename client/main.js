import Vue from 'vue'
import {vuetify,router} from '../imports/ui/plugins'
import '../imports/ui/plugins/meteor-tracker'
import '../imports/ui/styles/main.scss'
import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  let app = new Vue({
   vuetify,
   router,
   el: '#app',
   ...App,
 });
 export default app;
});

