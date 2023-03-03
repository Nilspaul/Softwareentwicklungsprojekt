<template>
  <!-- <v-app-bar
   :class="[
      { 'mobileTopbar pt-5 pr-10': $vuetify.breakpoint.mobile },
      { 'topBar pt-5 pr-10': !$vuetify.breakpoint.mobile },
    ]"
    color="primary"
    dark
  > -->
  <v-app-bar
    color="primary"
    dark
  > 
    <VIcon class="display-1 pr-5" @click="drawNav()">mdi-menu</VIcon>
    <v-toolbar-title class="display-1 font-weight-bold" v-show="$vuetify.breakpoint.mdAndUp">
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
      cache-items>
      <template #item="{ item }">
        <v-list-item class="d-flex">
            <div class="ml-2" @click="pickContent(item)">{{ item }}</div>
        </v-list-item>
    </template>
    </v-autocomplete>
    <AccountViewDrawer :user="user" />
  </v-app-bar>
</template>

<script>
import AccountViewDrawer from "./accountView/accountViewDrawer.vue";
import Modules from "../../../api/collections/Modules";

export default {
  name: "topBar",
  components: {
    AccountViewDrawer,
  },
  props: {
    user: Object,
  },
  data: () => ({
    group: null,
    content: [],
    currentModule: null,
    loading: false,
    items: [],
    search: null,
    select: null,
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
    pickContent(item){
        let content = item.split('/',2);
        this.$emit("setContent", content);
    }
  },
  created() {
    Tracker.autorun(() => {
      this.modules = Modules.find().fetch();
      this.currentModule = this.modules[0];
      this.modules.forEach((module) => {
        this.content.push(module.name);
        for(let inhalt in module.inhalte){
            this.content.push(inhalt + '/'+module.name)
        }
      });
    });
  },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>
