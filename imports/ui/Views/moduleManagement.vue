<!-- The template is written in Vue.js and uses Vuetify, a UI component library for Vue.js -->
<template>
  <div>
    <!-- The following div is used to center align the module management title text -->
    <div class="d-flex justify-center">
      <div
        align-center
        :style="{ color: '#4a5c66' }"
        class="text-h3 font-weight-bold mt-10 mb-8"
      >
        Module Management
      </div>
    </div>
    <!-- The following div is used to wrap the department and study program selection components and the search module text field in a column -->
    <div class="d-flex flex-column flex-wrap">
      <!-- The following div is used to center align the department and study program selection components in a row -->
      <div class="d-flex justify-center">
        <!-- The v-autocomplete component is used to allow the user to select a department from a list of items -->
        <v-sheet width="30em">
          <div class="font-weight-bold secondary--text">Department</div>
          <v-autocomplete
            outlined
            v-model="department"
            :items="departments"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-sheet>
        <!-- The v-autocomplete component is used to allow the user to select a study program from a list of items -->
        <v-sheet class="ml-4" width="30em">
          <div class="font-weight-bold secondary--text">Study programm</div>
          <v-autocomplete
            outlined
            v-model="studyProgram"
            :items="studyPrograms"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-sheet>
      </div>
      <!-- The following div is used to center align the search module text field in a row -->
      <div class="d-flex justify-center">
        <!-- The v-text-field component is used to allow the user to enter search text to find modules -->
        <v-sheet width="61em">
          <div class="font-weight-bold secondary--text">Search module</div>
          <v-text-field outlined v-model="searchInput"></v-text-field>
        </v-sheet>
      </div>
    </div>
    <!-- The following div is used to wrap the module cards in a row -->
    <div class="d-flex flex-wrap justify-center">
      <!-- The v-card component is used to display each module in a card format -->
      <v-card
        v-for="(module, index) in modules"
        height="15em"
        width="30em"
        class="mr-4 mb-4"
      >
        <!-- The v-img component is used to display the module image in the card -->
        <v-img
          @click="changeOverlayVal(index)"
          :src="module.imageUrl"
          height="100%"
          width="100%"
          :lazy-src="module.imageUrl"
        >
          <!-- The v-icon component is used to display a checkmark icon if the user is subscribed to the module -->
          <v-icon
            color="primary"
            class="ma-3"
            style="transform: scale(2)"
            v-if="checkIfSubscribed(module)"
            >mdi-check-circle-outline</v-icon
          >
          <!-- The following div is used to display the module name in the card -->
          <div v-if="!overlay[index]" class="white--text text-h5 modulebar">
            <div class="ml-4">{{ module.name }}</div>
          </div>
        </v-img>
        <!-- Overlay in the card for the enrollment of the module-->
        <v-overlay absolute :value="overlay[index]" class="d-flex align-end">
          <!-- Button for closing overlay -->
          <v-btn
            class="ml-n11 mt-n11"
            absolute
            top-0
            left-0
            style="z-index: 1"
            icon
            @click="changeOverlayVal(index)"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <div class="mb-16">
            <!-- Current course title with an info icon -->
            <div class="d-flex font-weight-bold">
              <div>Aktuelle Themen der Energietechnik (SoSe20)</div>
              <v-icon class="ml-2">mdi-information-outline</v-icon>
            </div>
            <!-- Teacher names -->
            <div class="font-weight-bold">
              <div>Teacher: Schröder, Cathrin</div>
              <div>Teacher: Stetz, Thomas</div>
            </div>
          </div>

          <div class="d-flex">
            <!-- Enrollment key input field -->
            <div v-if="!checkIfSubscribed(module)">
              <v-text-field
                label="Enrollmentkey"
                class="enrollField"
                v-model="enrollmentkey"
                :error-messages="errorMessages"
                outlined
                dense
              ></v-text-field>
            </div>

            <!-- Unsubscribe button -->
            <v-btn
              color="secondary"
              class="text-h6 unsubscribeBtn mb-4"
              v-if="checkIfSubscribed(module)"
              @click="manageSubscription(module)"
            >
              DISENROLL
            </v-btn>

            <!-- Enroll button -->
            <v-btn
              v-else
              color="secondary"
              class="text-h6"
              @click="manageSubscription(module)"
            >
              ENROLL
            </v-btn>
          </div>
        </v-overlay>
      </v-card>
    </div>
  </div>
</template>

<script>
// Importing Modules and SubscribedModules collections from the API directory
import Modules from "../../api/collections/Modules";
import SubscribedModules from "../../api/collections/SubscribedModules";

