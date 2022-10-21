<template>
<div>
    <v-app>
        <router-view/>
    </v-app>
</div>
</template>

<script>
export default {
    mounted(){
        console.log(Meteor.user())
    }

}
</script>
<style>
body {
    font-family: sans-serif;
    padding: 10px;
}
</style>
