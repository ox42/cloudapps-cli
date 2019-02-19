<template>
  <div class="container">
    <div class="row">
      <div class="col text-center">

        <h2 class="mb-4">{{ APP_NAME }}</h2>
        <LoadingSpinner v-if="isLoadingNotes" />

        <div v-if="notes && notes.length === 0">
          <p class="mt-4 mb-5 py-3">You don't have any notes.<br />Start by creating one using the button below.</p>
        </div>


        <div class="row" v-if="notes">

          <div v-for="note in notes" class="col-12 col-md-6 col-lg-4" :key="'note-' + note.id">
            <div class="card text-left mt-2 mb-3">
              <div class="card-body">
                <h5 class="card-title">
                  {{ note.title }}
                </h5>

                <p class="card-text">
                  {{ note.content }}
                </p>

                <p class="text-right mb-0">
                  <router-link :to="'/user/note/' + note.id + '/edit'" class="card-link">Edit note</router-link>
                </p>
              </div>
            </div>
          </div>

        </div>

        <p class="mt-4 text-right">
          <router-link to="/user/note/add" class="btn btn-primary">Add note</router-link>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
  // @ is an alias to /src
  import NotesDataMixin from "@/mixins/NotesDataMixin.js";
  import LoadingSpinner from "@/components/LoadingSpinner.vue";

  export default {
    name: 'dashboard-page',
    mixins: [NotesDataMixin],

    data: () => {
      return {
        APP_NAME: process.env.VUE_APP_NAME
      }
    },

    components: { LoadingSpinner }
  };
</script>
