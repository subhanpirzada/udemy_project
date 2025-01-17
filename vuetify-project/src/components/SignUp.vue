<template>
    <v-app id="SignUpMain">
      <!-- <v-toolbar class="signUpFormAppBar" style="justify-content: center !important;"> Sign Up Form </v-toolbar> -->
      <v-main  style="align-content: center;">
        <v-row style="justify-content: center; width: 100%;">
          <v-col cols="3" md="3" sm="3">
            <v-card style="border-radius: 20px; padding: 20px 0;" elevation="10">
              <v-form ref="form">
                
                <v-card-title style="font-size: 30px; padding: 20px 50px 0;"> Sign Up </v-card-title>
                <v-card-text style="font-size: 18px; padding: 10px 50px ;"> Fill the form below in order to create account </v-card-text>
                
                <v-card-text 
                class="formLabels"> 
                First Name 
                </v-card-text>                
                <v-text-field 
                class="formTextFields"
                v-model="form.firstName"
                required
                type="text"
                variant="outlined"
                :rules="nameRules"
                >
                </v-text-field>

                <v-card-text 
                class="formLabels"> 
                Last Name 
                </v-card-text>
                <v-text-field 
                class="formTextFields"
                v-model="form.lastName"
                required
                type="text"
                variant="outlined"
                :rules="nameRules"
                >
                </v-text-field>

                <v-card-text 
                class="formLabels"> 
                User Name 
                </v-card-text>
                <v-text-field 
                class="formTextFields"
                v-model="form.userName"
                required
                type="text"
                variant="outlined"
                :rules="userNameRules"
                >
                </v-text-field>

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
                
                <v-card-text class="formLabels"> Phone Number </v-card-text>
                <v-text-field
                class="formTextFields"
                v-model="form.number"
                required
                type="number"
                :rules="phoneNumberRules"
                variant="outlined">

                </v-text-field>

                <v-card-text class="formLabels">Select Gender</v-card-text>
                <v-radio-group
                v-model="form.gender"
                inline
                style="padding: 0 18px;"
                color="purple"
                >
                <v-radio value="male" style="margin: 0 50px;">Male</v-radio>
                <v-radio value="female">Female</v-radio>
                </v-radio-group>

                <v-card-text 
                class="formLabels" 
                v-if="this.showGenderError===true" 
                style="color: red !important;"
                >
                Please select a Gender
                </v-card-text>
                
                <!-- <v-input class="formTextFields" type="radio">
                Male
                </v-input> -->

                
                <v-btn
                color="purple"
                width="15vw"
                height="50px"
                style="font-size:18px; margin: 10px 0; justify-self: center; display: block;"
                rounded
                @click="submitForm"
                >
                Sign Up
                </v-btn>

              <v-card-text 
              style="text-align: center; font-size: medium;"
              >
              Already Have An Account ? 
              <a
              style="color: lightskyblue;" 
              href="http://localhost:3000/login"
              > 
              Login 
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
              firstName:'',
              lastName:'',
              userName:'',
              emailAddress:'',
              password:'',
              gender:'',
            },
            showGenderError:false,
            showPassword:false,
            formSubmit:false,
            nameRules:[
              v=> !!v || 'Name is Required'
            ],
            userNameRules:[
              v=> !!v || 'User Name is Required',
              v=> (v && v.length >=5 ) || 'User Name must have at 5 characters',
            ],
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
      async submitForm(){
        await this.validate()
        if(this.formSubmit===true){
          console.table("Form Data",this.form)
          axios.post("http://localhost:5000/userInfo",this.form)
          this.$router.push({name:"Login"})
          this.reset()
        }
        else{
          alert('Form is Invalid')
        }
      },
      async validate () {
        if(this.form.gender===''){
          this.showGenderError=true
        }
        else{
          this.showGenderError=false
        }
        if(this.showGenderError===false){
          const { valid } = await this.$refs.form.validate()
          if (valid){
            this.formSubmit=true
          }
        }
      },
      reset () {
        this.$refs.form.reset()
        
      },
      resetValidation () {
        this.$refs.form.resetValidation()
        this.showGenderError=false,
        this.showPassword=false,
        this.formSubmit=false
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