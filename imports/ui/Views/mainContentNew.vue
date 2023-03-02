<template>
  <div v-if="user">
    <topBar :user="user" @drawNav="drawNav()" @setContent="setContent"></topBar>
    <v-subheader class="tabSubheader text-h5">{{
      currentModule.name
    }}</v-subheader>
    <div>
      <div class="d-flex justify-start">
        <v-sheet class="mt-5 ml-5 secondary--text">
          <p class="text-h4">Ankündigungen</p>
          <p v-for="ann in currentModule.ankündigungen">{{ ann }}</p>
        </v-sheet>
      </div>
      <div class="d-flex justify-end">
        <v-sheet class="mr-6 pa-2 secondary--text">
          <p class="text-h5 font-weight-bold">Lernplattformen</p>
          <p v-for="ann in currentModule.ankündigungen">{{ ann }}</p>
        </v-sheet>
      </div>
      <div class="d-flex justify-start">
        <p class="text-h4 ml-5 secondary--text">Studieninhalte</p>
      </div>
    </div>

    <v-row
      v-for="(item, index) in currentModule.modulKapitel"
      class="d-flex flex-column ml-5 mb-5 contentSection"
    >
      <v-sheet
        rounded="xl"
        :class="index % 2 === 0 ? 'moduleSheet' : 'moduleSheetDark'"
      >
      <v-row>
          <v-col cols="12" md="6" :order="index % 2 === 0 ? 1 : 2">
            <div class="mt-4">
              <v-img
                src="/images/shutterstock_127728257-rcm1200x0.jpg"
                alt=""
                height="400"
                contain
                class="rotate-x-2 rotate-y-11 rotate--2"
              ></v-img>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            :order="index % 2 === 0 ? 2 : 1"
            class="d-flex flex-column align-center justify-center"
          >
          <div
          :class="
            index % 2 === 0
              ? 'd-flex justify-start secondary--text'
              : 'd-flex justify-end white--text'
          "
          >
          <div class="mt-5 d-flex">
            <div>
              <p class="text-h5 content">{{ item.kapitelName }}</p>
              <v-row class="flex-column flex-end">
                <v-expansion-panels
                  flat
                  popout
                  class="moduleContent ml-16 pl-16 mb-6 mt-2"
                >
                  <v-expansion-panel
                    v-for="module in item.kapitelInhalte"
                    :key="module.name"
                    hide-actions
                  >
                    <v-expansion-panel-header
                      :class="
                        index % 2 === 0 ? 'secondary--text' : 'white--text'
                      "
                      icon-color="secondary"
                      :color="index % 2 === 0 ? '#dfe5e6 ' : '#4a5c66'"
                    >
                      <template v-slot:actions>
                        <v-icon
                          :color="index % 2 === 0 ? 'secondary' : 'white'"
                        >
                          $expand
                        </v-icon>
                      </template>
                      <strong dark>{{ module.name }}</strong>
                    </v-expansion-panel-header>
                    <v-divider
                      :color="index % 2 === 0 ? 'grey' : 'white'"
                    ></v-divider>
                    <v-expansion-panel-content
                      :color="index % 2 === 0 ? '#dfe5e6 ' : '#4a5c66'"
                    >
                      <v-card-text
                        :class="
                          index % 2 === 0 ? 'secondary--text' : 'white--text'
                        "
                        v-text="module.inhalt"
                      ></v-card-text>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </div>
          </div>
        </div>
          </v-col>
        </v-row>

      </v-sheet>
    </v-row>

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
      <v-list dense>
        <v-list-item
          class="moduleList pa-2"
          v-for="module in modules"
          :key="module.name"
          link
          @click="
            currentModule = module;
            drawer = false;
          "
        >
          <v-list-item-content class="d-flex justify-left">
            <p class="font-weight-bold secondary--text pt-3">
              {{ module.name }}
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import topBar from "../components/topBar/topBar.vue";
import tabs from "../components/mainpage/tabs";
import toDoBase from "../components/ToDos/toDoBase.vue";
import Modules from "../../api/collections/Modules";
import SubscribedModules from "../../api/collections/SubscribedModules";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
export default {
  name: "mainContent",
  components: {
    topBar,
    tabs,
    toDoBase,
  },
  data: () => ({
    drawer: null,
    alert: false,
    currentModule: null,
    currentTab: null,
    modules: [],
    dbModules: [],
    subscribedModules: [],
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
      if (this.e6 === "Show only subscribed") {
        this.modules = this.subscribedModules;
      } else {
        this.modules = this.dbModules;
      }
    },
    leaving() {
      this.alert("test");
    },
    setContent(content) {
      let moduleName;
      if (content.length !== 1) {
        moduleName = content[1];
        this.currentTab = content[0];
      } else {
        moduleName = content[0];
      }
      Meteor.call("module.findModule", moduleName, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          this.currentModule = result;
        }
      });
    },
  },
  created() {
    Tracker.autorun(() => {
      this.user = Meteor.user();
      if (this.user !== undefined) {
        this.$forceUpdate();
      }
      this.subscribedModules = SubscribedModules.find().fetch();
      this.dbModules = Modules.find().fetch();
      this.modules = this.dbModules;
      this.currentModule = this.modules[0];
    });
  },
};
</script>

<style scoped>
.moduleList {
  height: 3em !important;
}
.content {
  margin-left: 5em;
  margin-right: 10em;
}
</style>
