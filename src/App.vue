<template>
  <v-app>
    <v-main>
      <TopBar/>
      <RouterView/>
      <BottomNav/>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/bars/TopBar.vue'
import BottomNav from './components/bars/BottomNav.vue'

export default {
  name: 'App',
  components: {
    TopBar, BottomNav
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
}
</style>
