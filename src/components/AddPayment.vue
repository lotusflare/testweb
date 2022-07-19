<template>
    <v-card elevation="0">
        <v-card-title>Pay with card</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    v-model="cardName"
                    label="Cardholder Name"
                    required
                    :rules="cardNameRules"
                    :class="{ 'error--text': cardNameError }"
                ></v-text-field>
                <v-text-field
                    v-model="cardNumber"
                    label="Card Number"
                    required
                    type="tel"
                    :counter="16"
                    :rules="cardNumberRules"
                    :class="{ 'error--text': cardNumberError }"
                ></v-text-field>
                <v-text-field
                    v-model="cardExpiry"
                    label="Expiration Date"
                    required
                    type="tel"
                    :counter="4"
                    :rules="cardExpiryRules"
                    :class="{ 'error--text': cardExpiryError }"
                ></v-text-field>
            </v-form>
            Today's total: {{ planInfo.price }}
            <v-spacer />
            Included tax
        </v-card-text>
        <v-btn class="mr-4 mb-2" color="black" @click="paymentContinue" dark> Continue </v-btn>
        <v-btn class="mb-2" @click="clear"> clear </v-btn>
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
                cardNameRules: [(v) => !!v || 'Cardholder Name is required'],
                cardNumberRules: [
                    (v) => !!v || 'Card number is required',
                    (v) => (v && v.length === 16) || 'Card number must be 16 digits',
                ],
                cardExpiryRules: [
                    (v) => !!v || 'Expiry is required',
                    (v) => (v && v.length === 4) || 'Expiry must be 4 digits',
                ],
                cardNameError: false,
                cardNumberError: false,
                cardExpiryError: false,
                planInfo: {
                    // planName: '',
                    // planPrice: '',
                    // planLines: '',
                    // planTax: '0.00',
                    // planTotal: '',
                },
            }
        },
        methods: {
            clear() {
                this.cardName = ''
                this.cardNumber = ''
                this.cardExpiry = ''
            },
            paymentContinue() {
                this.$bus.$emit('payment-data', {
                    cardName: this.cardName,
                    cardNumber: this.cardNumber,
                    cardExpiry: this.cardExpiry,
                })
                this.$bus.$emit('stepper-next')
            },
        },
        watch: {
            cardName() {
                this.cardNameError = false
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
        mounted() {
            console.log('AddPayment mounted')
            this.$bus.$on('giveDataToAddPayment', (data) => {
                this.planInfo = data
            })
        },
    }
</script>

<style scoped>
    .error--text {
        color: red;
    }
</style>
