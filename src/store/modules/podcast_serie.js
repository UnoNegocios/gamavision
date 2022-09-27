import axios from "axios";
import { Preferences } from '@capacitor/preferences';
const state = {
    series:[]
};
const getters = {};

const actions = {
    getSeries({commit}, values){

        Preferences.get({ key: 'token' }).then(resp=>{
            axios({
              method: "GET",
              url: "https://gv.unocrm.mx/api/v1/podcast_serie",
              headers: {
                "Authorization": "Bearer " + resp.value,
              },
            }).then(response => {
              commit("setSeries", response.data.data);
            });
        })
    }
};

const mutations = {
    setSeries(state, data){
        state.series = data;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}