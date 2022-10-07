import axios from "axios";
import { Preferences } from '@capacitor/preferences';
import router from '../../router';
const state = {
    lives:[],
    live:[],
    show:false
};
const getters = {};

const actions = {
    getLives({commit, state}, values){
        state.show = false
        Preferences.get({ key: 'token' }).then(resp=>{
            axios({
              method: "GET",
              url: "https://gv.unocrm.mx/api/v1/live",
              headers: {
                "Authorization": "Bearer " + resp.value,
              },
            }).then(response => {
              commit("setLives", response.data.data);
              commit("setLive", response.data.data[0]);
            });
        })
    },
    currentLive({commit, state}, value){
        state.show = false
        var lives = JSON.parse(JSON.stringify(state.lives))
        var live = JSON.parse(JSON.stringify(value))
        commit("setLive", lives.filter(item=>item.id == live.id)[0])
    },
};

const mutations = {
    setLives(state, data){
        state.lives = data;
        state.show = true
    },
    setLive(state, data){
        state.live = data;
        state.show = true
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}