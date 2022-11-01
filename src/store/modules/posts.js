
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
        console.log(props)
        this.show_by_category = false
        var items_per_page = props.items_per_page
        var category = ''
        if(props.category!=''){
            category = '&filter[Categories.id]=' + props.category
        }

        return new Promise((resolve, reject) => {
            axios.get('https://gv.unocrm.mx/api/v1/news?itemsPerPage=' + items_per_page + category).then(response => {
                commit('setPostByCategory', response.data.data);
                state.show_by_category = true;
            }).finally(() => (resolve(false)))
        })
    },
    getPosts( {commit, state}, items_per_page ){
        return new Promise((resolve, reject) => {
            axios.get('https://gv.unocrm.mx/api/v1/news?itemsPerPage='+items_per_page).then(response => {
                commit('setPosts', response.data.data);
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