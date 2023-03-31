<template>
  <div>
    <div class="d-flex justify-space-around mb-6 flex-wrap-reverse">
      <v-sheet class="ma-2">
        <div>
        <!-- Section for Planner and Modulemanagement quicklinks-->
          <v-sheet class="ma-2 pa-2 mt-10 ml-10 mb-10">
            <div class="d-flex">
              <v-icon class="mr-2 mb-10" size="35" color="secondary"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
              <div
                class="font-weight-bold text-h4"
                :style="{ color: '#4a5c66', 'max-width': '35vw' }"
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
                    >mdi-calendar-clock-outline</v-icon
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
                    >mdi-notebook-plus</v-icon
                  >
                  <div>Module Management</div>
                </v-btn>
              </v-hover>
            </div>
          </v-sheet>
        </div>
        <!-- News section -->
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
        <!-- Important links for users to thm sites-->
        <div class="mt-15 ml-12">
          <v-card
            :width="$vuetify.breakpoint.xs ? '90vw' : '30em'"
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
              <p v-for="link in links" @click="setRoute(link.link)">
                {{ link.name }}
              </p>
            </div>
          </v-card>
        </div>
      </v-sheet>
      <!-- Calendar with toDos marks-->
      <v-sheet :width="$vuetify.breakpoint.xs ? '90vw' : '30em'">
        <div>
          <v-sheet class="mt-14 mb-10">
            <div class="d-flex flex-column">
              <div
                class="font-weight-bold text-h4 d-flex mb-2"
                :style="{ color: '#4a5c66' }"
              >
                <v-icon color="secondary" size="40" class="mr-4"
                  >mdi-calendar-multiselect</v-icon
                >
                <div>Calendar</div>
              </div>
              <v-date-picker
                class="rounded-xl"
                dark
                color="secondary"
                :width="$vuetify.breakpoint.xs ? '90vw' : '30em'"
                v-model="today"
                :events="arrayEvents"
                event-color="green lighten-1"
              ></v-date-picker>
            </div>
          </v-sheet>
        </div>
        <!-- Upcoming toDos section -->
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
                  <div>Your 5 upcoming To-Do's</div>
                  <a
                    color="white"
                    class="white--text text-subtitle-2"
                    href="/calendar"
                    >(Look into your planner for more details)</a
                  >
                </div>
              </div>
            </v-card-title>
            <hr class="ml-4 mr-4 mb-2" color="white" />
            <div class="white--text ml-8 upcomingToDos">
              <p v-for="(toDo, index) in toDos" v-if="index < 5">
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
import ToDos from "../../api/collections/ToDos"; // Importing ToDos collection from the API
import moment from "moment"; // Importing moment library
import dayjs from "dayjs"; // Importing dayjs library
export default {
  name: "landingpage",
  components: {},
  data: () => ({
    arrayEvents: [], 
    toDos: [], 
    toDoDates: [],
    links: [ 
      {
        name: "Prüfungs- und Studienausschüsse",
        link: "https://www.thm.de/site/hochschule/zentrale-bereiche/pruefungsamt/pruefungsausschuesse.html",
      },
      { name: "Moodle", link: "https://moodle.thm.de/login/index.php" },
      {
        name: "E-Campus",
        link: "https://ecampus.thm.de/service/pages/cs/sys/portal/hisinoneStartPage.faces",
      },
      { name: "Organizer", link: "https://www.thm.de/organizer/" },
    ],
    // Initializing today's date in ISO format
    today: new Date().toISOString().substr(0, 10), 
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
    // A function to open a link in a new tab
    setRoute(link) { 
      window.open(link, "_blank");
    },
  },
  computed: {
    // A computed property to get the current module from the route params
    currentModule() { 
      return this.$route.params.module;
    },
  },

  created() { 
    // A reactive function that re-runs when its dependencies change
    Tracker.autorun(() => { 
      // Subscribe to the "toDos" collection in the database
      const toDoSubscription = Meteor.subscribe("toDos");
      // If the subscription is ready 
      if (toDoSubscription.ready()) { 
        // Get the to-dos from the database
        this.toDos = ToDos.find().fetch(); 
      }
      // Sort the to-dos by start date
      this.toDos.sort((a, b) => { 
        const dateA = a.start; 
        const dateB = b.start;
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });
      // Iterate over the to-dos
      this.toDos.forEach((toDo, index) => { 
        // Only add the first 5 to-dos to the events array
        if (index < 5) { 
          this.arrayEvents.push(
            moment(new Date(toDo.start)).format("YYYY-MM-DD")
          );
          // Format the start date for display
          toDo.start = dayjs(toDo.start).format("DD.MM.YYYY HH:mm"); 
        }
      });
    });
  },
};
</script>

<style>
.importantLinks p:hover {
  text-decoration: underline !important;
}
.upcomingToDos p:hover {
  color: white !important;
}
.leftSide {
  margin-top: 3.3em !important;
  margin-left: 5em !important;
}
.v-date-picker-title__date > div {
  position: relative;
  font-size: 20px;
}
</style>
