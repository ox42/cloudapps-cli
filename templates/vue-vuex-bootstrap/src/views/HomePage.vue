<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">

        <h2>{{APP_NAME}}</h2>
        <p>We help you count easily, without errors.</p>


        <img class="landing-photo" src="/images/counter.jpg" alt="Counter" />
        <p class="counter-value">
          Counter: <strong>{{ counter }}</strong><br />
          <span v-if="lastAddition" style="font-size: 50%;">Last value added: {{ lastAddition }}</span>
        </p>
        <p>
          <button class="btn btn-primary" @click="addValue(1)">Increase by 1</button> &nbsp;
          <button class="btn btn-danger" @click="addValue(2)">Increase by 2</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex';
export default {
  name: 'home',
  data: function() {
    return {
      APP_NAME: process.env.VUE_APP_NAME,
    }
  },

  computed: {
    ...mapState({
      counter: store => store.counter.counter,
      lastAddition: store => store.counter.lastAddition
    })
  },

  methods: {
    ...mapActions({
      addValue: 'addValue'
    })
  }
};
</script>

<style scoped>
  .landing-photo {
    width: 90%;
    max-width: 400px;

    margin-top: 20px;
    margin-bottom: 50px;
  }

  .counter-value {
    font-size: 2rem;
    margin: 30px 0;
  }
</style>