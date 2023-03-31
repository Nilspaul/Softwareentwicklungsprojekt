<template>
  <div>
    <!-- Header section -->
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

    <!-- Calendar section -->
    <v-row class="calenderView">
      <v-col>
        <v-sheet>
          <!-- Calendar toolbar -->
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
            <!-- Dropdown for selecting type of calendar view (day, week, month) -->
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
          <!-- Vue calendar component -->
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

          <!-- Pop-up for editing or deleting selected event -->
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <!-- Button to toggle edit mode -->
                <v-btn v-if="editMode === false" icon @click="editMode = true">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <!-- Button to save changes made in edit mode -->
                <v-btn
                  v-else
                  @click="
                    editMode = false;
                    updateToDo(selectedEvent);
                  "
                  icon
                  class="mr-4"
                >
                  <v-icon>mdi-content-save-edit-outline</v-icon>
                </v-btn>
                <v-toolbar-title>
                  {{ selectedEvent.name }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-btn
                    dark
                    color="red"
                    @click="
                      deleteToDo(selectedEvent);
                      selectedOpen = false;
                    "
                    >Delete ToDo</v-btn
                  >
                </v-menu>
              </v-toolbar>
              <v-card-text class="d-flex flex-column">
                <p class="font-weight-bold">Zeitraum</p>
                <v-form :disabled="editMode === false ? true : false">
                  <v-row class="d-flex">
                    <v-col class="flex-grow-1">
                      <v-menu
                        v-model="startDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="formattedStartDate"
                            label="Select Startdate"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startDate"
                          @input="updateFormattedDate(startDate, true)"
                          format="dd.MM.yyyy"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="flex-grow-1">
                      <v-menu
                        v-model="startTimeMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="startTime"
                            label="Select Starttime"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-model="startTime"
                          format="24hr"
                          full-width
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex">
                    <v-col class="flex-grow-1">
                      <v-menu
                        v-model="endDateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="formattedEndDate"
                            label="Select Enddate"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          @input="updateFormattedDate(endDate, false)"
                          format="dd.MM.yyyy"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="flex-grow-1">
                      <v-menu
                        v-model="endTimeMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="endTime"
                            label="Select Endtime"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-model="endTime"
                          format="24hr"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>

                  <p class="font-weight-bold pt-4">Details</p>
                  <v-text-field
                    v-model="selectedEvent.note"
                    label="Regular"
                    clearable
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text class="red--text" @click="selectedOpen = false">
                  Cancel
                </v-btn>
                <v-btn
                  v-if="editMode === true"
                  text
                  color="primary"
                  @click="
                    selectedOpen = false;
                    updateToDo(selectedEvent);
                    editMode = false;
                  "
                >
                  Save changes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
    <createToDo />
  </div>
</template>

<script>
import ToDos from "../../api/collections/ToDos";
import createToDo from "../components/ToDos/createToDo.vue";
import dayjs from "dayjs";
import moment from "moment";
import topBar from "../components/topBar/topBar.vue";
import navigation from "../components/topBar/navigation.vue";

export default {
  name: "calendar",
  components: {
    createToDo,
    navigation,
    topBar,
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
    editMode: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    formattedEndDate: null,
    formattedStartDate: null,
    startDate: null,
    startTime: null,
    startTimeMenu: false,
    startDateMenu: false,
    endDateMenu: false,
    endTimeMenu: false,
    endDate: null,
    endTime: null,
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
    deleteToDo(event) {
      let toDo = this.toDos[this.toDos.findIndex((toDo) => toDo.name === event.name)];
      Meteor.call("toDo.delete", toDo);
    },
    updateFormattedDate(datePicked, isStartDate) {
      const date = new Date(datePicked);
      this.startDateMenu = false; // close the menu after selecting a date
      const formattedDate = date.toLocaleDateString("de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      if (isStartDate) {
        this.formattedStartDate = formattedDate;
      } else {
        this.formattedEndDate = formattedDate;
      }
    },
    updateToDo(event) {
      let toDo =
        this.toDos[this.toDos.findIndex((toDo) => toDo.name === event.name)];
      event = this.formatDates(event);
      let updatedToDo = { ...toDo, ...event };

      Meteor.call("toDo.update", updatedToDo);
    },
    formatDates(toDo) {
      toDo.start = moment(this.formattedStartDate, "DD.MM.YYYY").format(
        "YYYY-MM-DD"
      );
      toDo.start = toDo.start + "T" + this.startTime + ":00";
      toDo.end = moment(this.formattedEndDate, "DD.MM.YYYY").format(
        "YYYY-MM-DD"
      );
      toDo.end = toDo.end + "T" + this.endTime + ":00";
      return toDo;
    },
  },
  created() {
    Tracker.autorun(() => {
      const toDoSubscription = Meteor.subscribe("toDos");
      if (toDoSubscription.ready()) {
        this.toDos = ToDos.find().fetch();
        this.events = this.toDos.map((toDo) => {
          return {
            name: toDo.name,
            start: new Date(toDo.start),
            end: new Date(toDo.end),
            color: toDo.color,
            timed: toDo.timed,
            note: toDo.note,
          };
        });
      }
    });
  },
  watch: {
    selectedEvent() {
      this.formattedStartDate = dayjs(this.selectedEvent.start).format(
        "DD.MM.YYYY"
      );
      this.startTime = dayjs(this.selectedEvent.start).format("HH:MM");
      this.formattedEndDate = dayjs(this.selectedEvent.end).format(
        "DD.MM.YYYY"
      );
      this.endTime = dayjs(this.selectedEvent.end).format("HH:MM");
    },
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
