<template>
<v-container class="pa-16 mt-16">
    <v-card>
        <v-card-title>
            Login
        </v-card-title>
        <v-card-text ref="loginForm">
            <v-text-field ref="email" v-model="email" :rules="[() => !!email || 'This field is required']" :error-messages="errorMessages" label="Email-address" placeholder="Type in your mail address" required></v-text-field>
            <v-text-field ref="password" v-model="password" :rules="[() => !!password || 'This field is required']" :error-messages="errorMessages" label="Password" placeholder="Type in your password" required></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="big-btnSolidBorder full-width" @click="submit">
                Log in
            </v-btn>
        </v-card-actions>
        <registerBase />
    </v-card>

</v-container>
</template>

<script>
import {
    router
} from '../../plugins';
import registerBase from '../register/registerBase.vue'
import Users from '../../../api/collections/Users';
export default {
    name: "loginBase",
    components: {
        registerBase,
    },
    data: () => ({
        errorMessages: '',
        name: null,
        email: null,
        password: null,
        user: {
            email: null,
            password: null,
        }
    }),


    methods: {
        submit() {
            let dbUsers = Users.find().fetch();
            this.user.email = this.email;
            this.user.password = this.password;
            dbUsers.forEach((dbUser) => {
                if (dbUser.email == this.user.email && dbUser.password == this.user.password) {
                    router.push({
                        path: '/mainpage'
                    });
                }
            })
        },
    }

}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
