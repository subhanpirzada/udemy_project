<template>
    <v-app id="SignUpMain">
      <!-- <v-toolbar class="signUpFormAppBar" style="justify-content: center !important;"> Sign Up Form </v-toolbar> -->
      <v-main  style="align-content: center;">
        <v-row style="justify-content: center; width: 100%;">
          <v-col cols="3" md="3" sm="3">
            <v-card style="border-radius: 20px; padding: 20px 0;">
              <v-form ref="form">
                
                <v-card-title style="font-size: 30px; padding: 20px 50px 0;"> Login </v-card-title>
                <v-card-text style="font-size: 18px; padding: 10px 50px ;"> Enter the credentials in order to acess your account </v-card-text>
                

                <v-card-text 
                class="formLabels"> 
                Email Address
                </v-card-text>
                <v-text-field 
                class="formTextFields"
                v-model="form.emailAddress"
                required
                type="email"
                variant="outlined"
                :rules="emailRules"
                >
                </v-text-field>

                <v-card-text 
                class="formLabels"> 
                Password
                </v-card-text>
                <v-text-field 
                class="formTextFields"
                v-model="form.password"
                required
                :type="showPassword ? 'text': 'password'"
                :rules="[v => !!v || 'Password Field is Required']"
                autocomplete="current-password"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword=!showPassword"
                variant="outlined"
                >
                </v-text-field>
                
                <v-btn
                color="purple"
                width="12vw"
                height="50px"
                style="font-size:18px; margin: 20px 0; justify-self: center; display: block;"
                rounded
                @click="loginForm"
                >
                Login
                </v-btn>

              <v-card-text 
              style="text-align: center; font-size: medium;"
              >
              Dont have an Account ?
              <a
              style="color: lightskyblue;" 
              href="http://localhost:3000/signup"
              > 
              Sign Up 
              </a>
            </v-card-text>
            
              </v-form>
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
            form:{
              emailAddress:'',
              password:'',
            },
            showPassword:false,
            formSubmit:false,
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            phoneNumberRules:[
              v=> !!v || 'Phone Number is Required',
              v=> (v && v.length >=10 ) || 'Phone Number must be 10 characters long'
            ]  
            
        }
    },
    methods:{
      async loginForm(){
        await this.validate()
        if(this.formSubmit===true){
          console.table(this.form)
          let info= await axios.get(`http://localhost:5000/userInfo?emailAddress=${this.form.emailAddress}&password=${this.form.password}`)
          console.log(info.data.length)
          if(info.status===200 && info.data.length){
              this.$router.push({name:"DataTable"})
              this.reset()
          }
          else {
             alert("Invalid email or password");
          }
        }
        else{
          alert('Form is Invalid')
        }
      },
      async validate () {
          const { valid } = await this.$refs.form.validate()
          if (valid){
            this.formSubmit=true
          }
      },
      reset () {
        this.$refs.form.reset()        
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
#SignUpMain {
  background: url('@/assets/image.png');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>