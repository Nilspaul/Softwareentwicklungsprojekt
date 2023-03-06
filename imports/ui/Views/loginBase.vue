<template>
  <div>
    <v-container>
      <transition appear @enter="enterHeader">
        <h2 id="background">THMStudyPlanner</h2>
      </transition>
      <v-card
        :class="['mt-16', { loginContainer: $vuetify.breakpoint.mobile }]"
      >
        <v-card-title class="text-h4 pb-6" :style="{ color: '#4a5c66' }">
          Login
        </v-card-title>
        <v-card-text ref="loginForm">
          <p bold>Email</p>
          <v-text-field
            ref="email"
            v-model="email"
            autofocus
            @keyup.enter="submit()"
            :error-messages="errorMessages"
            placeholder="Type in your mail address"
            required
          ></v-text-field>
          <p>Password</p>
          <v-text-field
            autofocus
            ref="password"
            type="password"
            @keyup.enter="submit()"
            v-model="password"
            :error-messages="errorMessages"
            placeholder="Type in your password"
            required
          ></v-text-field>
          <v-form> </v-form>
        </v-card-text>
        <v-dialog v-model="dialog" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              class="boldLink"
              v-bind="props"
              plain
              @click="dialog = true"
            >
              Forgot password?
            </v-btn>
          </template>
          <v-card width="800">
            <div class="d-flex justify-center">
              <v-card-title color="secondary--text"
                >Enter your Email to request a new password</v-card-title
              >
            </div>
            <v-card-text>
              <p class="pb-4" bold>Email</p>
              <v-text-field
                outlined
                ref="email"
                v-model="email"
                :error-messages="errorMessages"
                placeholder="max-muster@mail.de"
                required
              ></v-text-field>
            </v-card-text>
            <div class="d-flex justify-center bg-surface-variant">
              <v-sheet class="ma-2 pa-2">
                <v-hover v-slot="{ hover }">
                  <v-btn
                    class="white--text biggerButton"
                    elevation="2"
                    :style="{
                      'background-color': hover ? ' #80ba24' : '#4a5c66',
                    }"
                    @click="
                      sendEmail();
                      sweetAlert();
                    "
                  >
                    Send
                  </v-btn>
                </v-hover>
              </v-sheet>
            </div>
          </v-card>
        </v-dialog>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>

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
                Log in
              </v-btn>
            </v-hover>
          </v-sheet>
        </div>
        <v-divider></v-divider>
        <registerBase />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { router } from "../plugins/router";
import gsap from "gsap";
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
    dialog: false,
  }),

  methods: {
    submit() {
      Meteor.loginWithPassword(this.email, this.password, (error, result) => {
        if (error) {
          this.setErr(error);
        } else if (Meteor.user()) {
          router.push({
            name: 'landingpage',
          });
        }
      });
    },
    sweetAlert() {
      this.$swal({
        icon: "success",
        title: "Check your emails!",
        text: "If you provided an already registered email You will receive a reset-link if you provided an already registered email ",
        showCloseButton: true,
        confirmButtonColor: "#4a5c66",
      });
    },
    sendEmail() {
      console.log(this.email);
      Meteor.call("users.resetPassword", this.email, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
        }
      });
    },
    setErr() {
      this.errorMessages = "Überprüfe deine Eingaben";
    },
    enterHeader(element) {
      gsap.fromTo(
        element,
        { x: -1000 },
        { delay: 1, duration: 2, x: 0, opacity: 1, ease: "back.out(2)" }
      );
    },
  },
};
</script>

<style scoped>
.v-text-field {
  border-left: 200px;
}
p {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #4a5c66;
  margin-bottom: -10px;
}

.loginContainer {
  height: 50vh !important;
}
.v-btn:hover {
  color: #80ba24;
  font-weight: bold;
}
.biggerButton {
  width: 10em;
  margin-top: -4em;
  font-weight: bold;
  font-size:1em
}

#background {
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 1.5em;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(to right, #80ba24, #4a5c66);
  background-size: 400%;
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: 700;
  font-size: 3em;
  animation: bgTransition 7s linear;
}

@keyframes bgTransition {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}
</style>
