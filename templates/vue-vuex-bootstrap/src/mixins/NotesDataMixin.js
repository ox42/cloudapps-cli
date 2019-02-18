export default {
    computed: {
        notes: function () {
            return (this.$store.state.notes.notes);
        },

        isLoadingNotes: function () {
            return (this.$store.state.notes.isLoadingNotes);
        }
    },

    methods: {
        loadNotes() {
            this.$store.dispatch('loadNotes');
        }
    },

    created: function() {
        if (!this.$store.state.notes.notes) {
            this.loadNotes();
        }
    }
};