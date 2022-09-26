<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" v-if="!register">Iniciar Sesión</ion-title>
          <ion-title size="large" v-else>Registrarse</ion-title>
          <!--ion-img style="width:80px; float:right; margin-right:20px; opacity:0.5;" src="/dominio-icon.png"></ion-img-->
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <div v-if="!register">
          <ion-item>
            <ion-label position="fixed">Usuario</ion-label>
            <ion-input v-model="user.email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="fixed">Contraseña</ion-label>
            <ion-input v-model="user.password" type="password"></ion-input>
          </ion-item>
          <ion-button expand="block" color="primary" style="margin:30px;" @click="login()">Entrar</ion-button>
        </div>

        <div v-else>
          <ion-item>
            <ion-label position="fixed">Nombre*</ion-label>
            <ion-input v-model="new_user.name"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="fixed">Apellido*</ion-label>
            <ion-input v-model="new_user.last"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="fixed">Estado*</ion-label>
            <ion-select v-model="user_state">
              <ion-select-option v-for="(state, index) in states" v-bind:key="index" :value="state.name" >{{state.name}}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item v-if="user_state!=''">
            <ion-label position="fixed">Ciudad*</ion-label>
            <ion-select v-model="new_user.city">
              <ion-select-option v-for="(city, index) in cities" v-bind:key="index" :value="city.name" >{{city.name}}</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="fixed">Cumpleaños*</ion-label>
                <ion-input button="true" id="click-trigger" v-model="new_user.birthdate"></ion-input>
                <ion-popover trigger="click-trigger" trigger-action="click">
                  <ion-datetime @ionChange="saveDate($event.detail.value)" presentation="date"></ion-datetime>
                </ion-popover>
          </ion-item>

          <ion-item>
            <ion-label position="fixed">Genero*</ion-label>
            <ion-select v-model="new_user.gender">
              <ion-select-option value="hombre">Hombre</ion-select-option>
              <ion-select-option value="mujer">Mujer</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-label position="fixed">Email*</ion-label>
            <ion-input v-model="new_user.email"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="fixed">Contraseña*</ion-label>
            <ion-input v-model="new_user.password"  type="password"></ion-input>
          </ion-item>

          <ion-button expand="block" color="primary" style="margin:30px;" @click="registerUser()">Registrarse</ion-button>
        </div>

        <span v-if="!register">¿No tienes cuenta?<a @click="newUser()">Registrate Aquí</a></span>
        <span v-else>¿Ya tienes cuenta?<a @click="register=false">Iniciar Sesión</a></span>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonSelect, IonPopover, IonDatetime, IonSelectOption, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonLabel, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonContent,
    IonHeader,
    IonPage, 
    IonTitle,
    IonToolbar,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonSelect, 
    IonSelectOption,
    IonDatetime,
    IonPopover
  },
  data() {
    return { 
      modal:false,
      user_state:'',
      new_user:{
          state:'',
          type:'casual',
          gender:'',
          city:'',
          birthdate:'',
          email:'',
          last:'',
          name:'',
          password:'',
          origin_id:1
      },
      register:false,
      user: {
        email:'',
        password: ''
      }
    };
  },
  watch: {
    user_state: {
      handler () {
        this.$store.dispatch('city/getCities', this.user_state);
        this.new_user.state = this.user_state
      },
      deep: true,
    },
  },
  methods:{
    saveDate(value){
      this.new_user.birthdate = value.slice(0,10)
    },
    newUser(){
      this.$store.dispatch('state/getStates');
      this.register = true
    },
    registerUser(){
      this.$store.dispatch('currentUser/registerUser', this.new_user );
  },
    login(){
      this.$store.dispatch('currentUser/loginUser', this.user );
    }
  },
  computed:{
    cities(){
      return this.$store.state.city.cities
    },
    states(){
      return this.$store.state.state.states
    },
    rules(){
      return{
        required: value => !!value || 'Campo requerido.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail inavlido.'
        },
        same_password: value => value === this.user.password || 'Las contraseñas no coinciden',
      }
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
.hacking-datetime {
  display: grid;
  grid-template-columns: 1fr 2fr;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
