<template>
<div>
    <v-app>
        <router-view/>
    </v-app>
</div>
</template>

<script>
import loginBase from './components/login/loginBase.vue'
export default {
    components: {
        loginBase,
     
    },
}
</script>

<style>
body {
    font-family: sans-serif;
    padding: 10px;
}
</style>
