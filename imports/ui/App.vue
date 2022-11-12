<template>
    <v-app  :class="[{'appCompMobile pt-5 pr-10' : $vuetify.breakpoint.mobile}, {'appComp' : !$vuetify.breakpoint.mobile}]" >
        <router-view/>
    </v-app>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'
import LoginBase from './components/login/loginBase.vue';
export default {
    components: {
        LoginBase
    },
    data() {
        return {
            user: null,
        };
    },
}
</script>
<style>
body {
    font-family: sans-serif;
    padding: 10px;
}
</style>
