import Vue from 'vue'
import {vuetify} from '../imports/ui/plugins'
import '../imports/ui/plugins/meteor-tracker'
import '../imports/ui/styles/main.scss'
import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  let app = new Vue({
   vuetify,
   el: '#app',
   ...App,
 });
 export default app;
});

