<template>
  <v-container class="pa-16 mt-16">
    <v-card>
      <v-card-title> Login </v-card-title>
      <v-card-text ref="loginForm">
        <v-text-field
          ref="email"
          v-model="email"
          autofocus
          :error-messages="errorMessages"
          label="Email-address"
          placeholder="Type in your mail address"
          required
        ></v-text-field>
        <v-text-field
          autofocus
          ref="password"
          type="password"
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
        <v-btn class="full-width" color="secondary" @click="submit">
          Log in
        </v-btn>
      </v-card-actions>
      <registerBase />
    </v-card>
  </v-container>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { router } from "../../plugins";
import registerBase from "../register/registerBase.vue";

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
        } else {
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
</style>
