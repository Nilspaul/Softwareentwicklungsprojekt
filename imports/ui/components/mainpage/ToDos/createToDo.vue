<template>
<v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
         <v-btn
          color="primary"
          dark
          elevation="50"
          absolute
          middle
          right
          fab
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </template>
    <v-card ref="form">
        <v-card-title>
            Erstelle ein ToDo
        </v-card-title>
        <v-card-text>
            <v-text-field ref="name" v-model="name" :rules="[() => !!name || 'This field is required']" :error-messages="errorMessages" label="ToDo Name" placeholder="Gib deinem ToDo einen Namen" required></v-text-field>
            <v-text-field ref="note" v-model="note" :rules="[() => !!note || 'This field is required']" :error-messages="errorMessages" label="Beschreibung" placeholder="Beschreibe dein ToDo"></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
            <v-btn @click="dialog=false" text>
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit">
                Create
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>

export default {
    name: "createToDo",
    components: {

    },
   
    data: () => ({
        toDo: {},
        errorMessages: '',
        name: null,
        note: null,
        dialog: false,
    }),

    computed: {
        form() {
            return {
                name: this.name,
                note: this.note
            }
        },
    },

    watch: {
        name() {
            this.errorMessages = ''
        },
    },

    methods: {
        submit() {
            this.formHasErrors = false
            this.toDo = this.form;
            Meteor.call('toDo.create', this.toDo);
            this.dialog = false;
        },
    },

}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
