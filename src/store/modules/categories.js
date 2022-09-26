
import axios from "axios";
const state = {
    categories:[]
};
const getters = {};

const actions = {
    getCategories( {commit} ){
        return new Promise((resolve, reject) => {
            axios.get('https://dominiomedios.com/wp-json/wp/v2/categories?include=23,26,24,21,13,20,22').then(response => {
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