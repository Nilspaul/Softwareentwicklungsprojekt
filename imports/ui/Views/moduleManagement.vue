<template>
  <div>
    <div class="d-flex justify-center">
      <div
        align-center
        :style="{ color: '#4a5c66' }"
        class="text-h3 font-weight-bold mt-10"
      >
        Module Management
      </div>
    </div>
    <div class="d-flex flex-column flex-wrap">
      <div class="d-flex justify-center">
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
      <div class="d-flex justify-center">
        <v-sheet width="61em">
          <div class="font-weight-bold secondary--text">Search module</div>
          <v-text-field outlined v-model="searchInput"></v-text-field>
        </v-sheet>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-center">
      <v-card
        v-for="(module, index) in modules"
        height="15em"
        width="30em"
        class="mr-4 mb-4"
      >
        <v-img
          @click="changeOverlayVal(index)"
          :src="module.imageUrl"
          height="100%"
          width="100%"
          :lazy-src="module.imageUrl"
        >
          <v-icon
            color="primary"
            class="ma-3"
            style="transform: scale(2)"
            v-if="checkIfSubscribed(module)"
            >mdi-check-circle-outline</v-icon
          >
          <div v-if="!overlay[index]" class="white--text text-h5 modulebar">
            <div class="ml-4">{{ module.name }}</div>
          </div>
        </v-img>
        <v-overlay absolute :value="overlay[index]" class="d-flex align-end">
          <div class="mb-16">
            <div class="d-flex font-weight-bold">
              <div>Aktuelle Themen der Energietechnik (SoSe20)</div>
              <v-icon class="ml-2">mdi-information-outline</v-icon>
            </div>
            <div class="font-weight-bold">
              <div>Teacher: Schröder, Cathrin</div>
              <div>Teacher: Stetz, Thomas</div>
            </div>
          </div>

          <div class="d-flex">
            <div v-if="!checkIfSubscribed(module)">
              <v-text-field
                label="Enrollmentkey"
                class="enrollField"
                outlined
                dense
              ></v-text-field>
            </div>
            <v-btn
              color="secondary"
              class="text-h6 unsubscribeBtn mb-4"
              v-if="checkIfSubscribed(module)"
              @click="manageSubscription(module)"
            >
              DISENROLL
            </v-btn>
            <v-btn
              v-else
              color="secondary"
              class="text-h6"
              @click="manageSubscription(module)"
            >
              ENROLL</v-btn
            >
          </div>
        </v-overlay>
      </v-card>
    </div>
  </div>
</template>

<script>
import Modules from "../../api/collections/Modules";
import SubscribedModules from "../../api/collections/SubscribedModules";
export default {
  name: "moduleManagement",
  data: () => ({
    modules: [],
    subscribedModules: [],
    absolute: true,
    searchInput: null,
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
  methods: {
    manageSubscription(module) {
      if (!this.checkIfSubscribed(module)) {
        Meteor.call("module.subscribe", module);
      } else {
        Meteor.call("module.unsubscribe", module);
      }
    },
    checkIfSubscribed(module) {
      const isSubscribed = this.subscribedModules.some((obj) => {
        return obj._id === module._id;
      });
      return isSubscribed;
    },
    changeOverlayVal(index) {
      this.$set(this.overlay, index, !this.overlay[index]);
    },
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
  },
  created() {
    Tracker.autorun(() => {
      const moduleSubscription = Meteor.subscribe("modules");
      const subscribedModulesSubscription =
        Meteor.subscribe("subscribedModules");
      if (moduleSubscription.ready()) {
        this.modules = Modules.find().fetch();
      }
      if (subscribedModulesSubscription.ready()) {
        this.subscribedModules = SubscribedModules.find().fetch();
        this.overlay = Array(this.modules.length).fill(false);
      }
    });
  },
  watch: {
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
</style>
