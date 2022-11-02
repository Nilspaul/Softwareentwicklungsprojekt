<template>
  <div>
    <v-sheet>
      <v-alert
        v-model="alert"
        border="left"
        elevation="50"
        close-text="Close Alert"
        dismissible
        color="primary"
        dark
      >
        Sie haben das Modul {{ currentModule.name }} abonniert und werden über
        Neuigkeiten benachrichtigt!
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
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-content>
            <v-img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Technische_Hochschule_Mittelhessen_Logo.svg"
            ></v-img>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <toDoBase></toDoBase>
        <v-row align="center">
          <v-col cols="12" sm="6">
            <v-subheader>Filter options:</v-subheader>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="e6"
              :items="filterOptions"
              :menu-props="{ maxHeight: '400' }"
              label="Select"
              multiple
              persistent-hint
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item v-for="item in modules" :key="item.name" link>
            <v-btn icon class="mr-2">
              <v-icon
                color="primary"
                @click="
                  subscribeModule(item);
                  alert = true;
                "
                >mdi-plus</v-icon
              >
            </v-btn>
            <v-list-item-content>
              <v-list-item-title @click="openModule(item)">{{
                item.name
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
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
    e6: [],
    filterOptions: ["Show all", "Show only subscribed"],
    items2: [
      {
        title: "Semester oder Modul 1",
        icon: "mdi-view-dashboard",
      },
      {
        title: "Semester oder Modul 2",
        icon: "mdi-forum",
      },
    ],
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
