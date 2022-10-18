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
        height="500px"
        v-model="drawer"
        absolute
        temporary
        right
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
  
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
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
      </v-navigation-drawer> 
</div>
</template>

<script>
    export default {
    name: "accountViewDrawer",

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