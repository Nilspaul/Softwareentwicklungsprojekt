<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <!-- Button that activates the register dialog -->
      <v-btn color="primary" class="mt-7 boldLink" plain v-bind="attrs" v-on="on">
        Don't have an account yet? Register now!
      </v-btn>
    </template>
    <v-card ref="form">
      <div class="d-flex justify-center bg-surface-variant">
        <v-sheet class="ma-2 pa-2">
          <v-card-title align-center :style="{ color: '#4a5c66' }" class="text-h4">
            Register
          </v-card-title>
        </v-sheet>
      </div>
      <v-card-text>
        <p bold>Full Name</p>
        <!-- Fullname textfield-->
        <v-text-field
          outlined
          ref="name"
          v-model="name"
          :rules="[() => !!name || 'This field is required']"
          :error-messages="errorMessages"
          placeholder="John Doe"
          required
        ></v-text-field>
        <div>
          <v-sheet class="d-flex bg-surface-variant flex-wrap">
            <v-sheet class="me-auto flex-grow-1 pr-4">
              <p bold>adress Line</p>
              <!-- adressline textfield-->
              <v-text-field
                outlined
                ref="adressLine"
                v-model="adressLine"
                :rules="[
                  () => !!adressLine || 'This field is required',
                  () =>
                    (!!adressLine && adressLine.length <= 25) ||
                    'adressLine must be less than 25 characters',
                  adressLineCheck,
                ]"
                placeholder="Snowy Rock Pl"
                counter="25"
                required
              ></v-text-field>
            </v-sheet>
            <v-sheet class="me-auto flex-grow-2">
              <p bold>House number</p>
              <!-- housenumber textfield-->
              <v-text-field
                outlined
                ref="houseNumber"
                v-model="houseNumber"
                :rules="[() => !!houseNumber || 'This field is required']"
                placeholder="666"
                required
              >
              </v-text-field>
            </v-sheet>
          </v-sheet>
        </div>
        <p bold>City</p>
        <!-- city textfield-->
        <v-text-field
          outlined
          ref="city"
          v-model="city"
          :rules="[() => !!city || 'This field is required', adressLineCheck]"
          placeholder="Friedberg"
          required
        ></v-text-field>
        <div>
          <v-sheet class="d-flex bg-surface-variant flex-wrap">
            <v-sheet class="me-auto flex-grow-1 pr-4">
            <!-- province textfield-->
              <p bold>Province</p>
              <v-text-field
                outlined
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                required
                placeholder="Hessen"
              ></v-text-field>
            </v-sheet>
            <v-sheet class="me-auto flex-grow-2">
              <p bold>Zip Code</p>
              <!-- zipCode textfield-->
              <v-text-field
                outlined
                class="flex-grow-1"
                ref="zip"
                v-model="zip"
                :rules="[() => !!zip || 'This field is required']"
                required
                placeholder="79938"
              ></v-text-field>
            </v-sheet>
          </v-sheet>
        </div>
        <p bold>Country</p>
        <!-- country autocomplete field-->
        <v-autocomplete
          outlined
          ref="country"
          v-model="country"
          :rules="[() => !!country || 'This field is required']"
          :items="countries"
          placeholder="Select..."
          required
        ></v-autocomplete>
        <p bold>Email</p>
        <!-- email textfield-->
        <v-text-field
          outlined
          ref="email"
          v-model="email"
          :rules="[() => !!email || 'This field is required']"
          :error-messages="errorMessages"
          placeholder="max-muster@mail.de"
          required
        ></v-text-field>
        <div>
          <v-sheet class="d-flex bg-surface-variant flex-wrap">
            <v-sheet class="me-auto flex-grow-1">
              <p bold>Password</p>
              <!-- password textfield-->
              <v-text-field
                outlined
                ref="password"
                v-model="password"
                :rules="[() => !!password || 'This field is required']"
                required
                placeholder="Gib dein Passwort ein"
              ></v-text-field>
            </v-sheet>
            <v-sheet class="me-auto flex-grow-1 ml-4">
            <!-- confirm password textfield-->
              <p bold>Confirm Passord</p>
              <v-text-field
                outlined
                :rules="[
                  () => passwordConfirmer !== password || 'The passwords do not match',
                ]"
                required
                placeholder="Confirm your password"
              ></v-text-field>
            </v-sheet>
          </v-sheet>
        </div>
      </v-card-text>
      <v-divider class="mt-12"></v-divider>
      <!-- Cancel and submit button -->
      <v-card-actions>
        <v-btn @click="dialog = false" text> Cancel </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="submit"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "loginBase",
  data: () => ({
    user: {},
    countries: [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antigua &amp; Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia &amp; Herzegovina",
      "Botswana",
      "Brazil",
      "British Virgin Islands",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Cape Verde",
      "Cayman Islands",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Congo",
      "Cook Islands",
      "Costa Rica",
      "Cote D Ivoire",
      "Croatia",
      "Cruise Ship",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Estonia",
      "Ethiopia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji",
      "Finland",
      "France",
      "French Polynesia",
      "French West Indies",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kuwait",
      "Kyrgyz Republic",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Nepal",
      "Netherlands",
      "Netherlands Antilles",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Pierre &amp; Miquelon",
      "Samoa",
      "San Marino",
      "Satellite",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "South Africa",
      "South Korea",
      "Spain",
      "Sri Lanka",
      "St Kitts &amp; Nevis",
      "St Lucia",
      "St Vincent",
      "St. Lucia",
      "Sudan",
      "Suriname",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      `Timor L'Este`,
      "Togo",
      "Tonga",
      "Trinidad &amp; Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks &amp; Caicos",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (US)",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ],
    errorMessages: "",
    name: null,
    email: null,
    password: null,
    passwordConfirmer: null,
    adressLine: null,
    houseNumber: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    formHasErrors: false,
    dialog: false,
  }),
// define a computed property that returns an object containing all form fields
  computed: {
    form() {
      return {
        name: this.name,
        email: this.email,
        adressLine: this.adressLine,
        houseNumber: this.houseNumber,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country,
        password: this.password,
        passwordConfirmer: this.passwordConfirmer,
      };
    },
  },

  // defines a watcher that triggers when the "name" field changes and clears any error messages
  watch: {
    name() {
      this.errorMessages = "";
    },
  },

  methods: {
    // This method sets an error message if the "adressLine" field is empty and the "name" field is not filled out
    adressLineCheck() {
      this.errorMessages = this.adressLine && !this.name ? `Hey! I'm required` : "";
      return true;
    },
    // This method sets the formHasErrors property to false, sets the user object to the current form values, calls a Meteor method to create a user, and closes the dialog
    submit() {
      this.formHasErrors = false;
      this.user = this.form;
      Meteor.call("user.create", this.user);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
p {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #4a5c66;
  margin-bottom: 0;
}
</style>
