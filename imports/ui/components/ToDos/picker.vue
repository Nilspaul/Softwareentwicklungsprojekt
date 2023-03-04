<template>
  <div class="ml-4">
    <v-row>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md4>
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
              label="Picker without buttons"
              readonly
              v-on="on"
              class="mt-4"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="startDate"
            @input="updateFormattedDate(startDate, true)"
            format="dd.MM.yyyy"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <v-col cols="12" sm="6" md="4">
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
            @change="onChange"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md4>
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
              label="Picker without buttons"
              readonly
              v-on="on"
              class="mt-4"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            @input="updateFormattedDate(endDate, false)"
            format="dd.MM.yyyy"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <v-col cols="12" sm="6" md="4">
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
              label="Select Starttime"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="endTime"
            format="24hr"
            full-width
            @change="onChange"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formattedEndDate: null,
      formattedStartDate: null,
      startDate: null,
      startTime: "00:00",
      startTimeMenu: false,
      startDateMenu: false,
      endDateMenu: false,
      endTimeMenu: false,
      endDate: null,
      endTime: "00:00",
    };
  },
  methods: {
    updateFormattedDate(datePicked, isStartDate) {
  const date = new Date(datePicked);
  this.startDateMenu = false; // close the menu after selecting a date
  const formattedDate = date.toLocaleDateString("de", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  if (isStartDate) {
    this.formattedStartDate = formattedDate;
  } else {
    this.formattedEndDate = formattedDate;
  }

 if(typeof this.formattedEndDate === 'string' && typeof this.formattedStartDate === 'string'){
  this.$emit('getDates', this.formattedStartDate, this.formattedEndDate )
 }
},

    onChange(value) {
      console.log(value); // value is a string in 24hr format, e.g. "14:30"
    },
  },
};
</script>
