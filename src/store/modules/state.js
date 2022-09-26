import axios from "axios";
const state = {
    states:[]
};
const getters = {};

const actions = {
    getStates({commit}){
        axios.get("https://gv.unocrm.mx/api/v1/states").then(response => {
            commit('setStates', response.data);
        });
    }
};

const mutations = {
    setStates(state, data){
        state.states = data;
    },
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}