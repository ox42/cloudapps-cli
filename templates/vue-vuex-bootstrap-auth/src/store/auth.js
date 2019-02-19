import router from '@/router';
import request from '@/lib/request';

let isAuthenticated = localStorage.getItem('App-Authentication-Token') ? true : false;

const auth = {
    state: {
        isAuthenticated: isAuthenticated,

        pendingAuthRequest: false,
        failedAuthRequest: false,

        lastError: null
    },

    mutations: {

        authInProgress(state) {
            state.isAuthenticated = false;

            state.pendingAuthRequest = true;
            state.failedAuthRequest = false;
            state.lastError = null;
        },

        successfulAuthRequest(state) {
            state.isAuthenticated = true;

            state.pendingAuthRequest = false;
            state.failedAuthRequest = false;
            state.lastError = null;
        },

        failedAuthRequest(state, error) {
            state.isAuthenticated = false;

            state.pendingAuthRequest = false;
            state.failedAuthRequest = true;
            state.lastError = error;
        },

        clearAuth(state) {
            state.isAuthenticated = false;

            state.pendingAuthRequest = false;
            state.failedAuthRequest = false;
            state.lastError = null;
        }
    },


    actions: {
        signInUser({commit}, { email, password }) {

            commit("authInProgress");
            handleAuthResponse(request.post('/Account/login', {email, password}), commit);
        },


        signUpUser({commit}, { name, email, password }) {

            commit("authInProgress");
            handleAuthResponse(request.post('/Account', {name, email, password}), commit);
        },

        logoutUser({commit}) {

            localStorage.removeItem('App-Authentication-Token');
            commit("clearAuth");
            commit("clearNotes");

            router.push('/');
        }
    }
};


function handleAuthResponse(request, commit) {

    request
        .then(({ data }) => {

            if (data.Authentication) {
                localStorage.setItem('App-Authentication-Token', data.Authentication);

                commit("successfulAuthRequest");
                router.push('/user/dashboard');
            } else {

                commit("failedAuthRequest", 'No authentication token received from server.');
            }
        }).catch((error) => {
            commit("failedAuthRequest", (error.response && error.response.data ? error.response.data.error : error) || error);
        });
}

export default auth;