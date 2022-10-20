<template>
<div>
    <topBar/>
    <mainContent/>
</div>
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
