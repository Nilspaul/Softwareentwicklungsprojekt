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
            class="font-weight-bold ma-5"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
            :locale="'de'"
          >
            <template v-slot:event="{ event }">
              <div class="text-body-1 font-weight-bold">
                <div>{{ event.name }}</div>
              </div>
            </template>
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
              <v-card-text>
                <span> My content</span>
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
export default {
  name: "calendar",
  components: {
    createToDo
  },
  data: () => ({
    focus: "",
    type: "week",
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
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
          description: "test",
        });
      }
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  created() {
    Tracker.autorun(() => {
      this.toDos = ToDos.find().fetch();
      this.toDos.forEach((toDo) => {
          console.log(toDo)
          switch (toDo.priority) {
            case "High":
              Object.assign(toDo, { color: "#e55353" });
              break;
            case "Medium":
              Object.assign(toDo, { color: "#f4aa00" });
              break;
            case "Low":
              Object.assign(toDo, { color: "#75cddb" });
              break;
              case "completed":
              Object.assign(toDo, { color: "grey" });
          }
          this.events.push(toDo);
        });
      });
    console.log(this.events);
  },
};
</script>
<style scoped>
.v-calendar {
  background-color: #4a5c66 !important;
  height: 60em !important;
  margin-bottom: 20em !important;
}
.calenderView {
  margin-top: 1em !important;
}

.theme--dark.v-calendar-events {
  border: 1px solid !important;
}
</style>
