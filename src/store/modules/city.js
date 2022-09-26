import axios from "axios";
const state = {
    cities:[]
};
const getters = {};

const actions = {
    getCities({commit}, value){
        axios.get("https://gv.unocrm.mx/api/v1/cities?filter[state.name]=" + value).then(response => {
            commit('setCities', response.data);
        });
    }
};

const mutations = {
    setCities(state, data){
        state.cities = data;
    },
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}