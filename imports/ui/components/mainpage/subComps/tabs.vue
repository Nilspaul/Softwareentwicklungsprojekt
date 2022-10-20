<template>
<div>
<v-tabs
        v-model="active"
        slider-color="#f9d471"
        background-color="#dfe5e6"
        color="primary"
      >
        <v-tab
          v-for="n in 3"
          :key="n"
          ripple
        >
          Item {{ n }}
        </v-tab>
        <v-tab-item
          v-for="n in 3"
          :key="n"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
  
      <div class="text-xs-center mt-3">
        <v-btn @click="next">next tab</v-btn>
      </div>

</div>
</template>

<script>
export default {
    name:"tabs",
    data () {
    return {
      active: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  }
}
</script>