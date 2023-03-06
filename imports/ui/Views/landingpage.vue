<template>
  <div>
    <div class="d-flex justify-left bg-surface-variant">
        <v-sheet class="ma-2 pa-2 d-flex flex-column">
            <div class="d-flex">
                <v-icon color="secondary">mdi-checkbox-marked-circle-outline</v-icon>
                <div class="font-weight-bold" :style="{ color: '#4a5c66' }">
                    Organize your classes, tasks and exams
                </div>
            </div>
            <div>
                <v-btn>
                    <v-icon>mdi-notebook</v-icon>
                    <div>Go To My Planner</div>
                </v-btn>
                <v-btn @click="moduleManagement()">
                    <v-icon>mdi-unfold-more-horizontal</v-icon>
                    <div>Module Management</div>
                </v-btn>
            </div>
        </v-sheet>
      </div>
  </div>
</template>

<script>
export default {
  name: "landingpage",
  components: {

  },
  data: () => ({
   
  }),
  methods: {
    moduleManagement() {
     this.$router.push({
        path: "/moduleManagement",
      });
    }
  },
  computed: {
    currentModule() {
      return this.$route.params.module;
    }
  },
  
};
</script>

<style scoped>
.content {
  margin-left: 5em;
  margin-right: 10em;
}
</style>
