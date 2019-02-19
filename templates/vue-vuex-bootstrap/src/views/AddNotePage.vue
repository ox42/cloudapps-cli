<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

        <form class="form note-form mt-4" :style="{ opacity: (isUpdatingNote ? 0.3 : 1) }" @submit.prevent="triggerSubmit">
          <h2 class="text-center mt-1 mb-4">Add note</h2>

          <p v-if="internalError || failedUpdatingNote" class="form-error">{{ internalError || 'Failed to create note. Please try again.' }}</p>

          <div class="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" class="form-control" id="title" name="title" v-focus
                   placeholder="Enter a title" v-model="title" />
          </div>

          <div class="form-group">
            <label htmlFor="content">Note content</label>
            <textarea class="form-control" id="content" name="content"
                      placeholder="Enter the content..." rows={5} maxLength={140} v-model="content" />
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
  import NotesDataMixin from "@/mixins/NotesDataMixin.js";

  export default {
    name: 'add-note-page',
    mixins: [NotesDataMixin],

    data: () => {
      return {
        title: '',
        content: '',

        internalError: null
      }
    },

    computed: {
      ...mapState({
        isUpdatingNote: state => state.notes.isUpdatingNote,
        failedUpdatingNote: state => state.notes.failedUpdatingNote
      })
    },

    methods: {
      triggerSubmit: function() {

        if (!this.title || !this.content){
          this.internalError = 'Please complete all fields and try again!';
          return /* don't submit form */;
        }

        this.createNote({ title: this.title, content: this.content });
      },

      ...mapActions({
        createNote: 'createNote'
      })
    }
  };
</script>
