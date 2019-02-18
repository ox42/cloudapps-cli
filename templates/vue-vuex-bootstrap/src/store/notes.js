import router from '@/router';
import request from '@/lib/request';

const notes = {
    state: {
        notes: null,

        isLoadingNotes: false,
        failedLoadingNotes: false,

        isUpdatingNote: false,
        failedUpdatingNote: false
    },

    mutations: {

        loadingInProgress(state) {
            state.notes = null;

            state.isLoadingNotes = true;
            state.failedLoadingNotes = false;
        },

        failedLoadingRequest(state) {
            state.notes = null;

            state.isLoadingNotes = false;
            state.failedLoadingNotes = true;
        },

        successfulLoadingRequest(state, notes) {
            state.notes = notes;

            state.isLoadingNotes = false;
            state.failedLoadingNotes = false;
        },

        updatingInProgress(state) {
            state.isUpdatingNote = true;
            state.failedUpdatingNote = false;
        },

        failedUpdateRequest(state) {
            state.isUpdatingNote = false;
            state.failedUpdatingNote = true;
        },

        successfulUpdateRequest(state) {
            state.isUpdatingNote = false;
            state.failedUpdatingNote = false;
        }
    },


    actions: {
        loadNotes({commit}) {

            commit("loadingInProgress");

            let authenticationToken = localStorage.getItem('App-Authentication-Token');
            return request.get('/Note', { headers: { Authentication: authenticationToken } })
                .then(({ data }) => {

                    //simulate delay, for loading effect
                    setTimeout(() => {

                        commit("successfulLoadingRequest", data);
                    }, 1500);
                })
                .catch(() => {
                    commit("failedLoadingRequest");
                });
        },


        createNote({commit, state}, { title, content }) {

            commit("updatingInProgress");

            let authenticationToken = localStorage.getItem('App-Authentication-Token');
            return request.post('/Note', { title, content }, { headers: { Authentication: authenticationToken } })
                .then(({ data }) => {

                    commit("successfulUpdateRequest");
                    commit("successfulLoadingRequest", [...state.notes, data ]);

                    router.push('/user/dashboard');
                })
                .catch(() => {
                    commit("failedUpdateRequest");
                });
        },


        updateNote({commit, state}, { noteId, title, content }) {

            commit("updatingInProgress");

            let authenticationToken = localStorage.getItem('App-Authentication-Token');
            return request.put('/Note/' + noteId, { title, content }, { headers: { Authentication: authenticationToken } })
                .then(({ data }) => {

                    commit("successfulUpdateRequest");

                    let note = { id: noteId, title, content };
                    commit("successfulLoadingRequest", state.notes.slice().map(current => {
                        if (current.id === note.id) {
                            return note;
                        } else {
                            return current;
                        }
                    }));

                    router.push('/user/dashboard');
                })
                .catch(() => {
                    commit("failedUpdateRequest");
                });
        }
    }
};

export default notes;