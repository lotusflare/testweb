<template>
    <v-form>
        <v-text-field v-model="street" label="Street Address" required></v-text-field>
        <v-text-field v-model="apt" label="Apt / Suite" required></v-text-field>
        <v-text-field v-model="city" label="City / Town" required></v-text-field>
        <v-text-field v-model="state" label="State" required></v-text-field>
        <v-text-field v-model="zip" label="Zip Code" required></v-text-field>
        <v-btn class="mr-4 mb-2" color="primary" @click="addressContinue"> Continue </v-btn>
        <v-btn class="mb-2" @click="clear"> clear </v-btn>
    </v-form>
</template>

<script>
    export default {
        name: 'AddAddress',
        data() {
            return {
                street: '',
                apt: '',
                city: '',
                state: '',
                zip: '',
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
