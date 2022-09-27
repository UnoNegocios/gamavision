import axios from "axios";
import { Preferences } from '@capacitor/preferences';
const state = {
    podcasts:[],
    currentPodcast:{}
};
const getters = {};

const actions = {
    getPodcasts({commit}, serie_id){

        Preferences.get({ key: 'token' }).then(resp=>{
            axios({
              method: "GET",
              url: "https://gv.unocrm.mx/api/v1/podcasts?filter[podcast_series_id]=" + serie_id,
              headers: {
                "Authorization": "Bearer " + resp.value,
              },
            }).then(response => {
              commit("setPodcasts", response.data.data);
              axios({
                method: "GET",
                url: "https://gv.unocrm.mx/api/v1/podcast_serie?filter[id]=" + serie_id,
                headers: {
                  "Authorization": "Bearer " + resp.value,
                },
              }).then(response => {
                commit("setCurrentPodcast", response.data.data[0]);
              })
            });
        })
    }
};

const mutations = {
    setPodcasts(state, data){
        state.podcasts = data;
    },
    setCurrentPodcast(state, data){
        state.currentPodcast = data;
    },
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}