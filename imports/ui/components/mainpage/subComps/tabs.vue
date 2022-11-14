<template>
  <div>
  <v-subheader :class="[{'tabSubheaderMobile display-1' : $vuetify.breakpoint.mobile}, {'tabSubheader display-1' : !$vuetify.breakpoint.mobile}]">{{currentModule.name}}</v-subheader>
    <v-tabs
      v-model="active"
      slider-color="#f9d471"
      background-color="blue-grey lighten-5">
      <v-tab v-for="content in Object.keys(currentModule.inhalte)" ripple>
        {{ content }}
      </v-tab>

      <v-tab-item v-for="inhalt in currentModule.inhalte">
        <v-card flat class="mt-5">
          <transition
            appear
            @before-enter="beforeEnter"
            @enter="enter"
          >
            <v-card-text  :class="[{'display-1' : $vuetify.breakpoint.mobile}]">{{inhalt}}</v-card-text>
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
  props: {
    currentModule: Object,
  },
  data() {
    return {
      active: null,
      moduleContents: [],
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
