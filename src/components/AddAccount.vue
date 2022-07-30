<template>
    <div>
        <validation-observer v-if="!isLoggedin()" ref="observer" v-slot="{}">
            <form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="First Name" rules="required" hidden>
                    <v-text-field
                        v-model="firstName"
                        :error-messages="errors"
                        label="First Name"
                        required
                    ></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Last Name" rules="required" hidden>
                    <v-text-field v-model="lastName" :error-messages="errors" label="Last Name" required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        label="Email Address"
                        ref="email"
                    ></v-text-field>
                </validation-provider>

                <validation-provider v-slot="{ errors }" name="password" rules="required" vid="">
                    <v-text-field
                        ref="password"
                        v-model="password"
                        :error-messages="errors"
                        label="Password"
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPass ? 'text' : 'password'"
                        @click:append="showPass = !showPass"
                    ></v-text-field>
                    <!-- <span>{{ errors[0] }}</span> -->
                </validation-provider>

                <v-btn class="mr-4 my-2" color="black" @click="accountContinue" dark> Continue </v-btn>
                <v-btn class="my-2" @click="clear" dark> clear </v-btn>
            </form>
        </validation-observer>
        <div v-else>
            You are already logged in.
            <br />
            <v-btn class="mr-4 mt-2" color="black" @click="accountContinue" dark> Continue </v-btn>
        </div>
    </div>
</template>

<script>
    import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

    setInteractionMode('eager')

    extend('digits', {
        ...digits,
        message: '{_field_} needs to be {length} digits. ({_value_})',
    })

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })

    extend('regex', {
        ...regex,
        message: '{_field_} {_value_} does not match {regex}',
    })

    extend('email', {
        ...email,
        message: 'Email must be valid',
    })

    export default {
        name: 'AddAccount',
        components: {
            ValidationProvider,
            ValidationObserver,
        },
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                repeatEmail: '',
                password: '',
                repeatPassword: '',
                showPass: false,
            }
        },

        methods: {
            accountContinue() {
                // this.$bus.$emit('account-data', {
                //     firstName: this.firstName,
                //     lastName: this.lastName,
                //     email: this.email,
                //     password: this.password,
                // })
                this.$store.commit('setAccount', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                })
                this.$bus.$emit('stepper-next')
                // console.log('accountContinue')
            },
            clear() {
                this.firstName = ''
                this.lastName = ''
                this.email = ''
                this.repeatEmail = ''
                this.password = ''
                this.repeatPassword = ''
            },

            //check if logged in
            isLoggedin() {
                return localStorage.getItem('api_token')
            },
        },
    }
</script>

<style scoped></style>
