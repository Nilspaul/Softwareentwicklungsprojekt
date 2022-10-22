<template>
  <div>
    <v-sheet>
      <topBar :user="user" v-on:drawNav="drawNav()"></topBar>
      <tabs></tabs>
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
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items2" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
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
export default {
  name: "mainContent",
  components: {
    topBar,
    tabs,
  },
  props: {
    user: Object,
  },
  data: () => ({
    drawer: null,
    items2: [
      {
        title: "Home",
        icon: "mdi-view-dashboard",
      },
      {
        title: "About",
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
    isMobile() {
      if (this.$vuetify.breakpoint.md === true) {
        return true;
      }
    },
  },
};
</script>

<style></style>
