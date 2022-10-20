<template>
    <div>
        <tabs></tabs>
        <imgSlider/>
    </div>
</template>

<script>
import imgSlider from './imgSlider'
import tabs from './tabs'
export default {
    name: "mainContent",
    components:{
        imgSlider,
        tabs
    }
}
</script>