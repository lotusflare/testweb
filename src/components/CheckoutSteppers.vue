<template>
    <div>
        <v-card class="d-flex justify-center pt-10 px-sm-16 px-0" flat tile>
            <v-stepper v-model="e6" vertical elevation="0" color="red">
                <v-stepper-step :complete="e6 > 1" step="1">
                    Buy
                    <!-- <small>Summarize if needed</small> -->
                </v-stepper-step>

                <v-stepper-content step="1">
                    <v-col>
                        <v-img
                            src="../assets/images/onlywhatyouneed-plan-385dfc6572.c4a50b8341.png"
                            height="50px"
                            contain
                        ></v-img>

                        {{ this.$route.query.title }}
                    </v-col>

                    <br />
                    <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
                    <v-btn text>
                        <router-link style="text-decoration: none; color: inherit" to="/"> Cancel </router-link>
                    </v-btn>
                </v-stepper-content>

                <v-stepper-step editable :complete="e6 > 2" step="2"> Create Account </v-stepper-step>

                <v-stepper-content step="2">
                    <!-- <CreateAccount /> -->
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
                    <v-btn text> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="3"> Select an ad format and name ad unit </v-stepper-step>

                <v-stepper-content step="3">
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
                    <v-btn text> Cancel </v-btn>
                </v-stepper-content>

                <v-stepper-step step="4"> View setup instructions </v-stepper-step>
                <v-stepper-content step="4">
                    <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                    <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
                    <v-btn text> Cancel </v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-card>
    </div>
</template>

<script>
    // import CreateAccount from './CreateAccount'
    export default {
        name: 'CheckoutSteppers',
        components: {
            // CreateAccount,
        },
        data() {
            return {
                e6: 1,
            }
        },
        mounted() {
            console.log(this.$route)
            this.e6 = 1
        },
    }
</script>

<style scoped></style>
