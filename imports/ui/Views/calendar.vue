<template>
  <div>
    <div class="d-flex justify-center bg-surface-variant">
      <v-sheet class="pa-2">
        <v-card-title
          align-center
          class="text-h3 primary--text font-weight-bold"
        >
          My StudyPlanner
        </v-card-title>
      </v-sheet>
    </div>
    <v-row class="calenderView">
      <v-col>
        <v-sheet>
          <v-toolbar flat color="white">
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet>
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            :event-overlap-mode="'column'"
            dark
            class="font-weight-bold ml-5 mr-5"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            :locale="'de'"
          >
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title>
                  {{ selectedEvent.name }}
                  
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="d-flex flex-column">
                <p class="font-weight-bold">Zeitraum</p>
                <div> {{ selectedEvent.start}}</div>
                <p class="font-weight-bold pt-4">Details</p>
                <span>   {{ selectedEvent.description }}</span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
    <createToDo/>
  </div>
</template>

<script>
import ToDos from "../../api/collections/ToDos";
import createToDo from "../components/ToDos/createToDo.vue"
import dayjs from "dayjs"
import topBar from "../components/topBar/topBar.vue";
import navigation from "../components/topBar/navigation.vue";
export default {
  name: "calendar",
  components: {
    createToDo,
    navigation,
    topBar
  },
  data: () => ({
    focus: "",
    type: "week",
    user: null,
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ["blue", "red", "orange"],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
  },
  created() {
  Tracker.autorun(() => {
    const toDoSubscription = Meteor.subscribe('toDos');
    if(toDoSubscription.ready()){
      this.toDos = ToDos.find().fetch();
      this.events = this.toDos.map((toDo) => {
        return {
          name: toDo.name,
          start: new Date(toDo.start),
          end: new Date(toDo.end),
          color: toDo.color,
          timed: toDo.timed,
          description: toDo.note
        };
      });
    }
  });
},
  
};
</script>
<style scoped>
.v-calendar {
  background-color: #4a5c66 !important;
  height: 50vh !important;
  margin-bottom: 6em !important;
  margin-left: 3em !important;
  margin-right: 3em !important;

}
.calenderView {
  margin-top: 1em !important;
}

.theme--dark.v-calendar-events {
  border: 1px solid !important;
}
</style>
