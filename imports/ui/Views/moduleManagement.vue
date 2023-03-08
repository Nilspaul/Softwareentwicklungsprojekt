<template>
  <div class="d-flex flex-wrap ma-10">
    <v-card
      v-for="(module, index) in modules"
      height="15em"
      width="30em"
      class="mr-4 mb-4"
    >
      <v-img
        @click="changeOverlayVal(index)"
        :src="module.imageUrl"
        height="100%"
        width="100%"
        :lazy-src="module.imageUrl"
      >
      <v-icon color="primary" class="ma-3" style="transform: scale(2);" v-if="checkIfSubscribed(module)">mdi-check-circle-outline</v-icon>
        <div v-if="!overlay[index]" class="white--text text-h5 modulebar">
          <div>{{ module.name }}</div>
        </div>
      </v-img>
      <v-overlay
        absolute
        :value="overlay[index]"
        @click="changeOverlayVal(index)"
      >
        <v-btn
        color="secondary" 
        class="text-h6"
          v-if="checkIfSubscribed(module)"
          @click="manageSubscription(module)"
        >
          UNSUBSCRIBE
        </v-btn>
        <v-btn v-else color="secondary" class="text-h6" @click="manageSubscription(module)"> SUBSCRIBE</v-btn>
      </v-overlay>
    </v-card>
  </div>
</template>

<script>
import Modules from "../../api/collections/Modules";
import SubscribedModules from "../../api/collections/SubscribedModules";
export default {
  name: "moduleManagement",
  data: () => ({
    modules: [],
    subscribedModules: [],
    absolute: true,
    overlay: [],
  }),
  methods: {
    manageSubscription(module) {
      if (!this.checkIfSubscribed(module)) {
        Meteor.call("module.subscribe", module);
      } else {
        Meteor.call("module.unsubscribe", module);
      }
    },
    checkIfSubscribed(module) {
      const isSubscribed = this.subscribedModules.some((obj) => {
        return obj._id === module._id;
      });
      return isSubscribed;
    },
    changeOverlayVal(index) {
      this.$set(this.overlay, index, !this.overlay[index]);
    },
  },
  created() {
    Tracker.autorun(() => {
      const moduleSubscription = Meteor.subscribe("modules");
      const subscribedModulesSubscription =
        Meteor.subscribe("subscribedModules");
      if (moduleSubscription.ready()) {
        this.modules = Modules.find().fetch();
      }
      if (subscribedModulesSubscription.ready()) {
        this.subscribedModules = SubscribedModules.find().fetch();
        this.overlay = Array(this.modules.length).fill(false);
      }
    });
  },
};
</script>
<style scoped>
.modulebar {
  background-color: rgba(128, 128, 128, 0.5);
  position: absolute;
  bottom: 0;
  width: 20em;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-overlay .v-btn:hover{
  background-color: #80ba24 !important;
}
</style>
