<template>
<v-card class="full-width full-height">
    <topBar/>
    <mainContent/>
</v-card>
</template>

<script>
import topBar from '../smallComps/topBar.vue'
import mainContent from './subComps/mainContent'
export default {
    name: "mainpageBase",
    components: {
    topBar,
    mainContent
}
}
</script>

<style>

</style>
