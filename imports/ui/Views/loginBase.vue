<template>
<div>
  <v-container>
    <v-card :class="['mt-16', {'loginContainer' : $vuetify.breakpoint.mobile}]">
      <v-card-title> Login </v-card-title>
      <v-card-text ref="loginForm">
        <v-text-field
          ref="email"
          v-model="email"
          autofocus 
          @keyup.enter="submit()"
          :error-messages="errorMessages"
          label="Email-address"
          placeholder="Type in your mail address"
          required
        ></v-text-field>
        <v-text-field
          autofocus
          ref="password"
          type="password"
          @keyup.enter="submit()"
          v-model="password"
          :error-messages="errorMessages"
          label="Password"
          placeholder="Type in your password"
          required
        ></v-text-field>
      </v-card-text>
      <v-divider class="mt-12"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="full-width" color="secondary" @click="submit()">
          Log in
        </v-btn>
      </v-card-actions>
      <registerBase />
    </v-card>
  </v-container>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { router } from "../plugins/router";
import registerBase from "../Views/registerBase.vue";

export default {
  name: "loginBase",
  components: {
    registerBase,
  },
  data: () => ({
    errorMessages: "",
    userLoggedIn: null,
    email: null,
    password: null,
    user: {
      email: null,
      password: null,
      username: null,
    },
  }),

  methods: {
    submit() {
      Meteor.loginWithPassword(this.email, this.password, (error, result) => {
        if (error) {
          this.setErr(error);
        } else if(Meteor.user()){
          router.push({
            path: "/mainpage",
          });
        }
      });
    },
    setErr() {
      this.errorMessages = "Überprüfe deine Eingaben";
    },
  },
};
</script>

<style scoped>
p {
  font-family: serif;
}
.loginContainer{
  height: 50vh!important;
}

.ingDiv{
  margin-top:10vh;
  max-height: 10vh!important;
  max-width: 10vw!important;
}


</style>
