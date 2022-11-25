<template>
  <ion-page>
    <ion-content :fullscreen="true">
          <ion-card :router-link="`/podcast_list/${serie.id}`" v-for="(serie, index) in series" v-bind:key="index" @click="selected=item" style="padding:0px 0px; margin: 10px;">
            <ion-row>
              <ion-col size="4" style="flex: none; margin: auto;">
                <ion-img style="margin-right:5px;" :src="'https://gv.unocrm.mx/files/' + serie.image_url"></ion-img>
              </ion-col>
              <ion-col size="8">
                <ion-card-title style="margin-bottom:5px; font-size:18px;">{{serie.name}}</ion-card-title>

                <ion-chip style="font-size:10px; padding: 10px!important; margin-bottom:5px; height: 20px;">
                  <ion-icon style="font-size: 10px;" :icon="list" color="dark"></ion-icon>
                  <ion-label>{{serie.podcasts_count}} Episodios</ion-label>
                </ion-chip>

                <br/>

                <span>{{serie.description}}</span>
              </ion-col>
            </ion-row>
            
          </ion-card>

          

          <ion-slides v-if="banners_slider!=undefined" pager="false" :options="slideOpts">
            <ion-slide v-for="banner in banners_slider" :key="banner.id" @click="clicAd(banner)">
                <ion-img style="margin:30px;" :src="banner.image_url" ></ion-img>
            </ion-slide>
          </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonText, IonContent, IonLabel, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButton, IonCard, IonCardTitle, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import { list } from "ionicons/icons"
import axios from 'axios'

export default defineComponent({
  name: 'Podcast',
  components: {
    IonLabel,
    IonRow,
    IonCol,
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
  data(){
    return{
      slideOpts: {
        speed: 2000,
        autoplay:true,
      },
      banners_slider:undefined
    }
  },
  setup(){
    return{
      list
    }
  },
  created(){
    this.$store.dispatch('podcast_serie/getSeries');
    this.$store.dispatch('live/getLives');
    var perro = 'Podcast'
    axios.get('https://gv.unocrm.mx/api/v1/display_ad?filter[is_in_time]=true&filter[is_in_hour]=true&filter[position]=' + perro + '&itemsPerPage=3').then(response=>{
      this.banners_slider = response.data
    })
  },
  computed:{
    series(){
      return this.$store.state.podcast_serie.series
    }
  },
  methods:{
    clicAd(ad){
      fetch('https://gv.unocrm.mx/api/v1/click_ad/' + ad.id).then(response =>{
        window.open(ad.url, '_blank');
      });
    },
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