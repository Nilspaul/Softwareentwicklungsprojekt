<template>
  <div>
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
          <v-time-picker v-model="startTime" format="24hr" full-width></v-time-picker>
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
          <v-time-picker v-model="endTime" format="24hr"></v-time-picker>
        </v-menu>
      </v-col>
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
    emitDates(newVal, oldVal) {
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
  watch: {
    formattedEndDate: this.emitDates,
    formattedStartDate: this.emitDates,
    startTime: this.emitDates,
    endTime: this.emitDates,
  },
};
</script>

<style scoped></style>
