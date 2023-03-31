<template>
  <div v-if="currentModule">
    <!-- Displays current module name if it exists -->
    <v-subheader class="tabSubheader text-h5">{{
      currentModule ? currentModule.name : ""
    }}</v-subheader>
    <div>
      <v-sheet class="mt-10 ml-5 secondary--text">
        <!-- Displays announcements for the current module -->
        <p class="text-h4">Ankündigungen</p>
        <div
          class="d-flex justify-space-between flex-wrap"
          v-for="ann in currentModule.ankündigungen"
        >
          <div v-html="ann.text" :class="[{ anntext: ann.image }]"></div>
          <!-- Displays image associated with announcement, if it exists -->
          <div class="d-flex align-center flex-wrap" v-if="ann.image">
            <v-img
              :aspect-ratio="16 / 9"
              width="500"
              :src="ann.image"
              class="annimg"
            ></v-img>
          </div>
        </div>
      </v-sheet>
      <div class="d-flex justify-end">
        <v-sheet class="mr-6 pa-2 secondary--text">
          <!-- Displays list of learning platforms for the current module -->
          <p class="text-h5 font-weight-bold">Lernplattformen</p>
          <p
            v-for="ann in currentModule.lernplattformen"
            v-html="ann"
            class="lp"
          ></p>
        </v-sheet>
      </div>
      <div class="d-flex justify-start">
        <!-- Displays section header for module content -->
        <p class="text-h4 ml-5 secondary--text">Studieninhalte</p>
      </div>
    </div>

    <!-- Loops through module chapters and displays their content -->
    <v-row
      v-for="(item, index) in currentModule.modulKapitel"
      class="d-flex flex-column ml-5 mb-5 contentSection"
    >
      <v-sheet
        rounded="xl"
        :class="index % 2 === 0 ? 'moduleSheet' : 'moduleSheetDark'"
      >
        <v-row>
          <!-- Displays chapter image on left or right depending on index -->
          <v-col cols="12" md="6" :order="index % 2 === 0 ? 1 : 2">
            <div :class="index % 2 === 0 ? 'ml-12 mt-4' : 'mr-12 mt-4'">
              <v-img
                :src="item.imageLink"
                alt=""
                height="400"
                contain
                class="rotate-x-2 rotate-y-11 rotate--2"
              ></v-img>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            :order="index % 2 === 0 ? 2 : 1"
            class="d-flex flex-column align-center justify-center"
          >
            <div
              :class="
                index % 2 === 0
                  ? 'd-flex justify-start secondary--text'
                  : 'd-flex justify-end white--text'
              "
            >
              <div class="mt-5 d-flex">
                <div>
                  <!-- Displays chapter name and its content -->
                  <p class="text-h5 content">{{ item.kapitelName }}</p>
                  <v-row>
                    <v-expansion-panels
                      flat
                      popout
                      class="moduleContent ml-16 pl-16 mb-6 mt-2"
                    >
                      <!-- Loop through each module in 'item.kapitelInhalte' array -->
                      <v-expansion-panel
                        v-for="(module, indexModule) in item.kapitelInhalte"
                        hide-actions
                      >
                        <!-- Expansion panel header -->
                        <v-expansion-panel-header
                          :class="
                            index % 2 === 0 ? 'secondary--text' : 'white--text'
                          "
                          icon-color="secondary"
                          :color="index % 2 === 0 ? '#dfe5e6 ' : '#4a5c66'"
                        >
                          <!-- Icon to expand/collapse the panel -->
                          <template v-slot:actions>
                            <v-icon
                              :color="index % 2 === 0 ? 'secondary' : 'white'"
                            >
                              $expand
                            </v-icon>
                          </template>
                          <!-- Module name displayed in the header -->
                          <strong dark>{{
                            indexModule + " - " + module.name
                          }}</strong>
                        </v-expansion-panel-header>
                        <!-- Divider line between the header and content -->
                        <v-divider
                          :color="index % 2 === 0 ? 'grey' : 'white'"
                        ></v-divider>
                        <!-- Expansion panel content -->
                        <v-expansion-panel-content
                          :color="index % 2 === 0 ? '#dfe5e6 ' : '#4a5c66'"
                        >
                          <!-- Module content displayed in the panel -->
                          <v-card-text
                            :class="
                              index % 2 === 0
                                ? 'secondary--text'
                                : 'white--text'
                            "
                            v-text="module.inhalt"
                          ></v-card-text>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-row>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-row> 
    <!-- Loop over an array of objects to render the bottom content of a current module -->
    <div v-for="content in currentModule.bottomContent">
      <v-sheet class="mt-10 ml-5 secondary--text">
        <p class="text-h4">{{ content.name }}</p>
        <div class="d-flex justify-space-between flex-wrap">          
          <!-- Render the content text with HTML interpretation for json htmltag usage-->
          <p v-html="content.text"></p>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import topBar from "../components/topBar/topBar.vue";
import toDoBase from "../components/ToDos/toDoBase.vue";
import Navigation from "../components/topBar/navigation.vue";
import { mapState } from "vuex";
export default {
  name: "moduleContent",
  components: {
    topBar,
    toDoBase,
    Navigation,
  },
  methods: {
    // Take a string as input and return a decoded version of it by using decodeURIComponent
    unescape(string) {
      return decodeURIComponent(string);
    },
  },
  // Using mapState from Vuex to create a computed property currentModule that returns the currentModule state from the store.
  computed: {
    ...mapState({
      currentModule: (state) => state.currentModule,
    }),
  },
};
</script>

<style scoped>
.content {
  margin-left: 5em;
  margin-right: 10em;
}
.anntext {
  width: 50vw !important;
  margin-right: 3em !important;
}

.annimg {
  margin-top: -3em;
  margin-right: 4em;
}

.lp {
  max-width: 40vw !important;
}
.moduleSheet {
  width: 95vw !important;
  background-color: #dfe5e6 !important;
  padding-bottom: 1em !important;
}

.moduleSheetDark {
  width: 95vw !important;
  background-color: #4a5c66 !important;
  padding-bottom: 1em !important;
}
</style>
