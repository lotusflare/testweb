<template>
    <v-row no-gutters>
        <v-col cols="4">
            <v-img src="../assets/images/onlywhatyouneed-plan-385dfc6572.c4a50b8341.png" height="50px" contain></v-img>
        </v-col>
        <v-col cols="8">
            <div class="heading-6">{{ this.$route.query.title }}</div>
            <div class="subheading">Get {{ this.$route.query.lines }} line for {{ this.$route.query.price }}</div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'OrderReview',
        mounted () {
            ;
        },
    }
</script>

<style scoped></style>