export default {
  // Name of the component
  name: "moduleManagement",
  // Data properties for the component
  data: () => ({
    modules: [],
    subscribedModules: [],
    absolute: true,
    searchInput: null,
    enrollmentkey: null,
    errorMessages: "",
    overlay: [],
    departments: [
      "FB 01 - BAU - Bauwesen (Gi)",
      "FB 02 - EI - Elektro- und Informationstechnik (Gi)",
      "FB 03 - ME - Maschinenbau und Energietechnik (Gi)",
      "FB 04 - LSE - Life Science Engineering (Gi)",
      "FB 05 - GES - Gesundheit (Gi)",
      "FB 06 - MNI - Mathematik, Naturwissenschaften und Informatik (Gi)",
      "FB 07 - WIRTSCHAFT - THM Business School (Gi)",
      "FB 11 - IEM - Informationstechnik-Elektrotechnik-Mechatronik (Fb)",
      "FB 12 - M - Maschinenbau, Mechatronik, Materialtechnologie (Fb)",
      "FB 13 - MND - Mathematik, Naturwissenschaften und Datenverarbeitung (Fb)",
      "FB 14 - WI - Wirtschaftsingenieurwesen (Fb)",
      "FB 21 - MuK - Management und Kommunikation (Gi,Fb)",
      "ZDH - Wissenschaftliches Zentrum Duales Hochschulstudium, StudiumPlus (Wz)",
    ],
    studyPrograms: [
      "Infos, Workshops, Organisatorisches",
      "Bachelor",
      "Getting Started",
      "Master",
      "Forschungs- und Arbeitsgruppen",
    ],
    studyProgram: null,
    department: null,
  }),
  // Methods for the component
  methods: {
    // Method for managing module subscription
    manageSubscription(module) {
      if (Number(this.enrollmentkey) === module.enrollmentkey) {
        if (!this.checkIfSubscribed(module)) {
          Meteor.call("module.subscribe", module, (err, result) => {
            if (err) {
              console.log(error);
            } else {
              this.sweetAlert();
            }
          });
        } else {
          Meteor.call("module.unsubscribe", module);
        }
      } else {
        this.setErr();
      }
      this.enrollmentkey = "";
    },
    // Method for checking if the user is subscribed to a module
    checkIfSubscribed(module) {
      const isSubscribed = this.subscribedModules.some((obj) => {
        return obj._id === module._id;
      });
      return isSubscribed;
    },
    // Method for changing the overlay value for the module
    changeOverlayVal(index) {
      this.$set(this.overlay, index, !this.overlay[index]);
    },
    // This method filters the modules based on search input, study program, and department
    filterModules() {
      if (this.studyProgram !== null && this.department !== null) {
        this.modules = Modules.find({
          $and: [
            { studyProgram: this.studyProgram },
            { department: this.department },
          ],
        }).fetch();
      } else if (this.studyProgram !== null) {
        this.modules = Modules.find({
          $and: [{ studyProgram: this.studyProgram }],
        }).fetch();
      } else if (this.department !== null) {
        this.modules = Modules.find({
          $and: [{ department: this.department }],
        }).fetch();
      }
      if (this.searchInput !== null) {
        this.modules = Modules.find({
          name: { $regex: this.searchInput, $options: "i" },
        }).fetch();
      }
    },
    // This method sets an error message
    setErr() {
      this.errorMessages = "Überprüfe deine Eingaben";
    },
    // This method displays a success message using SweetAlert
    sweetAlert() {
      this.$swal({
        icon: "success",
        title: "You subscribed the module!",
        text: "Open your navigation to check out more content!",
        showCloseButton: true,
        confirmButtonColor: "#4a5c66",
      });
    },
  },
  created() {
    // This function is called when the component is created
    Tracker.autorun(() => {
      // Subscribes to the "modules" and "subscribedModules" Meteor publications
      const moduleSubscription = Meteor.subscribe("modules");
      const subscribedModulesSubscription =
        Meteor.subscribe("subscribedModules");

      // If the "modules" subscription is ready, fetch the modules from the "Modules" collection
      if (moduleSubscription.ready()) {
        this.modules = Modules.find().fetch();
      }

      // If the "subscribedModules" subscription is ready, fetch the subscribed modules and set the overlay
      if (subscribedModulesSubscription.ready()) {
        this.subscribedModules = SubscribedModules.find().fetch();
        this.overlay = Array(this.modules.length).fill(false);
      }
    });
  },
  watch: {
    // Whenever the searchInput, studyProgram or department properties change, call the filterModules method
    searchInput() {
      this.filterModules();
    },
    studyProgram() {
      this.filterModules();
    },
    department() {
      this.filterModules();
    },
  },
};
</script>
<style scoped>
.modulebar {
  background-color: rgba(128, 128, 128, 0.5);
  position: absolute;
  bottom: 0;
  width: 20em;
  min-height: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.v-overlay .v-btn:hover {
  background-color: #80ba24 !important;
}
.v-overlay .unsubscribeBtn:hover {
  background-color: red !important;
}
.enrollField {
  margin-bottom: -1em;
  margin-right: 1em;
}

.v-overlay {
  z-index: 0 !important;
}
</style>
