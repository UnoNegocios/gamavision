import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import Lives from '../views/Lives.vue'
import Live from '../components/Live.vue'
import Podcast from '../views/Podcast.vue'
import PodcastDetail from '../components/SerieDetail.vue'
import Login from '../views/Login.vue'
import Detail from '../components/NewsDetails.vue'
import Search from '../components/SearchResults.vue'
import Register from '../views/Register.vue'
import Posts from '../views/Posts.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/posts/:id',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/podcast_list/:id',
    name: 'PodcastDetail',
    component: PodcastDetail
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/lives',
    name: 'Lives',
    component: Lives
  },
  {
    path: '/live/:id',
    name: 'Live',
    component: Live
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: Podcast
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
