<template>
    <v-app-bar :class="[{'mobileTopbar pt-5 pr-10' : $vuetify.breakpoint.mobile}, {'topBar pt-5 pr-10' : !$vuetify.breakpoint.mobile}]" color="primary" dark>
        <VIcon class="display-1 pr-5" @click="drawNav()">mdi-menu</VIcon>
        <v-toolbar-title class="display-1" v-show="$vuetify.breakpoint.mdAndUp" >Discover</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-text-field
          append-icon="mdi-microphone"
          flat
          hide-details
          label="Search"
          class="mr-16"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
        ></v-text-field>
        <AccountViewDrawer :user="user"/>
    </v-app-bar>
</template>

<script>

import AccountViewDrawer from './subComps/accountViewDrawer.vue';
export default {
    name: "topBar",
    components : {
    AccountViewDrawer,
},
props: {
    user: Object,
},
    data: () => ({
        group: null,
    }),
    methods: {
        drawNav(){
            this.$emit('drawNav');
        }
    },
}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
