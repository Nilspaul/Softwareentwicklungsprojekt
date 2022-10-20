<template>
<div>
    <v-system-bar color="secondary">
          </v-system-bar>
    <v-app-bar color="primary" dark>
        <v-toolbar-title>Discover</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-text-field
          append-icon="mdi-microphone"
          class="mr-16"
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
        ></v-text-field>
        <AccountViewDrawer/>
    </v-app-bar>
</div>
</template>

<script>

import AccountViewDrawer from './subComps/accountViewDrawer.vue';
export default {
    name: "topBar",
    components : {
    AccountViewDrawer,
},
    data: () => ({
        group: null,
    }),
    methods: {},
}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
