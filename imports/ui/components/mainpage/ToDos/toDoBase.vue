<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="primary">mdi-book-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-on="on" @click="toToDo()"> Manage my Todos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-dialog>
</template>

<script>
import {router} from "../../../plugins/router"
export default {
  name: "toDoBase",
  data: () => ({
    dialog: null,
  }),
  methods: {
      toToDo(){
        router.push({
        path: "/toDo",
      });
      }
  },
};
</script>
