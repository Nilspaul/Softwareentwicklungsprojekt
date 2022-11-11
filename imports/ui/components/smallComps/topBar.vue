<template>
<div>
    <v-system-bar color="secondary">
          </v-system-bar>
    <v-app-bar :class="[{'mobileTopbar pt-5 pr-10' : $vuetify.breakpoint.mobile}]" color="primary" dark>
        <VIcon :class="[{ 'display-2': $vuetify.breakpoint.mobile}]" @click="drawNav()">mdi-menu</VIcon>
        <v-toolbar-title :class="['ml-5',{'display-1' : $vuetify.breakpoint.mobile}]">Discover</v-toolbar-title>
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
</div>
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
