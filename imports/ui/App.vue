<template>
<div>
    <v-app>
        <topBar/>
        <loginBase />
    </v-app>
</div>
</template>

<script>
import loginBase from './components/login/loginBase.vue'
import topBar from './components/login/smallComps/topBar.vue'
export default {
    components: {
        loginBase,
        topBar,
    },
}
</script>

<style>
body {
    font-family: sans-serif;
    padding: 10px;
}
</style>
