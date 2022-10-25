<template>
        <v-card>
          <VDataTable
              :headers="headers"
              :items="contactFileImports"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="_id"
              show-expand
              class="font-weight-black"
          >
            <template v-slot:top>
              <VToolbar flat color="white">
                <VToolbarTitle>My Todos</VToolbarTitle>
                <VSpacer/>
              </VToolbar>
            </template>
            <template>
              <span>Static Time</span>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <VDataTable
                    :headers="subHeaders"
                    :items="item.contacts"
                    show-select
                    item-key="name"
                    class="font-weight-light"
                    :footer-props="{
                      itemsPerPageText: $vuetify.breakpoint.smAndUp ? 'Zeilen pro Seite' : 'Zeilen',
                      itemsPerPageAllText: 'Alle'
                    }"
                >
                  <template >
                    <span> Static Time</span>
                  </template>
                </VDataTable>
              </td>
            </template>
          </VDataTable>
        </v-card>
</template>

<script>

export default {
    name: "toDoMain",
    components: {

    },
   
    data() {
    return {
      expanded: [],
      singleExpand: false,
      contactFileImports: [{}],
      headers: [{
        text: 'Modul',
        align: 'left',
        sortable: false,
        value: 'Modulname',
      },
        {
          text: 'text1',
          value: 'text1'
        },
        {
          text: '',
          value: 'data-table-expand'
        },
      ],
      subHeaders: [{
        text: "Name ToDo",
        value: 'name'
      },
        {
          text: "Fällig am",
          value: 'dueTo'
        }]
    }
  },

    

    methods: {
        
    },

}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
