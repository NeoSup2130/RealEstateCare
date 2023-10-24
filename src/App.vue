<template>
  <v-app>
    <v-main>
      <TopBar/>
      <ContentHome/>
      <BottomNav/>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from './components/bars/TopBar.vue'
import ContentHome from './components/Homepage.vue'
import BottomNav from './components/bars/BottomNav.vue'

export default {
  name: 'App',
  components: {
    TopBar, ContentHome, BottomNav
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
