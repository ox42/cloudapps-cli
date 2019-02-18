<template>
    <div>
        <ConfirmModal v-if="logoutModalIsOpen" content="Are you sure that you want to logout?" @confirm="logoutModalIsOpen=false; logoutUser();" @close="logoutModalIsOpen=false" />

        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-primary">
            <div class="container">
                <router-link class="navbar-brand py-3" to="/">
                    <img src="/images/winner.png" width="30" height="30" class="d-inline-block align-top mr-1"
                         alt="Winner"/>
                    {{ APP_NAME }}
                </router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive" @click="navbarToggle=!navbarToggle">
                    <span class="navbar-toggler-icon px-3 py-3"></span>
                </button>
                <div :class="'collapse navbar-collapse' + (navbarToggle ? ' show' : '')" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <router-link class="nav-link" to="/" @click="navbarToggle=false">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/user/dashboard" @click="navbarToggle=false">Dashboard
                            </router-link>
                        </li>

                        <li class="nav-item" v-if="isAuthenticated">
                            <a href="/" class="nav-link" @click.prevent="navbarToggle=false; logoutModalIsOpen=true">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
    import ConfirmModal from "./components/ConfirmModal.vue";
    import LoadingSpinner from "./components/LoadingSpinner.vue";

    export default {
        name: 'App',
        data: function () {
            return {
                navbarToggle: false,
                logoutModalIsOpen: false,

                APP_NAME: process.env.VUE_APP_NAME
            };
        },

        computed: {
            isAuthenticated: function () {
                return (this.$store.state.auth.isAuthenticated);
            }
        },

        methods: {
            logoutUser() {
                this.$store.dispatch('logoutUser');
            }
        },

        components: {
            LoadingSpinner,
            ConfirmModal
        }
    }
</script>

<style>
    body {
        padding-top: 120px;
    }

    .note-form, .auth-form {
        box-shadow: 2px 2px 3px 3px #f5f5f5;
        padding: 30px 21px;
    }

    .note-form p.form-error, .auth-form p.form-error {
        font-weight: bold;
        color: red;

        margin: 30px 0 20px 0;
    }
</style>
