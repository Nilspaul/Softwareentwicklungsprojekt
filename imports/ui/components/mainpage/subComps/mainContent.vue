<template>
  <v-sheet>
    <v-alert
      outlined
      type="success"
      text
      v-model="alert"
      border="left"
      close-text="Close Alert"
      dismissible
    >
      Sie haben das Modul {{ currentModule.name }} abonniert!
    </v-alert>
    <topBar :user="user" v-on:drawNav="drawNav()"></topBar>
    <tabs :currentModule="currentModule"></tabs>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-carousel
          :class="[{ mobileSlider: $vuetify.breakpoint.mobile }]"
          cycle
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-row>
    </v-container>
    <v-navigation-drawer
      :class="[
        { mainNav: !$vuetify.breakpoint.mobile },
        { mainNavMobile: $vuetify.breakpoint.mobile },
      ]"
      temporary
      v-model="drawer"
    >
      <v-list-item>
        <v-list-item-content>
          <v-img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Technische_Hochschule_Mittelhessen_Logo.svg"
          >
          </v-img>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <toDoBase></toDoBase>
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
      <v-container fluid>
        <v-row justify="center">
          <v-subheader>Die Module auf einen Blick!</v-subheader>
          <v-expansion-panels popout>
            <v-expansion-panel
              v-for="module in modules"
              :key="module.name"
              hide-actions
            >
              <v-expansion-panel-header class="white--text" color="secondary" icon-color="white">
                <template v-slot:actions>
                  <v-icon color="white">
                    $expand
                  </v-icon>
                </template>
                <v-row align="center" class="spacer" no-gutters>
                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <strong dark>{{module.name}}</strong>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-card-text v-text="module.inhalte.infotext"></v-card-text>
                <v-row align="center" class="spacer" no-gutters>
                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <v-btn color="primary" @click="subscribeModule(module); alert=true"> Subscribe</v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-container>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
import topBar from "../../smallComps/topBar";
import tabs from "../subComps/tabs";
import toDoBase from "../ToDos/toDoBase.vue";
import Modules from "../../../../api/collections/Modules";
export default {
  name: "mainContent",
  components: {
    topBar,
    tabs,
    toDoBase,
  },
  props: {
    user: Object,
  },
  data: () => ({
    drawer: null,
    alert: false,
    currentModule: null,
    modules: [],
    e6: null,
    filterOptions: ["Show all", "Show only subscribed"],
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
  }),
  methods: {
    drawNav() {
      this.drawer = !this.drawer;
    },
    subscribeModule(clickedModule) {
      this.currentModule = clickedModule;
      Meteor.call("module.subscribe", clickedModule);
      this.drawer = false;
    },
    openModule(module) {
      this.currentModule = module;
      this.drawer = false;
    },
    filterModules() {
      console.log(this.e6);
    },
  },
  created() {
    Tracker.autorun(() => {
      this.modules = Modules.find().fetch();
      if (this.currentModule === null) {
        this.currentModule = this.modules[0];
      }
    });
  },
};
</script>

<style></style>
