<template>
  <div>
    <v-tabs
      v-model="active"
      slider-color="#f9d471"
      background-color="#dfe5e6"
      color="primary"
    >
      <v-tab v-for="n in 4" :key="n" ripple> Modul oder Inhalte {{ n }} </v-tab>
      <v-tab-item v-for="n in 4" :key="n">
        <v-card flat>
          <transition appear @before-enter="beforeEnter" @enter="enter">
            <v-card-text>{{ text }}</v-card-text>
          </transition>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "tabs",
  data() {
    return {
      active: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
    },
    // where the animation will end up
    enter(el) {
      gsap.to(el, {
        duration: 1.5,
        x: 0,
        opacity: 1,
      });
    },
  },
};
</script>
