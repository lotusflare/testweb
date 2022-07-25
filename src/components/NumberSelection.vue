<template>
    <div>
        <!-- <div class="text-h6 active mb-0 transition-swing" v-text="text"></div> -->
        <v-select
            :items="items"
            label="Numbers"
            v-model="numberData.number"
            v-if="getNumberClicked === true"
        ></v-select>
        <v-btn class="mr-4 mb-4" color="black" @click="getNumber" dark> Get number </v-btn>
        <v-btn class="mr-0 mb-4" color="black" @click="submit" dark> continue </v-btn>
    </div>
</template>

<script>
    export default {
        name: 'NumberSelection',
        data() {
            return {
                // text: 'Number Selection',
                items: [
                    { text: this.randomPhoneNumber() },
                    { text: this.randomPhoneNumber() },
                    { text: this.randomPhoneNumber() },
                ],
                getNumberClicked: false,
                numberData: {
                    number: '',
                },
            }
        },
        methods: {
            getNumber() {
                this.getNumberClicked = true
            },
            submit() {
                this.$bus.$emit('number-data', this.numberData)
                this.$bus.$emit('stepper-next')
            },
            // random phone number generator
            randomPhoneNumber() {
                var phoneNumber = Math.floor(Math.random() * 9999999999) + 1000000000
                return phoneNumber.toString()
            },
        },
    }
</script>

<style scoped></style>
