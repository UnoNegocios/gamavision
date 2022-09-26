<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-toolbar style="filter: brightness(2);">
        <ion-buttons slot="start">
          <ion-button :router-link="$router.options.history.state.back">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <div style="margin-top:30px;">
          <ion-card style="margin-top:10px;" v-for="(element, index) in results" v-bind:key="index" :router-link="`/detail/${element.id}`">
              <ion-card-title class="ion-padding" style="font-size: 18px; font-weight: 600;">{{element.title}}</ion-card-title>
          </ion-card>
      </div>
      <div>
        <ion-img style="margin:30px;" src="https://www.publimetro.com.mx/resizer/YwH2DcYkFeyA5SMx-i-pwOwYSbQ=/800x0/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/LWTDE4M4H5C2NCFQOSUNLV2SOU.jpg" ></ion-img>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonText, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonButton, IonCard, IonCardTitle, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import { arrowBack } from "ionicons/icons"

export default defineComponent({
  name: 'HomePage',
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
    IonImg
  },
  setup(){
    return{
      arrowBack
    }
  },
  data(){
    return{
      
    }
  },
  computed:{
    results(){
        return this.$store.state.search.result
    }
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