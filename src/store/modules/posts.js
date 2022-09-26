
import axios from "axios";
const state = {
    posts_by_category:[],
    posts:[],
    show_by_category:false,
    show:false
};
const getters = {};

const actions = {
    getPostByCategory( {commit, state}, props ){
        this.show_by_category = false
        var items_per_page = props.items_per_page
        var category = props.category
        return new Promise((resolve, reject) => {
            axios.get('https://dominiomedios.com/wp-json/wp/v2/posts?_fields=id,date,title,yoast_head_json.og_image'+category + items_per_page).then(response => {
                commit('setPostByCategory', response.data);
                state.show_by_category = true;
            }).finally(() => (resolve(false)))
        })
    },
    getPosts( {commit, state}, items_per_page ){
        return new Promise((resolve, reject) => {
            axios.get('https://dominiomedios.com/wp-json/wp/v2/posts?_embed=wp:term&per_page='+items_per_page).then(response => {
                commit('setPosts', response.data);
                state.show = true;
            }).finally(() => (resolve(false)))
        })
    },
};

const mutations = {
    setPostByCategory(state, data){
        state.posts_by_category = data;
    },
    setPosts(state, data){
        state.posts = data;
    },
    setShow(){
        state.show = true;
    },
    setShowByCategory(){
        state.show_by_category = true;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}