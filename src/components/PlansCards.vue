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
        <v-container fluid style="max-width: 1200px; position: relative" class="white">
            <v-row>
                <v-col cols="12" md="4" xs="12" v-for="(item, index) in plan" :key="index">
                    <v-sheet color="black" class="mt-10 darken-2 text-center" height="20" width="100%"> </v-sheet>
                    <v-card height="800px" class="d-flex flex-column" tile>
                        <v-sheet
                            max-width="100"
                            class="text-center rounded-circle mx-auto"
                            style="margin-top: -64px; border: 5px solid #f01446"
                            elevation=""
                            height="100"
                            width="100%"
                            outlined
                        >
                            <div class="mt-11 red--text font-weight-black select-a-plan__best-value-text">
                                {{ item.description }}
                            </div>
                        </v-sheet>
                        <v-card-title class="mt-n4">
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
                if (item.num_of_lines === 1) {
                    this.$router.push({
                        name: 'RwCheckout',
                        query: {
                            title: item.name,
                            price: item.DISH_Customer_Price,
                            lines: item.num_of_lines,
                            entityID: item.entity_id,
                        },
                    })
                } else {
                    this.$router.push({
                        name: 'RwCheckout',
                        query: {
                            title: item.name,
                            price: item.DISH_Customer_Price * 2,
                            lines: item.num_of_lines,
                            entityID: item.entity_id,
                        },
                    })
                }
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

<style scoped>
    .select-a-plan__best-value-text {
        line-height: 19px;
        transform: translateY(-50%);
        color: #f01446;
        text-transform: uppercase;
    }
</style>
