import axios from "axios";
import { Storage } from '@capacitor/storage';
import router from '../../router';
const state = {
    lives:[],
    live:{
        "id": 3,
        "name": "Dominio Medios Canal 1",
        "image_url": "1659044925.webp",
        "url": "https://streamyes.alsolnet.com/dominiomedios/live/playlist.m3u8"
    }
};
const getters = {};

const actions = {
    getLives({commit}, values){
        Storage.get({ key: 'token' }).then(resp=>{
            axios({
              method: "GET",
              url: "https://gv.unocrm.mx/api/v1/live",
              headers: {
                "Authorization": "Bearer " + resp.value,
              },
            }).then(response => {
              commit("setLives", response.data.data);
            });
        })
    },
    currentLive({commit}, value){
        commit("setLive", value);
        //router.push('/live/'+value.id)
    },
    getLive({commit}, id){
        Storage.get({ key: 'token' }).then(resp=>{
            axios({
                method: "GET",
                url: "https://gv.unocrm.mx/api/v1/live?filter[id]=" + id,
                headers: {
                    "Authorization": "Bearer " + resp.value,
                },
            }).then(response => {
                commit("setLive", response.data.data[0]);
            })
        });
    },
};

const mutations = {
    setLives(state, data){
        state.lives = data;
    },
    setLive(state, data){
        state.live = data;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}