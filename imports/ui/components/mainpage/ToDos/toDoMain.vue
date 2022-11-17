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
                    @item-selected="completeToDo"
                    @toggle-select-all="completeAll"
                    v-model="selected"
                    :sort-by="toDoStatus"
                    item-key="name"
                    :hide-default-footer="true"
                    :footer-props="{
                      itemsPerPageText: $vuetify.breakpoint.smAndUp
                        ? 'Zeilen pro Seite'
                        : 'Zeilen',
                      itemsPerPageAllText: 'Alle',
                    }"
                  >
                    <template v-slot:item.name="{ item }">
                      <td
                        :class="{
                          'text-decoration-line-through text--disabled':
                            item.completed,
                        }"
                      >
                        {{ item.name }}
                      </td>
                    </template>
                    <template v-slot:item.note="{ item }">
                      <div
                        :class="{
                          'text-decoration-line-through text--disabled':
                            item.completed,
                        }"
                      >
                        {{ item.note }}
                      </div>
                    </template>
                    <template v-slot:item.icon="{ item }">
                      <v-btn v-if="item.completed" icon @click="deleteToDo(item)">
                        <v-icon color="red"
                          >mdi-trash-can</v-icon
                        >
                      </v-btn>
                      <v-btn v-else icon @click="editToDo(item)">
                        <v-icon>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:item.dueTo="{ item }">
                      <div
                        v-if="item.dueTo !== undefined"
                        :class="{
                          'text-decoration-line-through text--disabled':
                            item.completed,
                        }"
                      >
                        {{ item.dueTo }}
                      </div>
                      <v-dialog
                        v-else
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Picker in dialog"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable class="datePicker">
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="modal=false; setDate(item)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </template>
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
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      toDoStatus: "completed",
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
          sortable: true,
        },
        {
          text: "Beschreibung",
          value: "note",
        },
        {
          text: "Fällig am",
          value: "dueTo",
          sortable: true,
        },
        {
          text: "",
          value: "icon",
        },
      ],
    };
  },
  methods: {
    completeToDo(item) {
      item.item.completed = item.value;
    },
    completeAll(items) {
      items.items.forEach((toDo) => {
        toDo.completed = items.value;
      });
    },
    setDate(toDo){
      toDo.dueTo = this.date;
      console.log(this.date)
    },
    editToDo(toDo){
      toDo.dueTo = undefined;
      
    },
    deleteToDo(toDo) {
      Meteor.call("toDo.delete", toDo);
    },
    setMainpage() {
      router.push({
        path: "/mainpage",
      });
    },
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
