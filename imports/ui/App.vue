<template>
<div>
    <v-app>
        <LoginBase></LoginBase>
        <router-view v-if="user"/>
    </v-app>
</div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
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
    created() {
        this.user = Meteor.user();
        console.log(this.user)
    },
    components: { LoginBase }
}
</script>
<style>
body {
    font-family: sans-serif;
    padding: 10px;
}
</style>
