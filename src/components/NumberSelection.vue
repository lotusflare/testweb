<template>
    <div>
        <div class="text-h6 active mb-0 transition-swing" v-text="text"></div>
        <v-select :items="items" label="Numbers"></v-select>
        <v-btn class="mr-4" color="black" @click="getNumber" dark> Get number </v-btn>
        <v-btn class="mr-0" color="black" @click="submit" dark> continue </v-btn>
    </div>
</template>

<script>
    export default {
        name: 'NumberSelection',
        data() {
            return {
                text: 'Number Selection',
                items: [
                    { text: '1' },
                    { text: '2' },
                    { text: '3' },
                    { text: '4' },
                    { text: '5' },
                    { text: '6' },
                    { text: '7' },
                    { text: '8' },
                    { text: '9' },
                    { text: '10' },
                ],
            }
        },
        methods: {
            getNumber() {
                //
            },
            submit() {
                this.$bus.$emit('number-data', this.items)
                this.$bus.$emit('stepper-next')
            },
        },
    }
</script>

<style scoped></style>
