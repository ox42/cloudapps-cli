const counter = {
    state: {
        counter: 0,
        lastAddition: null
    },

    mutations: {

        resetCounter(state) {
            state.counter = 0;
            state.lastAddition = null;
        },

        addValue(state, value) {
            state.counter += value;
            state.lastAddition = value;
        }
    },


    actions: {
        resetCounter({commit}) {
            commit("resetCounter");
        },


        addValue({commit, state}, value) {
            commit("addValue", value);
        }
    }
};

export default counter;
