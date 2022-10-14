<template>
<div>
    <v-system-bar color="secondary" dark>
        <v-spacer></v-spacer>

        <v-icon>mdi-window-minimize</v-icon>

        <v-icon>mdi-window-maximize</v-icon>
        <v-btn icon>
            <v-icon hover>mdi-close</v-icon>
        </v-btn>
    </v-system-bar>
    <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Discover</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-text-field
          append-icon="mdi-microphone"
          class="mx-4"
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
        ></v-text-field>
        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
    </v-toolbar>
</div>
</template>

<script>
export default {
    name: "topBar",
    data: () => ({
        drawer: false,
        group: null,
    }),

    watch: {
        group() {
            this.drawer = false
        }
    },
    methods: {

    },

}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
