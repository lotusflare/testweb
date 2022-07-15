<template>
    <v-app>
        <!--center button group-->
        <v-card-actions class="justify-center mb-5">
            <v-btn-toggle v-model="toggle_exclusive" rounded mandatory>
                <v-btn>1</v-btn>
                <v-btn>2</v-btn>
            </v-btn-toggle>
        </v-card-actions>
        <!-- <v-card-text> -->
        <v-container class="white">
            <v-row>
                <v-col cols="12" md="4" xs="12" v-for="(item, index) in plan" :key="index">
                    <v-card>
                        <v-card-title>
                            <v-col align="center">
                                <div class="text-h6">
                                    {{ item.title }}
                                </div>
                                <div class="text-h4">
                                    {{ item.price }}
                                </div>
                            </v-col>
                        </v-card-title>
                        <v-card-text>
                            <div class="subheading">
                                {{ item.description }}
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- <router-link
                                style="text-decoration: none; color: inherit"
                                :to="`/checkout?title=${item.title}&price=${item.price}&lines=${item.lines}`"
                            > -->
                            <v-btn color="black" text @click="getPlan(item)"> Get Plan </v-btn>
                            <!-- </router-link> -->
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- </v-card-text> -->
    </v-app>
</template>

<script>
    export default {
        name: 'PlansCards',
        data() {
            return {
                plans: {
                    line1: {
                        1: {
                            title: 'Only What You Need',
                            lines: 1,
                            price: '$19.99',
                            description:
                                "Perfect if you're a light data user, connect mostly to WiFi or only use your phone to talk and text.",
                        },
                        2: {
                            title: 'Everything You Want',
                            lines: 1,
                            price: '$29.99',
                            description:
                                "Ideal if you're regularly on your phone browsing, listening to music or streaming videos.",
                        },
                        3: {
                            title: 'Everywhere You Go',
                            lines: 1,
                            price: '$39.99',
                            description:
                                "The best if you like to travel or if you're away from Wi-Fi. Includes stateside hotspot & global text.",
                        },
                    },
                    line2: {
                        1: {
                            title: 'Only What You Need',
                            lines: 2,
                            price: '$29.99',
                            description:
                                "Perfect if you're a light data user, connect mostly to WiFi or only use your phone to talk and text.",
                        },
                        2: {
                            title: 'Everything You Want',
                            lines: 2,
                            price: '$39.99',
                            description:
                                "Ideal if you're regularly on your phone browsing, listening to music or streaming videos.",
                        },
                        3: {
                            title: 'Everywhere You Go',
                            lines: 2,
                            price: '$49.99',
                            description:
                                "The best if you like to travel or if you're away from Wi-Fi. Includes stateside hotspot & global text.",
                        },
                    },
                },
                toggle_exclusive: 0,
            }
        },
        computed: {
            plan() {
                return this.toggle_exclusive === 0 ? this.plans.line1 : this.plans.line2
            },
        },
        methods: {
            getPlan(item) {
                console.log(item.title)
                this.$router.push({
                    name: 'RwCheckout',
                    params: {
                        title: item.title,
                        price: item.price,
                        lines: item.lines,
                    },
                })
            },
        },
        mounted() {
            // console.log('PlansCards mounted')
        },
    }
</script>

<style scoped></style>
