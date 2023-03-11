<template>
  <div>
    <div class="d-flex justify-space-around mb-6 flex-wrap-reverse">
      <v-sheet class="ma-2">
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
        <div class="mt-15 ml-12">
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
        <div class="mt-15 ml-12">
          <v-card
          :width="$vuetify.breakpoint.xs? '90vw':'30em'"
            class="d-flex flex-column rounded-xl mt-16"
            color="secondary"
            outlined
          >
            <v-card-title
              align-center
              :style="{ color: '#4a5c66' }"
              class="text-h5 d-flex justify-center white--text"
            >
              <v-icon color="white" class="mr-5">mdi-link-variant</v-icon>

              <div>Important links</div>
            </v-card-title>
            <hr class="ml-4 mr-4 mb-2" color="#80ba24" />
            <div class="white--text ml-8 importantLinks">
              <p>Prüfungs- und Studienausschüsse</p>
              <p>Moodle</p>
              <p>E-Campus</p>
              <p>Klausurplan</p>
            </div>
          </v-card>
        </div>
      </v-sheet>
      <v-sheet :width="$vuetify.breakpoint.xs? '90vw':'30em'">
        <div>
          <v-sheet class="mt-10 mb-10">
            <div class="d-flex flex-column">
              <div
                class="font-weight-bold text-h5"
                :style="{ color: '#4a5c66' }"
              >
                Calendar
              </div>
              <v-date-picker
                class="rounded-xl"
                dark
                color="secondary"
                :width="$vuetify.breakpoint.xs? '90vw':'30em'"
                v-model="date1"
                :events="arrayEvents"
                event-color="green lighten-1"
              ></v-date-picker>
            </div>
          </v-sheet>
        </div>
        <div>
          <v-card
            width="30em"
            class="d-flex flex-column rounded-xl mt-16"
            color="#f4aa00"
            outlined
          >
            <v-card-title
              align-center
              :style="{ color: '#4a5c66' }"
              class="text-h5 white--text"
            >
            <div class="d-flex"> 
                          <v-icon color="white" class="mr-10"
                >mdi-format-list-checks</v-icon
              >
              <div>
                <p>Your 5 upcoming To-Do's</p>
                <p class="text-subtitle-2">(Look into your planner for more details)</p>
              </div>
            </div>

            </v-card-title>
            <hr class="ml-4 mr-4 mb-2" color="white" />
            <div class="white--text ml-8 upcomingToDos">
              <p v-for="(toDo, index) in toDos" v-if="index<5">
                {{ toDo.name + " " + toDo.start + " Uhr" }}
              </p>
            </div>
          </v-card>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import ToDos from "../../api/collections/ToDos";
import moment from "moment";
export default {
  name: "landingpage",
  components: {},
  data: () => ({
    arrayEvents: [],
    toDos: [],
    toDoDates: [],
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

  created() {
    Tracker.autorun(() => {
      const toDoSubscription = Meteor.subscribe("toDos");
      if (toDoSubscription.ready()) {
        this.toDos = ToDos.find().fetch();
      }
      this.toDos.sort((a, b) => {
        const dateA = a.start; // ignore upper and lowercase
        const dateB = b.start; // ignore upper and lowercase
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      this.toDos.forEach((toDo, index) => {
        if (index < 5) {
          this.arrayEvents.push(moment(new Date(toDo.start)).format("YYYY-MM-DD"));
          toDo.start = moment(new Date(toDo.start)).format("DD.MM.YY hh:mm");
        }
      });
    });
  },
};
</script>

<style scoped>
.content {
  margin-left: 5em;
  margin-right: 10em;
}

.importantLinks p:hover {
  color: #80ba24 !important;
  text-decoration: underline !important;
}
.upcomingToDos p:hover {
  color: white !important;
  text-decoration: underline !important;
}
.leftSide {
  margin-top: 3.3em !important;
  margin-left: 5em !important;
}
</style>
