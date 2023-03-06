<template>
  <div class="mr-4" v-if="user && user.username">
    <v-menu bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon :class="[{ 'display-3': $vuetify.breakpoint.mobile }, {'display-2' : ! $vuetify.breakpoint.mobile }]"
            >mdi-account</v-icon
          >
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon icon-color="white">mdi-account-badge</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>    {{ user.username }}
</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title @click="setRoute(item.link)">{{ item.title }}</v-list-item-title>
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
import settings from "./accountViewComponents/settings.vue";
import { router } from "../../../plugins/router";
export default {
  name: "accountViewDrawer",
  components: {
    settings,
  },

  data: () => ({
    drawer: null,
    user:null,
    items: [
      {
        title: "Profile",
        icon: "mdi-account",
        link: "/profile"
      },
      {
        title: "Planner",
        icon: "mdi-calendar",
        link: "/calendar"
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
    setRoute(link) {
      router.push({
        path: link
      });
    }
  },
  created() {
    Tracker.autorun(() => {
      this.user = Meteor.user();
      if (this.user !== undefined) {
        this.$forceUpdate();
      }
    });
  },
};
</script>

<style scoped>
</style>
