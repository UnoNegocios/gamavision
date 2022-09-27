
import axios from "axios";
const state = {
    categories:[]
};
const getters = {};

const actions = {
    getCategories( {commit} ){
        return new Promise((resolve, reject) => {
            axios.get('https://gv.unocrm.mx/api/v1/news/categories').then(response => {
                commit('setCategories', response.data);
                resolve(response.data[0].id)
            })
        })
    },
};

const mutations = {
    setCategories(state, data){
        state.categories = data;
    },
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}