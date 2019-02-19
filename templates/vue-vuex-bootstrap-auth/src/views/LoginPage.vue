<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

        <form class="form auth-form mt-4" @submit.prevent="triggerLogin">
        <h2 class="text-center mt-1 mb-4">Sign in</h2>

        <p v-if="loginErrorMessage" class="form-error">{{ loginErrorMessage }}</p>

        <div class="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" class="form-control" id="email" name="email" v-focus
                 placeholder="Enter email" v-model="email" />
        </div>

        <div class="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" class="form-control" id="password" name="password"
                 placeholder="Enter password" v-model="password" />
        </div>

        <div class="text-right">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';

export default {
  name: 'login-page',

  data: () => {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    ...mapState({
      loginErrorMessage: state => ((!state.auth.pendingAuthRequest && state.auth.lastError) ? state.auth.lastError : null)
    })
  },

  methods: {
    triggerLogin: function() {
      this.signInUser({ email: this.email, password: this.password });
    },

    ...mapActions({
      signInUser: 'signInUser'
    })
  }
};
</script>
