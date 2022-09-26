<template>
  <ion-app :style="background">
    <div id="container" v-if="logo||(!dialog && token==='')">

      <ion-img style="margin:30px; margin-bottom:20vh;" src="/title-grey.png" ></ion-img>
      <ion-img style="margin:30px;" src="/isotipo.png" ></ion-img>

    </div>

    <div id="container" v-else-if="dialog">
      <ion-img style="margin:0px;" src="/telcel.jpg" ></ion-img>
    </div>

    <ion-content id="menuContent" v-if="!dialog && token">
      
        
          
        <ion-page>
          
          <ion-tabs>
            <ion-header>
              <ion-toolbar style="padding-top:0px;">
                <ion-row  style="background:#4d30f2;">
                  <ion-col size="2">
                    <ion-icon style="margin:10px; font-size:25px;" @click="openMenu()" :icon="menu"></ion-icon>
                  </ion-col>
                  <ion-col size="8">
                    <ion-row class="ion-justify-content-center">
                            <ion-col>

                      <ion-img src="/Texto GAMAVISION en Blanco.png" ></ion-img>
                            </ion-col>
                    </ion-row>
                  </ion-col>
                  <ion-col size="2">
                      <ion-icon style="margin:10px; font-size:25px;" @click="showSearch=!showSearch" :icon="search"></ion-icon>
                    
                  </ion-col>
                </ion-row>
                <ion-searchbar v-model="searchInput" @keydown.enter="searchNow()" placeholder="Buscar" v-if="showSearch" ></ion-searchbar>
                <ion-progress-bar v-if="loader" type="indeterminate"></ion-progress-bar>
              </ion-toolbar>
            </ion-header>
            <ion-router-outlet/>

            <ion-tab-bar slot="bottom">
              <ion-tab-button tab="home" href="/home" style="background:#4d30f2!important; color:white!important;">
                <ion-icon :icon="newspaper" />
                <ion-label>Noticias</ion-label>
              </ion-tab-button>
              
              <ion-tab-button tab="live" href="/lives" style="background:#4d30f2!important; color:white!important;">
                <ion-icon :icon="videocam" />
                <ion-label>En Vivo</ion-label>
              </ion-tab-button>
              
              <ion-tab-button tab="podcast" href="/podcast" style="background:#4d30f2!important; color:white!important;">
                <ion-icon :icon="radio" />
                <ion-label>Podcast</ion-label>
              </ion-tab-button>
              
            </ion-tab-bar>
          </ion-tabs>
        </ion-page>


    </ion-content>
    
    <ion-menu v-if="!dialog && token" menu-id="app-menu" type="push" content-id="main-content" contentId="menuContent">
      <ion-header style="padding:30px;">
        <p style="font-size: 14px; color: #b9b9b9; transform: translateY(-20px);">{{currentDate}} {{time}}</p>
        <div style="width:100%; margin-bottom:20px;">
          <ion-item v-if="showWeather">
            <ion-avatar slot="start">
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
            </ion-avatar>
            <ion-item slot="end">
              <ion-avatar>
                <img :src="weatherIcon" />
              </ion-avatar>
              <ion-label>
                <h3>{{weather.main.temp.toFixed(0)}}°C</h3>
              </ion-label>
            </ion-item>
          </ion-item>
          
        </div>
        <div>
          <span color="primary" style="font-size:21px; font-weight:600;">
            {{currentUser.name}}
          </span>
          <br>
          <span style="filter:opacity(0.5);">{{currentUser.email}}</span>
        </div>
      </ion-header>

      <ion-content :scroll-events="true" style="height:calc(100vh - 220px)!important;">
            <ion-list style="height:calc(100vh - 220px)!important; overflow-y: scroll;">
              <ion-item v-for="(category, index) in categories" v-bind:key="index" :href="'/posts/' + category.id"><!--ion-icon style="margin-right:10px; font-size:16px;" :icon="star" /-->- {{category.name}}</ion-item>
            </ion-list>
        </ion-content>

      <ion-button @click="logout()" style="margin:0px!important; font-weight:600;" expand="full">Cerrar Sesión</ion-button>
    </ion-menu>

    <login v-if="!dialog && !token"/>
  </ion-app>
</template>

