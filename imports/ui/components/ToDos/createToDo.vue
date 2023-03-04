<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        elevation="50"
        class="mt-10"
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
    <v-card ref="form">
      <v-card-title> Erstelle ein ToDo </v-card-title>
      <v-card-text>
        <v-text-field
          ref="name"
          v-model="name"
          :rules="[() => !!name || 'This field is required']"
          :error-messages="errorMessages"
          label="ToDo Name"
          placeholder="Gib deinem ToDo einen Namen"
          required
        ></v-text-field>
        <v-text-field
          ref="note"
          v-model="note"
          :rules="[() => !!note || 'This field is required']"
          :error-messages="errorMessages"
          label="Beschreibung"
          placeholder="Beschreibe dein ToDo"
        ></v-text-field>
        <v-text-field
          ref="module"
          v-model="module"
          :rules="[() => !!module || 'This field is required']"
          :error-messages="errorMessages"
          label="Modul"
          placeholder="Zu welchem Modul soll das ToDo gehören?"
        ></v-text-field>

        <picker @getDates="getDates"></picker>

        <v-switch
          v-model="allDay"
          hide-details
          inset
          label="Ganztags"
        ></v-switch>
      </v-card-text>
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
import dayjs from "dayjs";
import picker from "./picker"
export default {
  name: "createToDo",
  components: {
    picker
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
  }),
  props: {
    toDos: [],
  },

  computed: {
    form() {
      return {
        name: this.name,
        note: this.note,
        moduleName: this.module,
        startDate: this.startDate,
        startTime: this.startTime,
        endDate: this.endDate,
        endTime: this.endTime,
        allDay: this.allDay,
      };
    },
  },
  methods: {
    submit() {
      this.toDo.name = this.form.name;
      this.toDo.note = this.form.note;
      Meteor.call("toDo.createOrUpdate", this.toDo, this.module);
      this.dialog = false;
    },
    onChange(value) {
      console.log(value); // value is a string in 24hr format, e.g. "14:30"
    },
    getDates(startDate, endDate){
      console.log(startDate, endDate)
    }
  },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>
