<template>
<div>
    <v-system-bar color="secondary">
    </v-system-bar>
    <topBar/>
</div>
</template>

<script>
import topBar from '../smallComps/topBar.vue'

export default {
    name: "mainpageBase",
    components: {
    topBar
}
}
</script>

<style>

</style>
