<template>
    <div>
        <div v-if="loggedIn">
            <h1>My Account</h1>
            <h4>Email: {{ userEmail }}</h4>
            <hr />
            <span v-for="(item, index) in getAccounts" :key="index">{{ item }}</span>
        </div>
        <div v-else>
            <h1>You are not logged in.</h1>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'MyAccount',
        data() {
            return {
                userEmail: '',
                loggedIn: false,
                accountIDs: [], // save the account ids under user's account
                getAccounts: [], // save each account ids' info using getAccounts API
            }
        },
        async mounted() {
            // post to get user info
            if (localStorage.getItem('api_token')) {
                this.loggedIn = true
                // await here to wait for the accountIDs
                await axios
                    .post(
                        'https://api-project9.lotusflare.com/api/v3/user/get_user',
                        {
                            target_id: localStorage.getItem('user_id'),
                            target_type: 3,
                        },
                        {
                            headers: {
                                Authorization: localStorage.getItem('api_token'),
                            },
                        }
                    )
                    .then((response) => {
                        this.accountIDs = response.data.user_info.account_ids
                        this.userEmail = response.data
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                // debugger
                this.accountIDs.forEach((element) => {
                    axios
                        .post(
                            'https://api-project9.lotusflare.com/api/v3/user/get_account',
                            {
                                target_id: element,
                                target_type: 2,
                            },
                            {
                                headers: {
                                    Authorization: localStorage.getItem('api_token'),
                                },
                            }
                        )
                        .then((response) => {
                            this.getAccounts.push(response.data)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })
            }
        },
    }
</script>

<style scoped></style>
