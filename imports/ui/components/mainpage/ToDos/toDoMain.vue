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
          <VDataTable
              :headers="headers"
              :items="myToDos"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="_id"
              show-expand
              class="font-weight-black"
              :footer-props="{
                itemsPerPageText: $vuetify.breakpoint.smAndUp ? 'Zeilen pro Seite' : 'Zeilen',
                itemsPerPageAllText: 'Alle'
              }"
          >
            <template v-slot:top>
              <VToolbar flat color="white">
                <VToolbarTitle>Meine ToDos</VToolbarTitle>
                <VSpacer/>
                <create-to-do :toDos="myToDos"></create-to-do>
              </VToolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <VDataTable
                    :headers="subHeaders"
                    :items="item.toDos"
                    show-select
                    single-select
                    @input="done=true"
                    :class="[{'text-decoration-line-through' : done}, 'font-weight-light']"
                    item-key="name"
                    :footer-props="{
                      itemsPerPageText: $vuetify.breakpoint.smAndUp ? 'Zeilen pro Seite' : 'Zeilen',
                      itemsPerPageAllText: 'Alle'
                    }"
                >
                </VDataTable>
              </td>
            </template>
          </VDataTable>
        </v-card>
      </template>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import createToDo from "./createToDo.vue";
import ToDos from "../../../../api/collections/ToDos.js";
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
      done: null,
      goupedToDos: [],
      selected: [{}],
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
    showSelected() {
      console.log(this.selected);
    },
    setMainpage() {
      router.push({
        path: "/mainpage",
      });
    },
  },
  mounted() {
    console.log(this.myToDos)
  },
  created() {
    Tracker.autorun(() => {
      this.myToDos = ToDos.find().fetch();
    });
  },
};
</script>

<style scoped>
</style>
