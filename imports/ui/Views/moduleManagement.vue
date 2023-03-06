<template>
    <div>
        <v-card v-for="module in modules">
            <v-card-title>{{ module.name }}</v-card-title>      
            <v-btn v-if="checkIfSubscribed(module)" @click="manageSubscription(module)"> Unsubscribe</v-btn>
            <v-btn v-else @click="manageSubscription(module)"> Subscribe</v-btn>

        </v-card>
    </div>
</template>

<script>
import Modules from '../../api/collections/Modules';
import SubscribedModules from '../../api/collections/SubscribedModules';
export default {
  name: "moduleManagement",
  data: () => ({
    modules: [],
    subscribedModules: [],
  }),
  methods: {
    manageSubscription(module) {
        if(!this.checkIfSubscribed(module)){
             Meteor.call("module.subscribe", module);
        } else {
            Meteor.call("module.unsubscribe", module);

        }
     
    },
    checkIfSubscribed(module) {
        const isSubscribed = this.subscribedModules.some(obj => {
            return obj._id === module._id;
        });
        console.log(isSubscribed)
       return isSubscribed;
    }
  },
  created() {
  Tracker.autorun(() => {
    const moduleSubscription = Meteor.subscribe('modules');
    const subscribedModulesSubscription = Meteor.subscribe('subscribedModules')
    if(moduleSubscription.ready()){
      this.modules = Modules.find().fetch();
    }
    if(subscribedModulesSubscription.ready()){
        this.subscribedModules = SubscribedModules.find().fetch()
    }
  });
},
};
</script>
