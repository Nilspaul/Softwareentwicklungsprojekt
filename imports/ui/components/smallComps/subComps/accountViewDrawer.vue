<template>
  <div class="mr-4">
    <v-menu bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon :class="[{ 'display-3': $vuetify.breakpoint.mobile }]"
            >mdi-account</v-icon
          >
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-account-badge</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <settings></settings>
        </v-list>
        <v-list>
          <v-list-item link>
            <v-list-item-avatar>
              <v-icon class="mr-4">mdi-logout</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title @click="logout()">Log out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { VueMeteor } from "vue-meteor-tracker";
import settings from "./settings.vue";
import { router } from "../../../plugins/router";
export default {
  name: "accountViewDrawer",
  components: {
    settings,
  },
  props: {
    user: Object,
  },
  data: () => ({
    drawer: null,
    items: [
      {
        title: "Home",
        icon: "mdi-view-dashboard",
      },
      {
        title: "About",
        icon: "mdi-forum",
      },
    ],
  }),
  methods: {
    logout() {
      router.push({
        path: "/login",
      });
      Meteor.logout();
    },
  },
};
</script>

<style></style>
