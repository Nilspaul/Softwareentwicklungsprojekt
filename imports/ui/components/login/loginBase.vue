<template>
  <v-container class="pa-16 mt-16">
    <v-card>
      <v-card-title> Login </v-card-title>
      <v-card-text ref="loginForm">
        <v-text-field
          ref="email"
          v-model="email"
          :rules="[() => !!email || 'This field is required']"
          :error-messages="errorMessages"
          label="Email-address"
          placeholder="Type in your mail address"
          required
        ></v-text-field>
        <v-text-field
          ref="password"
          type="password"
          v-model="password"
          :rules="[() => !!password || 'This field is required']"
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
import { VueMeteor } from "vue-meteor-tracker";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { router } from "../../plugins";
import registerBase from "../register/registerBase.vue";

export default {
  name: "loginBase",
  components: {
    registerBase,
  },
  data: () => ({
    errorMessages: "",
    username: null,
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
      this.user.email = this.email;
      this.user.password = this.password;
      Tracker.autorun(() => {
        this.user = Meteor.user();
      });
      Meteor.loginWithPassword(this.email, this.password);
      router.push({
        path: "/mainpage",
      });
    },
  },
};
</script>

<style scoped>
p {
  font-family: serif;
}
</style>
