<template>
<div>
<v-toolbar color="primary" >

</v-toolbar>
  <v-card class="mt-13">

    <VDataTable
      :headers="headers"
      :items="myToDos"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="_id"
      show-expand
      class="font-weight-black"
    >
      <template v-slot:top>
        <VToolbar flat color="white">
          <VToolbarTitle>My Todos</VToolbarTitle>
          <VSpacer />
        </VToolbar>
      </template>
      <template>
        <span>Static Time</span>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <VDataTable
            :headers="subHeaders"
            :items="myToDos"
            v-model="selected"
            show-select
            @input="showSelected"
            item-key="name"
            :footer-props="{
              itemsPerPageText: $vuetify.breakpoint.smAndUp
                ? 'Zeilen pro Seite'
                : 'Zeilen',
              itemsPerPageAllText: 'Alle',
            }"
          >
            <template>
              <span> Static Time</span>
            </template>
          </VDataTable>
        </td>
      </template>
    </VDataTable>
    <createToDo></createToDo>
  </v-card>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import createToDo from "./createToDo.vue";
import ToDos from "../../../../api/collections/ToDos.js";
export default {
  name: "toDoMain",
  components: {
    createToDo,
  },

  data() {
    return {
      expanded: [],
      singleExpand: false,
      myToDos: [],
      selected: [{}],
      headers: [
        {
          text: "Modul",
          align: "left",
          sortable: false,
          value: "moduleName",
        },
        {
          text: "text1",
          value: "text1",
        },
        {
          text: "",
          value: "data-table-expand",
        },
      ],
      subHeaders: [
        {
          text: "Name ToDo",
          value: "name",
        },
        {
          text: "Fällig am",
          value: "dueTo",
        },
      ],
    };
  },
  methods: {
    showSelected(){
      console.log(this.selected);
    }
  },
  created() {
    Tracker.autorun(() => {
      this.myToDos = ToDos.find().fetch();
    });
  },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>
