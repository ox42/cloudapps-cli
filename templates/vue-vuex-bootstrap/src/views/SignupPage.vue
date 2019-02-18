<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

        <form class="form auth-form mt-4" @submit.prevent="triggerSignup">
          <h2 class="text-center mt-1 mb-4">Sign up</h2>

          <p v-if="internalError || signupErrorMessage" class="form-error">{{ internalError || signupErrorMessage }}</p>

          <div class="form-group">
            <label htmlFor="name">Full name</label>
            <input type="text" class="form-control" id="name" name="name" v-focus
                   placeholder="Enter your name" v-model="name" />
          </div>

          <div class="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" class="form-control" id="email" name="email"
                   placeholder="Enter email" v-model="email" />
          </div>

          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" class="form-control" id="password" name="password"
                   placeholder="Enter password" v-model="password" />
          </div>

          <div class="form-group">
            <label htmlFor="password2">Repeat password</label>
            <input type="password" class="form-control" id="password2" name="password2"
                   placeholder="Repeat password password" v-model="password2" />
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
  export default {
    name: 'signup-page',

    data: () => {
      return {
        name: '',
        email: '',

        password: '',
        password2: '',

        internalError: null
      }
    },

    computed: {
      signupErrorMessage: function() {
        return (!this.$store.state.auth.pendingAuthRequest && this.$store.state.auth.lastError) ? this.$store.state.auth.lastError : null;
      }
    },

    methods: {
      triggerSignup: function() {

        if (!this.name || !this.email || !this.password) {
          this.internalError = 'Please complete all fields and try again!';
          return /* don't submit form */;
        }

        if (this.password !== this.password2) {
          this.internalError = 'You passwords don\'t match. Please try again.';
          return /* don't submit form */;
        }

        console.log(this.name, this.email, this.password);
        this.$store.dispatch('signUpUser', { name: this.name, email: this.email, password: this.password });
      }
    }
  };
</script>
