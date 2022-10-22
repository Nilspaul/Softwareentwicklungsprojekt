<template>
<div>
    <v-app>
        <router-view/>
    </v-app>
</div>
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
