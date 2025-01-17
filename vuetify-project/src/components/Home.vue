<template>
    <v-app id="HomePage">
      <!-- <v-toolbar class="signUpFormAppBar" style="justify-content: center !important;"> Sign Up Form </v-toolbar> -->
      <v-main  style="align-content: center;">
        <v-row style="justify-content: center; width: 100%;">
          <v-col cols="3" md="3" sm="3">
            <v-card style="border-radius: 20px; padding: 20px 0;">
              
            
        <v-card-title style="font-size: 30px; padding: 20px 50px 0;"> 
        Welcome To The Home Page
        </v-card-title>
        <v-card-text style="font-size: 18px; padding: 10px 50px ;">
        Please select from the options below 
        </v-card-text>
                
        <v-tooltip text="If you have already registered your account">
        <template v-slot:activator="{props}">
        <v-btn
        v-bind="props"
        color="purple"
        width="12vw"
        height="50px"
        style="font-size:18px; margin: 20px 0; justify-self: center; display: block;"
        rounded
        @click="loginPage"
        >
        Login
        </v-btn>
        </template>
        </v-tooltip>

        <v-tooltip text="If you are new user">
        <template v-slot:activator="{props}">
        <v-btn
        v-bind="props"
        color="purple"
        width="12vw"
        height="50px"
        style="font-size:18px; margin: 20px 0; justify-self: center; display: block;"
        rounded
        @click="signUpPage"
        >
        SignUp
        </v-btn>
        </template>
        </v-tooltip>        
        
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios'
  export default{
    name:'SignUp',
    data(){
        return{
        }
    },
    methods:{
      loginPage(){
        this.$router.push({name:"Login"})
      },
      signUpPage(){
        this.$router.push({name:"SignUp"})
      },
 
    },
  }

</script>

<style>
.formTextFields{
  padding: 0 50px;
}
/* .formTextFields.v-text-field .v-field--no-label input{
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
} */
.formTextFields.v-text-field .v-input__details {
  padding-inline: 0;
}
.formTextFields .v-messages__message{
  font-size: medium;
}
.formLabels.v-card-text{
  font-weight: 500;
  font-size: medium;
  padding: 5px 50px;
}
#HomePage {
  background: url('@/assets/image.png');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>