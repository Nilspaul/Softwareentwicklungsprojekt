<template>
  <div>
    <div class="d-flex justify-space-between mb-6 bg-surface-variant">
      <v-sheet class="ma-2 pa-2">
        <div>
          <v-sheet class="ma-2 pa-2 mt-10 ml-10 mb-10">
            <div class="d-flex">
              <v-icon class="mr-1" color="secondary"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
              <div
                class="font-weight-bold text-h5"
                :style="{ color: '#4a5c66' }"
              >
                Organize your classes, tasks and exams
              </div>
            </div>
            <div class="mt-8 ml-8">
              <v-hover v-slot="{ hover }">
                <v-btn
                  class="white--text ml-4 rounded-lg"
                  :style="{
                    'background-color': hover ? '#80ba24' : '#4a5c66',
                  }"
                  @click="planner()"
                >
                  <v-icon
                    class="mr-2"
                    :style="{
                      color: hover ? 'white' : '#80ba24',
                    }"
                    >mdi-notebook</v-icon
                  >
                  <div>Go To My Planner</div>
                </v-btn>
              </v-hover>

              <v-hover v-slot="{ hover }">
                <v-btn
                  class="white--text ml-4 rounded-lg"
                  :style="{
                    'background-color': hover ? '#80ba24' : '#4a5c66',
                  }"
                  @click="moduleManagement()"
                >
                  <v-icon
                    class="mr-2"
                    :style="{
                      color: hover ? 'white' : '#80ba24',
                    }"
                    >mdi-unfold-more-horizontal</v-icon
                  >
                  <div>Module Management</div>
                </v-btn>
              </v-hover>
            </div>
          </v-sheet>
        </div>
        <div class="mt-15 ml-12 d-flex flex-column">
          <div
            class="d-flex font-weight-bold text-h4"
            :style="{ color: '#4a5c66' }"
          >
            <v-icon color="secondary" size="40" class="mr-5"
              >mdi-newspaper-variant-multiple-outline</v-icon
            >
            <div>News</div>
          </div>
          <div class="secondary--text ml-8 mt-4">
            Welcome to your personal THMStudyPlanner!
            <br />
            Keep track of your to-do's and never miss out on any assignment!
            <br />
            Don't let your schedule run you, run your schedule!
          </div>
        </div>
        <div>
          <v-card
            width="25em"
            class="d-flex flex-column rounded-xl mt-16 ml-12"
            color="secondary"
            outlined
          >
            <v-card-title
              align-center
              :style="{ color: '#4a5c66' }"
              class="text-h5 d-flex justify-center white--text"
            >
              <v-icon color="white" class="mr-10">mdi-link-variant</v-icon>

              <div class="mr-15">Important links</div>
            </v-card-title>
            <hr class="ml-4 mr-4 mb-2" color="#80ba24" />
            <div class="white--text ml-8">
              <p>Prüfungs- und Studienausschüsse</p>
              <p>Moodle</p>
              <p>E-Campus</p>
              <p>Klausurplan</p>
            </div>
          </v-card>
        </div>
      </v-sheet>
      <v-sheet class="ma-2 pa-2 mr-16">
        <div>
          <v-sheet class="ma-2 pa-2 mt-10 ml-10 mb-10">
            <div class="d-flex flex-column">
              <div
                class="font-weight-bold text-h5"
                :style="{ color: '#4a5c66' }"
              >
                Calendar
              </div>
              <v-date-picker
              dark
              color="secondary"
              width="30em"
                v-model="date1"
                :events="arrayEvents"
                event-color="green lighten-1"
              ></v-date-picker>
            </div>
          </v-sheet>
        </div>
        <div>
          <v-card
            width="25em"
            class="d-flex flex-column rounded-xl mt-16 ml-12"
            color="#f4aa00"
            outlined
          >
            <v-card-title
              align-center
              :style="{ color: '#4a5c66' }"
              class="text-h5 d-flex justify-center white--text"
            >
              <v-icon color="white" class="mr-10"
                >mdi-format-list-checks</v-icon
              >

              <div class="mr-15">Upcoming To-Do's</div>
            </v-card-title>
            <hr class="ml-4 mr-4 mb-2" color="white" />
            <div class="white--text ml-8">
              <p>Prüfungs- und Studienausschüsse</p>
              <p>Moodle</p>
              <p>E-Campus</p>
              <p>Klausurplan</p>
            </div>
          </v-card>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "landingpage",
  components: {},
  data: () => ({
    arrayEvents: null,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
  }),
  methods: {
    moduleManagement() {
      this.$router.push({
        path: "/moduleManagement",
      });
    },
    planner() {
      this.$router.push({
        path: "/calendar",
      });
    },
    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    },
  },
  computed: {
    currentModule() {
      return this.$route.params.module;
    },
  },
  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },
};
</script>

<style scoped>
.content {
  margin-left: 5em;
  margin-right: 10em;
}

p:hover {
  color: #80ba24 !important;
  text-decoration: underline !important;
}
.leftSide {
  margin-top: 3.3em !important;
  margin-left: 5em !important;
}
</style>
