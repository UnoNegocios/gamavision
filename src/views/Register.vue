<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Crear una cuenta</ion-title>
          <!--ion-img style="width:80px; float:right; margin-right:20px; opacity:0.5;" src="/dominio-icon.png"></ion-img-->
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <ion-item>
          <ion-label position="fixed">Usuario</ion-label>
          <ion-input v-model="user.email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Contraseña</ion-label>
          <ion-input v-model="user.password" type="password"></ion-input>
        </ion-item>
        <ion-button expand="block" color="primary" style="margin:30px;" @click="login()">Entrar</ion-button>
        <span>¿No tienes cuenta?<a href="/register">Registrate Aquí</a></span>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonLabel, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Register',
  components: {
    IonContent,
    IonHeader,
    IonPage, 
    IonTitle,
    IonToolbar,
    IonInput,
    IonLabel,
    IonItem,
    IonButton
  },
  data() {
    return { 
      user: {
        email:'',
        password: ''
      }
    };
  },
  methods:{
    login(){
      this.$store.dispatch('currentUser/loginUser', this.user );
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
