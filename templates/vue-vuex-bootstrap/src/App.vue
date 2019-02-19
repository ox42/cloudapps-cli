<template>
    <div>
        <ConfirmModal v-if="resetModalIsOpen" content="Are you sure that you want to reset the counter?" @confirm="resetModalIsOpen=false; resetCounter();" @close="resetModalIsOpen=false" />

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
                            <router-link class="nav-link" to="/" @click.native="navbarToggle=false">Home</router-link>
                        </li>

                        <a href="/" class="nav-link" @click.prevent="navbarToggle=false; resetModalIsOpen=true">Reset</a>
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
    import { mapActions } from 'vuex';
    import ConfirmModal from "./components/ConfirmModal.vue";

    export default {
        name: 'App',
        data: function () {
            return {
                navbarToggle: false,
                resetModalIsOpen: false,

                APP_NAME: process.env.VUE_APP_NAME
            };
        },

        methods: {
            //maps the "resetCounter" action from the store,
            //as a function we can call in this component/view
            ...mapActions({
                resetCounter: 'resetCounter'
            })
        },

        components: {
            ConfirmModal
        }
    }
</script>

<style>
    body {
        padding-top: 120px;
    }
</style>
