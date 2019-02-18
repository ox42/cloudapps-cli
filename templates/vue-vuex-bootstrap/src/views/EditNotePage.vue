<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

        <form class="form note-form mt-4" :style="{ opacity: (isUpdatingNote ? 0.3 : 1) }" @submit.prevent="triggerSubmit">
          <h2 class="text-center mt-1 mb-4">Edit note</h2>

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
  import NotesDataMixin from "../mixins/NotesDataMixin.js";

  export default {
    name: 'edit-note-page',
    mixins: [NotesDataMixin],

    data: () => {
      return {
        id: undefined,
        title: '',
        content: '',

        internalError: null
      }
    },


    watch: {
      notes: {
        immediate: true,

        handler() {
          if (this.notes && this.$route.params.id) {
            let note = this.notes.find(note => note.id == this.$route.params.id);
            if (note) {
              this.id = note.id;
              this.title = note.title;
              this.content = note.content;

              this.$forceUpdate();
            }
          }
        }
      }
    },

    computed: {
      isUpdatingNote: function() {
        return (this.$store.state.notes.isUpdatingNote);
      },

      failedUpdatingNote: function() {
        return (this.$store.state.notes.failedUpdatingNote);
      }
    },

    methods: {
      triggerSubmit: function() {

        if (!this.id || !this.title || !this.content){
          this.internalError = 'Please complete all fields and try again!';
          return /* don't submit form */;
        }

        this.$store.dispatch('updateNote', { noteId: this.id, title: this.title, content: this.content });
      }
    }
  };
</script>
