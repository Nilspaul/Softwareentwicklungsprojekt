<template>
  <v-card class="ma-10">
    <!-- A div containing a Vuetify sheet with a card title. -->
    <div class="d-flex justify-center bg-surface-variant">
      <v-sheet class="ma-2 pa-2">
        <v-card-title
          align-center
          :style="{ color: '#4a5c66' }"
          class="text-h4"
        >
          Reset your password
        </v-card-title>
      </v-sheet>
    </div>
    <!-- A Vuetify sheet containing two Vuetify sheets with text fields for password and confirm password. -->
    <v-sheet class="d-flex bg-surface-variant flex-wrap">
      <v-sheet class="me-auto flex-grow-1 pa-2">
        <p bold>Password</p>
        <v-text-field
          outlined
          ref="password"
          v-model="password"
          required
          placeholder="Gib dein Passwort ein"
        ></v-text-field>
      </v-sheet>
      <v-sheet class="me-auto flex-grow-1 ml-4 pa-2"
        ><p bold>Confirm Passord</p>
        <v-text-field
          outlined
          required
          ref="confirmPassword"
          v-model="confirmPassword"
          placeholder="Confirm your password"
        ></v-text-field>
      </v-sheet>
    </v-sheet>
    <!-- A Vuetify divider. -->
    <v-divider class="mt-12"></v-divider>
    <!-- A div containing a Vuetify sheet with a hoverable button to submit the form. -->
    <div class="d-flex justify-center bg-surface-variant">
      <v-sheet class="ma-2 pa-2">
        <v-hover v-slot="{ hover }">
          <v-btn
            class="white--text biggerButton"
            elevation="2"
            :style="{
              'background-color': hover ? ' #80ba24' : '#4a5c66',
            }"
            @click="submit()"
          >
            Reset password
          </v-btn>
        </v-hover>
      </v-sheet>
    </div>
  </v-card>
</template>

<script>
// Importing the Accounts module from Meteor for password reset functionality
import { Accounts } from "meteor/accounts-base";

export default {
  // Name of the Vue component
  name: "resetPassword",

  // Initializing the data properties
  data: () => ({
    password: null,
    confirmPassword: "",
    error: "",
  }),

  // Using a watcher to reset error message when the component is loaded
  watch: {
    name() {
      this.errorMessages = "";
    },
  },

  // Defining the methods to be used in the component
  methods: {
    // Submit method to handle the password reset functionality
    submit() {
      // Checking if password and confirm password fields are not empty
      if (this.password === "" || this.confirmPassword === "") {
        this.error = "Please enter a new password and confirm it.";
      } else if (this.password !== this.confirmPassword) {
        // Checking if password and confirm password fields match
        this.error = "The passwords do not match. Please try again.";
      } else {
        // Calling the Meteor Accounts resetPassword method to reset the password
        Accounts.resetPassword(
          this.$route.params.token,
          this.password,
          (error) => {
            if (error) {
              // Displaying the error message in case of any errors
              this.error = error.reason;
            } else {
              // Redirecting to the login page in case of successful password reset
              this.$router.push("/login");
            }
          }
        );
      }
    },
  },
};
</script>

<style scoped></style>
