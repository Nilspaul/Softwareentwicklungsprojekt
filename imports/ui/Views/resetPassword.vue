<template>
  <v-card class="ma-10">
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
    <v-sheet class="d-flex bg-surface-variant flex-wrap ">
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
    <v-divider class="mt-12"></v-divider>
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
import { Accounts } from "meteor/accounts-base";
export default {
  name: "resetPassword",
  data: () => ({
    password: null,
    confirmPassword: "",
    error: "",
  }),

  watch: {
    name() {
      this.errorMessages = "";
    },
  },

  methods: {
    submit() {
      if (this.password === "" || this.confirmPassword === "") {
        this.error = "Please enter a new password and confirm it.";
      } else if (this.password !== this.confirmPassword) {
        this.error = "The passwords do not match. Please try again.";
      } else {
        console.log(this.$route.params.token)
        console.log(this.password)
        Accounts.resetPassword(
          this.$route.params.token,
          this.password,
          (error) => {
            if (error) {
              this.error = error.reason;
            } else {
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
