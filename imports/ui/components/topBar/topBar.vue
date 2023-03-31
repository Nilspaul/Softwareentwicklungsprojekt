<template>
  <v-app-bar color="primary" class="full-width" dark> 
    <VIcon class="display-1 pr-5" @click="drawNav()">mdi-menu</VIcon>
    <v-toolbar-title
      class="display-1 font-weight-bold"
      v-show="$vuetify.breakpoint.mdAndUp"
    >
      THMStudyPlanner
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-autocomplete
      flat
      label="Search"
      class="mr-16 mt-8"
      prepend-inner-icon="mdi-magnify"
      hide-no-data
      no-data-text
      solo-inverted
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
    >
      <template #item="{ item }">
        <v-list-item class="d-flex">
          <div class="ml-2" @click="pickContent(item)">{{ item }}</div>
        </v-list-item>
      </template>
    </v-autocomplete>
    <AccountViewDrawer />
  </v-app-bar>
</template>

<script>
import AccountViewDrawer from "./accountView/accountViewDrawer.vue";
import Modules from "../../../api/collections/Modules";
import SubscribedModules from "../../../api/collections/SubscribedModules";

export default {
  name: "topBar",
  components: {
    AccountViewDrawer,
  },

  data: () => ({
    group: null,
    content: [],
    currentModule: null,
    loading: false,
    items: [],
    modules: [],
    search: null,
    select: null,
    user: null,
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = this.content.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    drawNav() {
      this.$emit("drawNav");
    },
    pickContent(item) {
      let module = this.modules[this.modules.findIndex(x=>x.name == item)] 
      this.$store.dispatch('setMyObject', module);
      this.$router.push({
        name: "moduleContent",
        params: { module: { ...module }, moduleName: module.name },
      });
    },
  },
  created() {
    Tracker.autorun(() => {
      const moduleSubscription = Meteor.subscribe("modules");
      const subscribedModulesSubscription = Meteor.subscribe("subscribedModules");
      this.user = Meteor.user();
      if (this.user !== undefined) {
        this.$forceUpdate();
      } 
      if (moduleSubscription.ready()) {
        this.modules = Modules.find().fetch();
      }
      if (subscribedModulesSubscription.ready()) {
        this.subscribedModules = SubscribedModules.find().fetch();
      }
      this.modules.forEach((module)=>{
        this.content.push(module.name)
      })
    });
  },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>
