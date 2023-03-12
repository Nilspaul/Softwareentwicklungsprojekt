<template>
  <v-app>
    <div v-if="$route.path !== '/login'">
      <topBar
        @drawNav="handleEvent()"
      ></topBar>
      <navigation ref="sibling2"></navigation>
    </div>
    <div class="inhalt-container">
      <router-view />
    </div>

    <v-footer color="secondary" class="d-flex justify-space-around full-width" style="justify-content: space-between;">
        <div class="ma-2 pa-2 white--text text-h6">
          <div>SOCIALS</div>
          <div class="subline">
            <v-icon v-for="icon in icons"  @click="setRoute(icon.link)" class="mr-1">{{ icon.icon }}</v-icon>
          </div>
        </div>
        <div class="ma-2 pa-2 white--text">
          <div class="text-h6">CAMPUS</div>
          <div class="subline">
            <div class="content" v-for="item in campus" @click="setRoute(item.link)">{{item.name}}</div>
            
            <p class="mt-3 content">Studentenwerk Gießen</p>
          </div>
        </div>
        <div class="ma-2 pa-2 white--text">
          <div class="text-h6">SERVICE</div>
          <div class="subline">
            <div v-for="element in service" class="content" @click="setRoute(element.link)"> {{ element.name }}</div>
            <p class="mt-3 content" @click="setRoute('https://www.thm.de/site/hochschule/campus/aktuelles/thmagazin.html')">THMagazin</p>
          </div>
        </div>
        <div class="ma-2 pa-2 white--text">
          <div class="text-h6">CONTACT</div>
          <div class="subline">
            <div>Technische Hochschule Mittelhessen</div>
            <div>University of Applied Sciences</div>
            <p class="mt-3">Wiesenstraße 14</p>
            <div>D- 35390 Gießen</div>
            <div class="d-flex mt-1 mb-1">
              <v-icon>mdi-phone</v-icon>
              <div class="pt-1 pl-1">+49 641 309-0</div>
            </div>
            <div class="d-flex mt-1 mb-1">
              <v-icon>mdi-fax</v-icon>
              <div class="pt-1 pl-1">+49 641 309-2901</div>
            </div>
            <div class="d-flex mt-1 mb-1">
              <v-icon>mdi-email-outline</v-icon>
              <div class="pt-1 pl-1">info@thm.de</div>
            </div>
          </div>
        </div>
        <div class="footer-bottom d-flex">
        
        </div>

    </v-footer>
  </v-app>
</template>

<script>
import navigation from "./components/topBar/navigation.vue";
import topBar from "./components/topBar/topBar.vue";
export default {
  components: {
    topBar,
    navigation,
  },
  data: () => ({
    user: null,
    icons: [
      {icon: "mdi-facebook", link: "https://www.facebook.com/thm.de"},
      {icon: "mdi-twiter", link: "https://twitter.com/THMittelhessen"},
      {icon: "mdi-youtube", link: "https://www.youtube.com/user/thmittelhessen"},
      {icon: "mdi-linkedin", link: "https://www.linkedin.com/school/technische-hochschule-mittelhessen"},
      {icon: "mdi-instagram", link: "https://www.instagram.com/thmittelhessen/"},
    ],
    service: [
      {name: "THM Dokumente", link:"https://www.thm.de/site/thm-dokumente.html"},
      {name: "THM Jobportal", link:"https://www.thm.de/site/studium/sie-beenden-ihr-studium/career-service/thm-jobportal.html"},
      {name: "THM Kontakt", link:"https://www.thm.de/site/thm-kontakt.html"},
      {name: "THM Meinungsportal", link:"https://www.thm.de/zqe/unsere-aufgaben/meinungsportal"},
      {name: "THM Shop", link:"https://www.thm.de/site/hochschule/service/infocenter-thm/thm-shop.html"}
    ],
    campus: [
      {name: "50 Jahre THM", link:"https://www.thm.de/site/hochschule/profil/50-jahre-thm/portrait-grussworte.html"},
      {name: "Veranstaltungen", link:"https://www.thm.de/site/hochschule/campus/veranstaltungen.html"},
      {name: "Stellenangebote", link:"https://www.thm.de/site/hochschule/campus/stellenangebote-an-der-thm.html"},
      {name: "InfoCenter THM", link:"https://www.thm.de/site/hochschule/service/infocenter-thm.html"},
      {name: "Anfahrt", link:"https://www.thm.de/site/hochschule/campus.html"},
    ]
  }),
  methods: {
    handleEvent() {
      this.$refs.sibling2.handleEventFromParent(true);
    },
    setContent(content) {
      let moduleName;
      if (content.length !== 1) {
        moduleName = content[1];
        this.currentTab = content[0];
      } else {
        moduleName = content[0];
      }
      Meteor.call("module.findModule", moduleName, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          this.currentModule = result;
        }
      });
    },
    setRoute(link) {
      window.open(link, '_blank')
    }
  },
  created() {
   
  },
};
</script>
<style scoped>
body {
  font-family: sans-serif;
}
.v-icon {
  color: white !important;
}
.subline {
  font-size: 12px !important;
  padding-top: 1em !important;
}
.content {
  padding-top: 0.2em !important;
}
.content:hover {
  text-decoration: underline !important;
}
.v-footer {
  width: 100vw !important;
}
.ma-2 {
  align-self: flex-start;
}
.inhalt-container {
  min-height: 100%;
}
.footer-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: #6b7982;
}

</style>

