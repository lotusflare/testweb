<template>
    <v-app>
        <v-sheet>
            <v-tabs background-color="black" dark centered>
                <v-tab>1</v-tab>
                <v-tab>2</v-tab>
            </v-tabs>
        </v-sheet>

        <!-- <v-btn-toggle v-model="toggle_exclusive" rounded dark>
            <v-btn> 1 </v-btn>
            <v-btn> 2 </v-btn>
        </v-btn-toggle> -->
        <v-card-text>
            <v-row>
                <v-col cols="12" md="4" xs="12" v-for="(item, index) in plans" :key="index">
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
                            <router-link
                                style="text-decoration: none; color: inherit"
                                :to="`/checkout?title=${item.title}`"
                            >
                                <v-btn color="black" text> Get Plan </v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-app>
</template>

<script>
    export default {
        name: 'PlansCards',
        data() {
            return {
                plans: {
                    1: {
                        title: 'Only What You Need',
                        price: '$19.99',
                        description:
                            "Perfect if you're a light data user, connect mostly to WiFi or only use your phone to talk and text.",
                    },
                    2: {
                        title: 'Everything You Want',
                        price: '$29.99',
                        description:
                            "Ideal if you're regularly on your phone browsing, listening to music or streaming videos.",
                    },
                    3: {
                        title: 'Everywhere You Go',
                        price: '$39.99',
                        description:
                            "The best if you like to travel or if you're away from Wi-Fi. Includes stateside hotspot & global text.",
                    },
                },
            }
        },
        methods: {},
        mounted() {
            // console.log('PlansCards mounted')
        },
    }
</script>

<style scoped></style>
