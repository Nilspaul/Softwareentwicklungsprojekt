<template>
<v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" class="mt-7" plain v-bind="attrs" v-on="on">
            Don't have an account yet? Register now!
        </v-btn>
    </template>
    <v-card ref="form">
        <v-card-title>
            Register
        </v-card-title>
        <v-card-text>
            <v-text-field ref="name" v-model="name" :rules="[() => !!name || 'This field is required']" :error-messages="errorMessages" label="Vollständiger Name" placeholder="John Doe" required></v-text-field>
            <v-text-field ref="address" v-model="address" :rules="[() => !!address || 'This field is required',() => !!address && address.length <= 25 || 'Address must be less than 25 characters',
                addressCheck]" label="Address Line" placeholder="Snowy Rock Pl" counter="25" required>
            </v-text-field>
            <v-text-field ref="email" v-model="email" :rules="[() => !!email || 'This field is required']" :error-messages="errorMessages" label="Emailadresse" placeholder="max-muster@mail.de" required></v-text-field>
            <v-text-field ref="city" v-model="city" :rules="[() => !!city || 'This field is required', addressCheck]" label="Stadt" placeholder="Friedberg" required></v-text-field>
            <v-text-field ref="state" v-model="state" :rules="[() => !!state || 'This field is required']" label="Bundesland" required placeholder="Hessen"></v-text-field>
            <v-text-field ref="zip" v-model="zip" :rules="[() => !!zip || 'This field is required']" label="Postleitzahl" required placeholder="79938"></v-text-field>
            <v-autocomplete ref="country" v-model="country" :rules="[() => !!country || 'This field is required']" :items="countries" label="Land (eng)" placeholder="Select..." required></v-autocomplete>
            <v-divider class="mt-12"></v-divider>
            <v-text-field ref="password" v-model="password" :rules="[() => !!password || 'This field is required']" label="Password" required placeholder="Gib dein Passwort ein"></v-text-field>   
            
            <v-text-field :rules="[() =>passwordConfirmer !== password || 'The passwords do not match']" label="Confirm password" required placeholder="Confirm your password"></v-text-field>   
          

        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
            <v-btn @click="dialog=false" text>
                Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit">
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>

export default {
    name: "loginBase",
    components: {

    },
   
    data: () => ({
        user: {},
        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
        errorMessages: '',
        name: null,
        email: null,
        password: null,
        passwordConfirmer: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        formHasErrors: false,
        dialog: false,
    }),

    computed: {
        form() {
            return {
                name: this.name,
                email: this.email,
                address: this.address,
                city: this.city,
                state: this.state,
                zip: this.zip,
                country: this.country,
                password: this.password,
                passwordConfirmer: this.passwordConfirmer,
            }
        },
    },

    watch: {
        name() {
            this.errorMessages = ''
        },
    },

    methods: {
        addressCheck() {
            this.errorMessages = this.address && !this.name ?
                `Hey! I'm required` : ''
            return true
        },
        submit() {
            this.formHasErrors = false
            this.user = this.form;
            Meteor.call('user.create', this.user);
            this.dialog = false;
        },
    },

}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
