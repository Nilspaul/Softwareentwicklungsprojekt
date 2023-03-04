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
              label="Select Startdate"
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
              label="Select Enddate"
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
      startTime: null,
      startTimeMenu: false,
      startDateMenu: false,
      endDateMenu: false,
      endTimeMenu: false,
      endDate: null,
      endTime: null,
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
    },
  },
  watch: {
    formattedEndDate: function (newVal, oldVal) {
      if (
        typeof this.formattedEndDate === "string" &&
        typeof this.formattedStartDate === "string" &&
        typeof this.startTime === "string" &&
        typeof this.endTime === "string"
      ) {
        this.$emit(
          "getDates",
          this.formattedStartDate,
          this.startTime,
          this.formattedEndDate,
          this.endTime
        );
      }
    },
    formattedStartDate: function (newVal, oldVal) {
      if (
        typeof this.formattedEndDate === "string" &&
        typeof this.formattedStartDate === "string" &&
        typeof this.startTime === "string" &&
        typeof this.endTime === "string"
      ) {
        this.$emit(
          "getDates",
          this.formattedStartDate,
          this.startTime,
          this.formattedEndDate,
          this.endTime
        );
      }
    },
    startTime: function (newVal, oldVal) {
      if (
        typeof this.formattedEndDate === "string" &&
        typeof this.formattedStartDate === "string" &&
        typeof this.startTime === "string" &&
        typeof this.endTime === "string"
      ) {
        this.$emit(
          "getDates",
          this.formattedStartDate,
          this.startTime,
          this.formattedEndDate,
          this.endTime
        );
      }
    },
    endTime: function (newVal, oldVal) {
      if (
        typeof this.formattedEndDate === "string" &&
        typeof this.formattedStartDate === "string" &&
        typeof this.startTime === "string" &&
        typeof this.endTime === "string"
      ) {
        this.$emit(
          "getDates",
          this.formattedStartDate,
          this.startTime,
          this.formattedEndDate,
          this.endTime
        );
      }
    },
  },
};
</script>
