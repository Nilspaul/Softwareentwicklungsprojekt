<template>
  <v-navigation-drawer class="mainNav" temporary v-model="drawer">
    <div class="d-flex">
      <v-icon
        class="font-weight-bold text-h3 secondary--text"
        @click="drawer = false"
        text
        >mdi-close</v-icon
      >
      <p class="font-weight-bold text-h4 secondary--text pt-4 ml-9">Menu</p>
      <div class="justify-end thmImg pr-4 pt-3">
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Technische_Hochschule_Mittelhessen_Logo.svg"
          aspect-ratio="16/9"
          width="150"
        >
        </v-img>
      </div>
    </div>
    <v-divider></v-divider>
    <p class="listHeader secondary--text">My ToDos</p>
    <toDoBase></toDoBase>
    <!--
    <v-row align="center">
      <v-col cols="12" sm="6">
        <v-subheader :class="[{ textSizeMobile: $vuetify.breakpoint.mobile }]"
          >Filter options:</v-subheader
        >
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :class="[
            { 'display-5': $vuetify.breakpoint.sm },
            { 'display-5': !$vuetify.breakpoint.mobile },
          ]"
          v-model="e6"
          :items="filterOptions"
          label="Select"
          @input="filterModules()"
          persistent-hint
        >
        </v-select>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    -->
    <div class="d-flex secondary--text pb-3">
      <div class="listHeader">My Modules</div>
      <v-btn
        color="primary"
        class="boldLink mt-3 ml-10"
        plain
        text
        @click="toModuleManagement()"
      >
        Manage my Modules
      </v-btn>
    </div>

    <v-divider></v-divider>
    <v-list dense>
      <v-hover v-for="module in modules" v-slot="{ hover }">
        <v-list-item
          class="moduleList"
          :style="{
            'background-color': hover ? ' #4a5c66' : 'white',
          }"
          :key="module.name"
          link
          @click="
            openModule(module);
            drawer = false;
          "
        >
          <v-list-item-content>
            <v-list-item-title
              :class="
                hover
                  ? ' #4a5c66 white--text font-weight-bold'
                  : 'font-weight-bold secondary--text'
              "
            >
              {{ module.name }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-hover>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Modules from "../../../api/collections/Modules";
import SubscribedModules from "../../../api/collections/SubscribedModules";
import toDoBase from "../ToDos/toDoBase.vue";
import { router } from "../../plugins/router";
export default {
  name: "navigation",
  components: {
    toDoBase,
  },
  data: () => ({
    drawer: false,
    e6: null,
    modules: [],
    filterOptions: ["Show all", "Show only subscribed"],
  }),
  created() {
    Tracker.autorun(() => {
      this.modules = Modules.find().fetch();
    });
  },
  methods: {
    handleEventFromParent(data) {
      this.drawer = data;
    },
    openModule(module) {
      this.$store.dispatch('setMyObject', module);
      this.$router.push({
        name: "mainpage",
        params: { module: { ...module }, moduleName: module.name },
      });
    },
    toModuleManagement() {
      this.$router.push({
        path: "/moduleManagement",
      });
    },
  },
  created() {
    Tracker.autorun(() => {
      const sModules = Meteor.subscribe("subscribedModules");
      if (sModules.ready()) {
        this.modules = SubscribedModules.find().fetch();
      }
    });
  },
};
</script>

<style>
.v-navigation-drawer {
  height: 100vh !important;
  z-index: 2 !important;
}
.moduleList {
  padding-left: 3em !important;
  height: 3em !important;
}
.thmImg {
  margin-left: auto;
}
.listHeader {
  font-weight: bold !important;
  padding-top: 1em !important;
  padding-left: 1em !important;
  font-size: 1.2em !important;
}
</style>
