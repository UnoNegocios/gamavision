import axios from "axios";
import router from '../../router';

import { Preferences } from '@capacitor/preferences';
const state = {
  user: {},
  token:null
};
const getters = {};
const actions = {
  getToken({ commit }) {
    Preferences.get({ key: 'token' }).then(resp=>{
      commit("setToken", resp)
    });
  },
  registerUser({commit}, user){
    axios.post("https://gv.unocrm.mx/api/v1/user/register", user).then(response=>{
      commit("setToken", response.data.access_token)
      Preferences.set({
        key: 'token',
        value: response.data.access_token,
      }).then(resp=>{
        router.push('/home')
      });
    })
  },
  getUser({ commit }) {
    Preferences.get({ key: 'token' }).then(resp=>{
      axios({
        method: "GET",
        url: "https://gv.unocrm.mx/api/v1/user/current",
        headers: {
          "Authorization": "Bearer " + resp.value,
        },
      }).then(response => {
        commit("setUser", response.data.data);
      });
    })
  },
  loginUser({commit}, user) {
    axios.post("https://gv.unocrm.mx/api/v1/user/login", {
        email: user.email,
        password: user.password
      })
      .then(response => {
          commit("setToken", response.data.access_token)
          Preferences.set({
            key: 'token',
            value: response.data.access_token,
          }).then(resp=>{
            router.push('/home')
          });
      })
  },
  logoutUser({commit}) {
    commit("setToken", null)
    Preferences.remove({
      key: 'token'
    }).then(resp=>{
      router.push('/login') 
    });
  },
  setUserNow({commit}, user){
    commit("setUser", user);
  }
};
const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  setToken(state, data){
    state.token = data
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
