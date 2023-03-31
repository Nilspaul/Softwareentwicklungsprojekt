<template>
  <!-- This is a Vue.js component for a dialog box that allows the user to create a new ToDo item. -->
  <!-- The dialog box is activated by clicking on a button with a plus icon. -->
  <v-dialog v-model="dialog">
    <!-- The button that activates the dialog box is wrapped in a template that passes on its events and attributes to the button. -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        elevation="50"
        absolute
        middle
        right
        fab
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <!-- The dialog box itself contains a form with several input fields and a submit button. -->
    <v-card ref="form">
      <v-card-title> Erstelle ein ToDo </v-card-title>
      <v-card-text>
        <!-- The name input field is required and has validation rules. -->
        <v-text-field
          ref="name"
          v-model="name"
          :rules="[() => !!name || 'This field is required']"
          :error-messages="errorMessages"
          label="ToDo Name"
          placeholder="Gib deinem ToDo einen Namen"
          required
        ></v-text-field>

        <!-- The note input field is not required  -->
        <v-text-field
          ref="note"
          v-model="note"
          :rules="[() => !!note || 'This field is required']"
          :error-messages="errorMessages"
          label="Beschreibung"
          placeholder="Beschreibe dein ToDo"
        ></v-text-field>

        <!-- The module input field -->
        <v-text-field
          ref="module"
          v-model="module"
          :rules="[() => !!module || 'This field is required']"
          :error-messages="errorMessages"
          label="Modul"
          placeholder="Zu welchem Modul soll das ToDo gehören?"
        ></v-text-field>

        <!-- The picker component allows the user to select a date and time. -->
        <picker @getDates="getDates"></picker>

        <!-- The priority select field allows the user to select the priority level of the ToDo. -->
        <v-select
          label="Select your ToDos priority"
          v-model="priority"
          :items="['High', 'Medium', 'Low']"
        ></v-select>
      </v-card-text>

      <!-- The allDay switch allows the user to indicate whether the ToDo is an all-day event. -->
      <v-switch
        v-model="allDay"
        hide-details
        inset
        label="Ganztags"
        class="ml-7"
      ></v-switch>

      <!-- The Cancel and Create buttons are aligned to the right of the dialog box. -->
      <v-divider class="mt-12"></v-divider>
      <v-card-actions>
        <v-btn @click="dialog = false" text> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="submit"> Create </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
import picker from "./picker";

export default {
  name: "createToDo",
  // Register the 'picker' component
  components: {
    picker,
  },
  data: () => ({
    toDo: {},
    errorMessages: "",
    name: null,
    note: null,
    module: null,
    dialog: false,
    date: null,
    startDate: null,
    startTime: "00:00",
    startTimeMenu: false,
    startDateMenu: false,
    endDateMenu: false,
    endTimeMenu: false,
    endDate: null,
    endTime: "00:00",
    allDay: false,
    priority: null,
  }),
  // Define component props
  props: {
    toDos: [], // An array of existing ToDo objects
  },

  // Define computed properties
  computed: {
    // The form property returns an object containing the form data
    form() {
      return {
        name: this.name,
        note: this.note,
        moduleName: this.module,
        start: this.startDate,
        end: this.endDate,
        priority: this.priority,
        timed: !this.allDay,
      };
    },
  },

  // Define component methods
  methods: {
    // The submit method creates a new ToDo object by calling the 'toDo.createMyToDo' method
    submit() {
      this.toDo = this.form;
      Meteor.call("toDo.createMyToDo", this.toDo);
    },
    // The getDates method sets the startDate, startTime, endDate, and endTime properties based on the given parameters
    getDates(startDate, startTime, endDate, endTime) {
      this.startDate = moment(startDate, "DD.MM.YYYY").format("YYYY-MM-DD");
      this.startDate = this.startDate + "T" + startTime + ":00";
      this.endDate = moment(endDate, "DD.MM.YYYY").format("YYYY-MM-DD");
      this.endDate = this.endDate + "T" + endTime + ":00";
    },
  },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>
