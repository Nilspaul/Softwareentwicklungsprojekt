<template>
<v-container class="pa-16 mt-16">
    <v-card>
        <v-card-title>
            Login
        </v-card-title>
        <v-card-text>
            <v-text-field ref="email" v-model="email" :rules="[() => !!email || 'This field is required']" :error-messages="errorMessages" label="Email-address" placeholder="Type in your mail address" required></v-text-field>
            <v-text-field ref="password" v-model="password" :rules="[() => !!password || 'This field is required']" :error-messages="errorMessages" label="Password" placeholder="Type in your password" required></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="big-btn full-width" @click="submit">
                Submit
            </v-btn>
        </v-card-actions>
        <v-btn color="primary" class="text-decoration-underline" plain> Don't have an account yet? Register now!</v-btn>
    </v-card>
</v-container>
</template>

<script>
export default {
    name: "loginBase",
    components: {

    },
    data: () => ({
        errorMessages: '',
        name: null,
        password: null,
        email: null,
    }),

    methods: {
        submit() {
            
        },
    },

}
</script>

<style scoped>
p {
    font-family: serif;
}
</style>
