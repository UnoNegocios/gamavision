<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-toolbar style="filter: brightness(2);">
        <ion-buttons slot="start">
          <!--ion-button :router-link="$router.options.history.state.back">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button-->
        </ion-buttons>
        <ion-title>Video en VIVO<!--{{live.name}}--></ion-title>
      </ion-toolbar>
      
        <ion-card v-if="showReproductor" style="margin:20px;">
            <video autoplay class="wp-video-shortcode" id="video-497065-1" style="width:100%; height:45vw;" preload="metadata" controls="controls">
                <source type="video/mp4" :src="live.url">
                <a :href="live.url">
                {{live.url}}
                </a>
            </video>
        </ion-card>

        {{live}}

        <ion-toolbar style="filter: brightness(2);">
        <ion-buttons slot="start">
          <!--ion-button :router-link="$router.options.history.state.back">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button-->
        </ion-buttons>
        <ion-title>Audio en VIVO<!--{{live.name}}--></ion-title>
      </ion-toolbar>

        <ion-card v-if="showReproductor" style="background:transparent; margin:30px;">
            <video style="height: 55px; width: 100%;" controls autoplay name="media"><source :src="live.url" type="audio/mpeg"></video>
        </ion-card>

        

        <div>
          <ion-img style="margin:30px;" src="https://prodynamics.vtexassets.com/assets/vtex.file-manager-graphql/images/9eaeb7fe-5f39-4524-874a-51a1d12717c8___ddbc1044de0ae7e7b7fe580d9b4a1314.jpg" ></ion-img>
        </div>

        <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="(live, index) in lives" v-bind:key="index">
            <div :style="'background-image: url(https://gv.unocrm.mx/files/' + live.image_url + '); background-repeat: no-repeat; background-size: cover;'">
              <ion-card @click="openLive(live)" :style="'background-image: linear-gradient(rgb(0 0 0 / 0%), rgb(0 0 0 / 69%); height:40vw; background-color: rgb(255 0 0 / 0%); margin:0px;'">
                <ion-card-header style="position: absolute; bottom: 0;">
                  <ion-card-title style="color:white; font-size:18px; padding:10px;">{{live.name}}</ion-card-title>
                </ion-card-header>
              </ion-card>
            </div>
          </ion-col>

          
        </ion-row>
      </ion-grid>

        
        

    </ion-content>
  </ion-page>
</template>

<script>
import { IonText, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButton, IonCard, IonCardTitle, IonImg, IonCol, IonGrid, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import { arrowBack } from "ionicons/icons"

export default defineComponent({
  name: 'Live',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSlides, 
    IonSlide,
    IonButton,
    IonText,
    IonCard,
    IonCardTitle,
    IonImg,
    IonCol, 
    IonGrid, 
    IonRow
  },
  setup(){
    return{
      arrowBack,
    }
  },
  computed:{
    live(){
      return this.$store.state.live.live
    },
    lives(){
      return this.$store.state.live.lives
    },
    showReproductor(){
      return this.$store.state.live.show
    }
  },
  methods:{
    openLive(live){
      this.$store.dispatch('live/currentLive', live)
    }
  },
  created(){
    this.$store.dispatch('live/getLives');
  }
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