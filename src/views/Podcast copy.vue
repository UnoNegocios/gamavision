<template>
  <ion-page>
    <ion-content :fullscreen="true">
          <ion-card :router-link="`/podcast/${serie.id}`" v-for="(serie, index) in series" v-bind:key="index" @click="selected=item" style="padding:40px 30px;">
            <ion-row>
              <ion-col size="3">
                <ion-img style="margin-right:10px;" :src="'https://gv.unocrm.mx/files/' + serie.image_url"></ion-img>
              </ion-col>
              <ion-col size="9">
                <ion-card-title style="margin-bottom:10px; font-size:18px;">{{serie.name}}</ion-card-title>
                <span>{{serie.description}}</span>
              </ion-col>
            </ion-row>
            <ion-chip style="transform:scale(0.7); position:absolute; right:10px; top:15px;">
              <ion-icon :icon="list" color="dark"></ion-icon>
              <ion-label>{{serie.podcasts_count}} Episodios</ion-label>
            </ion-chip>
          </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonText, IonContent, IonLabel, IonRow, IonCol, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButton, IonCard, IonCardTitle, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import { list } from "ionicons/icons"

export default defineComponent({
  name: 'Podcast',
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
      list
    }
  },
  created(){
    this.$store.dispatch('podcast_serie/getSeries');
  },
  computed:{
    series(){
      return this.$store.state.podcast_serie.series
    }
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