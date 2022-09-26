<template>
  

  <ion-page>
    <ion-content :fullscreen="true">
      <ion-toolbar style="filter: brightness(2);">
        <ion-buttons slot="start">
          <ion-button :router-link="$router.options.history.state.back">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-chip slot="end" style="transform:scale(0.8);">
          <ion-icon :icon="list" color="dark"></ion-icon>
          <ion-label>{{currentPodcast.podcasts_count}} Episodios</ion-label>
        </ion-chip>

        <ion-title>{{currentPodcast.name}}</ion-title>
      </ion-toolbar>

      
      <div>
        <ion-img style="margin:30px;" src="https://kfc.com.mx/Content/OnlineOrderingImages/Menu/Category/Carousel/BOX_5en1.jpg?v=0.1" ></ion-img>
      </div>


      <ion-card v-for="(podcast, index) in podcasts" v-bind:key="index" style="background-color:#891235; padding:20px;">
        <!--AudioPlayer :option="podcast"/-->
        <iframe id='audio_53139919' frameborder='0' allowfullscreen='' scrolling='no' height='190' style='width:100%; border-radius: 10px;' :src="podcast.url" loading='lazy'></iframe>
        <ion-card-content style="color:white; line-height:18px;">{{podcast.description}}</ion-card-content>
      </ion-card>

      

    </ion-content>
  </ion-page>
</template>

<script>
import { IonText, IonContent, IonLabel, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButton, IonCard, IonCardTitle, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'
import { list, arrowBack } from "ionicons/icons"

export default defineComponent({
  name: 'SerieDetail',
  components: {
    IonLabel,
    IonRow,
    IonCol,
    AudioPlayer,
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
    IonImg
  },
  setup(){
    return{
      list,
      arrowBack
    }
  },
  data(){
    return{
      
    }
  },
  created(){
    this.$store.dispatch('podcast/getPodcasts', this.$route.params.id);
  },
  computed:{
    podcasts(){
      return this.$store.state.podcast.podcasts
    },
    currentPodcast(){
      return this.$store.state.podcast.currentPodcast
    }
  },
  methods:{
    /*
    playAudio(id) {
        document.getElementById(id).play();
        this.currentDuration = document.getElementById(id).getDuration();
    },
    pauseAudio(id){
      document.getElementById(id).pause();
    },
    stopAudio(id){
      document.getElementById(id).stop();
    },
    */
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