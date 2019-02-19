<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">

        <h2>{{APP_NAME}}</h2>
        <p>Get started by creating an account. Have fun!</p>

        <img class="landing-photo" src="/images/notes.jpg" alt="Notes" />
        <p>
          <router-link to="/auth/login" class="btn btn-lg btn-primary">Login</router-link> &nbsp;
          <router-link to="/auth/signup" class="btn btn-lg btn-danger">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data: function() {
    return {
      APP_NAME: process.env.VUE_APP_NAME
    }
  }
};
</script>

<style scoped>
  .landing-photo {
    width: 90%;
    max-width: 750px;

    margin-top: 30px;
    margin-bottom: 70px;
  }
</style>