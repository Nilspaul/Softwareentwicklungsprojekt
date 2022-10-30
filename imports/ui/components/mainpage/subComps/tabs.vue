<template>
  <div>
    <v-tabs
      v-model="active"
      slider-color="#f9d471"
      background-color="#dfe5e6"
      color="primary"
    >
      <v-tab v-for="module in modules" ripple :key="module.name"> {{module.name}} </v-tab>
      <v-tab-item v-for="test in modules" :key="test.name">
        <v-card flat class="mt-5" v-for="inhalt in test.inhalte" :key="inhalt">
          <transition appear @before-enter="beforeEnter" @enter="enter">
            <v-card-text>{{ inhalt + test.name}}</v-card-text>
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
  props:{
    modules: [],
  },
  data() {
    return {
      active: null,
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
    },
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
