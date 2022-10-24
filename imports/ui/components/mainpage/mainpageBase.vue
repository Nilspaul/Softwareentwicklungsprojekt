<template>
<v-card class="full-width full-height">
    <div v-if="user">
        <mainContent :user="user"></mainContent>
    </div>
</v-card>
</template>

<script>
import mainContent from './subComps/mainContent'
import {
    Meteor
} from 'meteor/meteor'
import {
    Tracker
} from 'meteor/tracker'
export default {
    name: "mainpageBase",
    components: {
        mainContent,
    },
    created() {
        Tracker.autorun(() => {
            this.user = Meteor.user();
            if (this.user !== undefined) {
                this.$forceUpdate();
            }
        })
    },
}
</script>

<style>

</style>
