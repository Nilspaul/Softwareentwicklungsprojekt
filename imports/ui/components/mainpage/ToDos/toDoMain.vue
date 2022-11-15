<template>
  <div>
    <VToolbar dark color="primary">
      <v-btn icon @click="setMainpage()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Back to the mainpage</v-toolbar-title>
    </VToolbar>
    <template>
      <v-card>
        <v-container fluid>
          <v-row justify="center">
            <h1>Meine Todos</h1>
            <v-expansion-panels popout>
              <v-expansion-panel v-for="toDo in myToDos" hide-actions>
                <v-expansion-panel-header
                  class="white--text"
                  color="secondary"
                  icon-color="white"
                >
                  <template v-slot:actions>
                    <v-icon color="white"> $expand </v-icon>
                  </template>
                  <v-row align="center" class="spacer" no-gutters>
                    <v-col class="text-no-wrap" cols="5" sm="3">
                      <strong dark>{{ toDo.moduleName }}</strong>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <VDataTable
                    :headers="subHeaders"
                    show-select
                    :items="toDo.toDos"
                    @input="completeToDo"
                    v-model="selected"
                    item-key="name"
                    :item-class="isCompleted"
                    :hide-default-footer="true"
                    :footer-props="{
                      itemsPerPageText: $vuetify.breakpoint.smAndUp
                        ? 'Zeilen pro Seite'
                        : 'Zeilen',
                      itemsPerPageAllText: 'Alle',
                    }"
                  >
                  </VDataTable>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-card>
    </template>
    <createToDo></createToDo>
  </div>
</template>

<script>
import createToDo from "./createToDo.vue";
import ToDos from "../../../../api/collections/ToDos.js";
import Modules from "../../../../api/collections/Modules";
import { router } from "../../../plugins/router";

export default {
  name: "toDoMain",
  components: {
    createToDo,
  },

  data() {
    return {
      expanded: [],
      groupedModules: null,
      singleExpand: false,
      myToDos: [],
      modules: [],
      done: null,
      goupedToDos: [],
      selected: [{}],
      selectedRows: [],

      headers: [
        {
          text: "Modul",
          align: "left",
          sortable: false,
          value: "moduleName",
        },
      ],
      subHeaders: [
        {
          text: "Name ToDo",
          value: "name",
        },
        {
          text: "Beschreibung",
          value: "note",
        },
        {
          text: "Fällig am",
          value: "dueTo",
        },
      ],
    };
  },
  methods: {
    completeToDo() {
      this.selected.forEach((toDo) => {
       
          toDo.completed = true;
        
      });
    },
    isCompleted(item) {
      if (item.completed == true) {
        return "text-decoration-line-through text--disabled";
      }
    },

    setMainpage() {
      router.push({
        path: "/mainpage",
      });
    },
  },
  mounted() {
    console.log(this.myToDos);
  },
  created() {
    Tracker.autorun(() => {
      this.myToDos = ToDos.find().fetch();
      this.modules = Modules.find().fetch();
    });
  },
};
</script>

<style scoped></style>
