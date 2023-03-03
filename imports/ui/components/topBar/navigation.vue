<template>
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
          openModule(module);
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
</template>

<script>
import Modules from "../../../api/collections/Modules";
import toDoBase from "../ToDos/toDoBase.vue";
export default {
  name: "navigation",
  components: {
    toDoBase,
  },
  data: () => ({
    drawer: false,
    e6: null,
    filterOptions: ["Show all", "Show only subscribed"],
  }),
  created() {
    Tracker.autorun(() => {
      this.modules = Modules.find().fetch();
    });
  },
  methods: {
    handleEventFromParent(data) {
    console.log(data)
      this.drawer = data;
    },
    openModule(module){
        console.log(module)
        this.$emit('openModule', module)
    }
  },
};
</script>

<style>
.v-navigation-drawer {
    height: 100vh !important;
    z-index: 2 !important;
}
</style>
