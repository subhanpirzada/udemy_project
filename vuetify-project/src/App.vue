<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SignUp from './components/SignUp.vue';

export default{
  nmae:'App',
  components:{
    SignUp,
  }
}
</script>

<style>
.signUpFormAppBar .v-toolbar__content{
  justify-content: center;
  background-color: navy;
  color: white;
  font-weight: 600;
  font-size: larger;
}
</style>