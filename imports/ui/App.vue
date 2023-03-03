<template>
  <v-app>
    <div class="inhalt-container">
      <router-view />
    </div>

    <v-footer color="secondary">
      <div class="d-flex justify-space-around full-width">
        <div class="ma-2 pa-2 white--text text-h6">
          <div>SOCIALS</div>
          <div class="subline">
            <v-icon>mdi-facebook</v-icon>
            <v-icon>mdi-twitter</v-icon>
            <v-icon>mdi-youtube</v-icon>
            <v-icon>mdi-linkedin</v-icon>
            <v-icon>mdi-instagram</v-icon>
          </div>
        </div>
        <div class="ma-2 pa-2 white--text">
          <div class="text-h6">CAMPUS</div>
          <div class="subline">
            <div class="content">50 Jahre THM</div>
            <div class="content">Veranstaltungen</div>
            <div class="content">Stellenangebote</div>
            <div class="content">InfoCenter THM</div>
            <div class="content">Anfahrt</div>
            <p class="mt-3 content">Studentenwerk Gießen</p>
          </div>
        </div>
        <div class="ma-2 pa-2 white--text">
          <div class="text-h6">SERVICE</div>
          <div class="subline">
            <div class="content">THM Dokumente</div>
            <div class="content">THM Jobportal</div>
            <div class="content">THM Kontakt</div>
            <div class="content">THM Meinungsportal</div>
            <div class="content">THM Shop</div>
            <p class="mt-3 content">THMagazin</p>
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
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {};
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
.inhalt-container {
  min-height: 85%;
}
</style>
