<template>
    <v-form>
        <v-text-field v-model="street" label="Street Address" required></v-text-field>
        <v-text-field v-model="apt" label="Apt / Suite" required></v-text-field>
        <v-text-field v-model="city" label="City / Town" required></v-text-field>
        <v-text-field v-model="state" label="State" required></v-text-field>
        <v-text-field
            v-model="zip"
            label="Zip Code"
            required
            @change="checkZipCode"
            @input="continueBtn = false"
        ></v-text-field>
        <v-progress-linear class="mb-4" indeterminate color="black" v-if="zipLoading"></v-progress-linear>
        <v-alert type="success" v-if="success"> This address is covered </v-alert>
        <v-alert type="error" v-if="errorAddress"> This address is not covered </v-alert>
        <v-alert type="error" v-if="errorInternet"> Bad Request </v-alert>
        <v-btn class="mr-4 mb-2" color="black" @click="addressContinue" :dark="continueBtn" :disabled="!continueBtn">
            Continue
        </v-btn>
        <v-btn class="mb-2" @click="clear"> clear </v-btn>
    </v-form>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'AddAddress',
        data() {
            return {
                street: '',
                apt: '',
                city: '',
                state: '',
                zip: '',
                success: false,
                errorAddress: false,
                errorInternet: false,
                continueBtn: false,
                zipLoading: false,
            }
        },
        methods: {
            clear() {
                this.street = ''
                this.apt = ''
                this.city = ''
                this.state = ''
                this.zip = ''
            },
            checkZipCode() {
                //check the zip code is covered by the plan
                this.zipLoading = true
                axios
                    .post(
                        '/dishapi/coverageCheck',
                        {
                            zipCode: this.zip,
                            requestType: 'Activation',
                        },
                        {
                            headers: {
                                dealerCode: 'DUBL1',
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                Authorization: 'Bearer ' + 'QiHx9vGu4k0rG6gQb6gTG8eVEoTa',
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response.data)
                        if (response.data.status === 'Success') {
                            this.success = true
                            this.continueBtn = true
                            this.errorInternet = false
                            this.errorAddress = false
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response.status === 417) {
                            this.success = false
                            this.continueBtn = false
                            this.errorInternet = false
                            this.errorAddress = true
                        } else {
                            this.success = false
                            this.continueBtn = false
                            this.errorInternet = true
                            this.errorAddress = false
                        }
                    })
                    .finally(() => {
                        this.zipLoading = false
                    })
            },
            addressContinue() {
                // send address data to father component "CheckoutSteppers"
                this.$bus.$emit('address-data', {
                    street: this.street,
                    apt: this.apt,
                    city: this.city,
                    state: this.state,
                    zip: this.zip,
                })
                // when click "continue" button, let the stepper move to the next step
                this.$bus.$emit('stepper-next')
            },
        },
    }
</script>

<style scoped></style>
