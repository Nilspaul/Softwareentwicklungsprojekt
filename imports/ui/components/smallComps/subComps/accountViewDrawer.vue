<template>
<div>
    <v-container class="fill-height">
        <v-row align="center" justify="center">
            <v-btn outlined color="white" @click.stop="drawer = !drawer">
                <VIcon> mdi-account-badge</VIcon>
            </v-btn>
        </v-row>
    </v-container>
        <v-navigation-drawer
        color="secondary"
        absolute
        height="500px"
        v-model="drawer"
        right
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-account-badge</v-icon>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>Static test</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <settings/>
      </v-navigation-drawer> 
</div>
</template>

<script>
import settings from './settings.vue'
    export default {
    name: "accountViewDrawer",
    components: {settings},
    data: () => ({
        drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
    
    }),
}
</script>

<style>

</style>