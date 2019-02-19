import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            notes: state => state.notes.notes,
            isLoadingNotes: state => state.notes.isLoadingNotes
        })
    },

    methods: {
        ...mapActions({
            loadNotes: 'loadNotes'
        })
    },

    created: function() {
        //apart from mapState, mapActions
        //we can also access the store via this.$store
        if (!this.$store.state.notes.notes) {
            this.loadNotes();
        }
    }
};