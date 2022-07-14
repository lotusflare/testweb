<template>
    <v-card elevation="0">
        <v-card-title>Pay with card</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    v-model="cardName"
                    label="Cardholder Name"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="cardNumber"
                    label="Card Number"
                    required
                    type="number"
                    :counter="16"
                    :rules="cardNumberRules"
                    :class="{ 'error--text': cardNumberError }"
                ></v-text-field>
                <v-text-field
                    v-model="cardExpiry"
                    label="Expiration Date"
                    required
                    type="date"
                    :counter="4"
                    :rules="cardExpiryRules"
                    :class="{ 'error--text': cardExpiryError }"
                ></v-text-field>
            </v-form>
            Today's total: $xx.xx
            <v-spacer />
            Included tax
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'AddPayment',
        data() {
            return {
                cardName: '',
                cardNumber: '',
                cardExpiry: '',
                cardNumberRules: [
                    (v) => !!v || 'Card number is required',
                    (v) => (v && v.length === 16) || 'Card number must be 16 digits',
                ],
                cardExpiryRules: [
                    (v) => !!v || 'Expiry is required',
                    (v) => (v && v.length === 4) || 'Expiry must be 4 digits',
                ],

                cardNumberError: false,
                cardExpiryError: false,
            }
        },
        methods: {
            clear() {
                this.cardName = ''
                this.cardNumber = ''
                this.cardExpiry = ''
            },
        },
        watch: {
            cardName() {
            },
            cardNumber() {
                this.cardNumberError = false
            },
            cardExpiry() {
                this.cardExpiryError = false
            },
        },
        computed: {
            invalid() {
                return 
            },
        },
    }
</script>

<style scoped>
    .error--text {
        color: red;
    }
</style>
