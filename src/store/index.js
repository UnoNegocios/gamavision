import Vue from 'vue'
import Vuex from 'vuex'

import currentUser from "./modules/currentUser"
import search from  "./modules/search"
import state from  "./modules/state"
import city from  "./modules/city"
import live from  "./modules/live"
import podcast from "./modules/podcast"
import podcast_serie from "./modules/podcast_serie"
import categories from "./modules/categories"
import posts from "./modules/posts"

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        currentUser,
        search,
        state,
        city,
        live,
        podcast_serie,
        podcast,
        categories,
        posts
    }
})