<script>
import { menuController, IonTitle, IonMenuToggle, IonList, IonButton, IonMenu, IonAvatar, IonSearchbar, IonApp, IonRouterOutlet, IonHeader, IonIcon, IonToolbar, IonImg, IonRow, IonCol, IonTabButton, IonLabel, IonTabBar, IonTabs, IonPage, IonContent, IonFooter, IonProgressBar, IonItem} from '@ionic/vue';
import { defineComponent } from 'vue';
import Login from "../src/views/Login"
import { search, newspaper, person, menu, radio, videocam, star} from "ionicons/icons"
import axios from 'axios';
import { Storage } from '@capacitor/storage';
import { ref } from 'vue'


export default defineComponent({
  name: 'App',
  components: {
    IonMenuToggle,
    IonTitle,
    IonList,
    IonButton,
    IonItem,
    IonAvatar,
    IonMenu,
    IonImg,
    IonApp,
    IonRouterOutlet,
    login:Login,
    IonHeader,
    IonIcon,
    IonToolbar,
    IonRow,
    IonCol,
    IonTabButton, 
    IonLabel,
    IonTabBar, 
    IonTabs, 
    IonPage, 
    IonContent,
    IonFooter,
    IonSearchbar,
    IonProgressBar
  },
  data() {
    return { 
      token: '',
      showSearch: false,
      searchInput:'',
      weatherIcon:'',
      weather:{},
      showWeather:false,
      dialog:true,
      logo:true
    };
  },
  setup(){
    var time = ref()
    setInterval(() => {
      var date = new Date()
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      time.value = strTime
    }, 1000)

    return{
      search, newspaper, person, menu, radio, videocam, star, time
    }
  },
  watch:{
    $route (to, from){
      if(from.fullPath == "/login" && to.fullPath == "/home"){
        this.checkLogin()
      }
    }
  },
  created(){
    this.checkLogin()
    this.$store.dispatch('posts/getPosts', 6)
    this.$store.dispatch('categories/getCategories').then(response=>{
      this.$store.dispatch('posts/getPostByCategory', {items_per_page:'&per_page=3', category:''})
    })
    var lat = 25.67507
    var lon = -100.31847
    var api_key = '76ece60b69182d0a3034049760725d54'
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + api_key + '&lang=sp&units=metric').then(response=>{
      this.weather = response.data
      this.weatherIcon = 'https://openweathermap.org/img/wn/'+response.data.weather[0].icon+'.png'
      this.showWeather = true
    })
  },
  computed:{
    background(){
      if(this.logo||(!this.dialog && this.token==='')){
        return "background:white;"
      }
    },
    currentDate(){
        // Creamos el objeto fecha instanciándolo con la clase Date
        const fecha = new Date()
        // Creamos array con los días de la semana
        const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        // Creamos array con los meses del año
        const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        // Construimos el formato de salida
        if(fecha.getUTCFullYear()!=new Date().getUTCFullYear()){
            return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()];
        }else{
            return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
        }
        
    },
    currentUser(){
      return this.$store.state.currentUser.user
    },
    loader(){
      return this.$store.state.search.loader
    },
    categories(){
      return this.$store.state.categories.categories
    }
  },
  mounted () {
    this.callFunction()
  },
  methods: {
    callFunction: function () {
      var v = this;
      setTimeout(function () {
        v.logo = false;
      }, 3000);
      setTimeout(function () {
        v.dialog = false;
      }, 7000);
    },
    playLive(){

      this.videoPlayer.play('https://streamyes.alsolnet.com/dominiomedios/live/playlist.m3u8')
    },
    
    checkLogin(){
      Storage.get({ key: 'token' }).then(resp=>{
        axios({
          method: "GET",
          url: "https://gv.unocrm.mx/api/v1/user/current",
          headers: {
            "Authorization": "Bearer " + resp.value,
          },
        }).then(response => {
          this.token = true
          this.$store.dispatch('currentUser/setUserNow', response.data.data)
        }).catch(error => {
          console.log('error')
          this.$store.dispatch('currentUser/logoutUser')
          this.token = false
        });
      }).catch(error => {
        console.log('error')
        this.$store.dispatch('currentUser/logoutUser')
        this.token = false
      });
    },
    logout(){
      this.$store.dispatch('currentUser/logoutUser')
      this.token = false
    },
    searchNow(){
      this.$store.dispatch('search/getResults', this.searchInput)
    },
    openMenu() {
      menuController.open('app-menu');
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>