import axios from "axios";
import router from '../../router';

const state = {
  result: {},
  loader: false
};
const getters = {};
const actions = {
  getResults({commit}, filter) {
    commit("setLoader", true)
    axios.get('https://dominiomedios.com/wp-json/wp/v2/search?search='+filter).then(response => {
      commit("setResult", response.data)
      router.push('/search')
      commit("setLoader", false)
    }).catch(error=>{
      commit("setResult", error)
        router.push('/search')
        commit("setLoader", false)
    })
  },
};
const mutations = {
  setResult(state, data) {
    state.result = data;
  },
  setLoader(state, data) {
    state.loader = data;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
