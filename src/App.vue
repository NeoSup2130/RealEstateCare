<template>
  <img alt="Real Estate Care logo" src="./assets/logo.png">
  <Homepage msg="Welcome to Real Estate Care App"/>
</template>

<script>
import Homepage from './components/Homepage.vue'

export default {
  name: 'App',
  components: {
    Homepage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(41,52,57);
  background-color: white;
  margin-top: 60px;
}
</style>
