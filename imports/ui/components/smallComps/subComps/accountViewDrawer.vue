<template>
<div>
      <v-row
        justify="center"
      >
        <v-menu
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              outline
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
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
          <settings></settings>
        </v-list>

          </v-list>
        </v-menu>
        </v-dialog>
      </v-row>
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