<template>
    <v-app>
        <!--center button group-->
        <v-card-actions class="justify-center mb-5">
            <v-btn-toggle v-model="toggle_exclusive" rounded mandatory dark>
                <v-btn>1</v-btn>
                <v-btn>2</v-btn>
            </v-btn-toggle>
        </v-card-actions>
        <!-- <v-card-text> -->
        <v-container fluid style="max-width: 1200px; position: relative;" class="white">
            <v-row>
                <v-col cols="12" md="4" xs="12" v-for="(item, index) in plan" :key="index">
                    <div class="black darken-2 text-center">
                        <span class="white--text">{{ item.description }}</span>
                    </div>
                    <v-card height="800px" class="d-flex flex-column">
                        <v-card-title>
                            <v-col align="center">
                                <div>
                                    {{ item.name }}
                                </div>
                                <div v-if="toggle_exclusive === 0" class="text-h3 font-weight-black">
                                    $ {{ item.DISH_Customer_Price }}
                                </div>
                                <div v-else-if="toggle_exclusive === 1" class="text-h3 font-weight-black">
                                    $ {{ item.DISH_Customer_Price * 2 }}
                                </div>
                                <div v-if="toggle_exclusive === 0" class="subtitle-2">PER LINE FOR DISH CUSTOMERS</div>
                                <div v-else-if="toggle_exclusive === 1" class="subtitle-2">
                                    FOR TWO LINES FOR DISH CUSTOMERS
                                </div>
                            </v-col>
                        </v-card-title>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-text>
                            <v-col align="center">
                                <div class="subheading">
                                    {{ item.Marketing_Description }}
                                </div>
                                <div class="mt-4 text--primary">
                                    {{ item.Plan_Features }}
                                </div>
                            </v-col>
                        </v-card-text>
                        <v-spacer></v-spacer>
                        <v-card-actions class="flex-end">
                            <v-col align="center">
                                <v-btn color="black" rounded dark @click="getPlan(item)"> Get Plan </v-btn>
                            </v-col>
                        </v-card-actions>
                        <v-card-text class="my-0">
                            <v-col align="center">
                                <div v-if="toggle_exclusive === 0" class="subheading">
                                    Retail Price: {{ item.Retail_Price }}
                                </div>
                                <div v-else-if="toggle_exclusive === 1" class="subheading">
                                    Retail Price: {{ item.Retail_Price * 2 }}
                                </div>
                            </v-col>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- </v-card-text> -->
    </v-app>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'PlansCards',
        data() {
            return {
                plans: [],
                toggle_exclusive: 0,
            }
        },
        computed: {
            // filter the plans line number based on the toggle_exclusive value
            // toggle_exclusive should plus 1 to get the line number
            plan() {
                return this.plans.filter((item) => item.num_of_lines === this.toggle_exclusive + 1)
            },
            // when num_of_lines is 2, the 2 lines price should be times 2
        },
        methods: {
            getPlan(item) {
                console.log(item)
                this.$router.push({
                    name: 'RwCheckout',
                    query: {
                        title: item.name,
                        price: item.DISH_Customer_Price,
                        // lines: item.lines,
                        lines: item.num_of_lines,
                    },
                })
            },
        },
        mounted() {
            axios
                .post('https://api-project9.lotusflare.com/api/v3/catalog/get_offers', {
                    operator_name: 'dishb2b',
                })
                .then((response) => {
                    console.log(response.data)
                    Object.entries(response.data.offer_by_id).forEach((element) => {
                        // if it is a plan then add to plans
                        if (element[1].data.DISH_Customer_Price) {
                            this.plans.push(element[1].data)
                        }
                    })
                    // sort the plans by price
                    this.plans.sort((a, b) => {
                        return a.DISH_Customer_Price - b.DISH_Customer_Price
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            console.log(this.plans)
            // console.log(typeof this.plans[0].DISH_Exclusive_Price)
        },
    }
</script>

<style scoped></style>
