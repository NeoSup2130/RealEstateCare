<template>
    <v-row class="my-row ma-0">
      <template v-for="(redirector, index) in redirectors" v-bind:key="index">
        <v-col>
          <v-btn :prepend-icon=redirector.icon class="text-capitalize" stacked 
          @click="handleClick(redirector.link)">
          {{redirector.name}}
          </v-btn>
        </v-col>
      </template>
    </v-row>
</template>

<script>
import {useNavigationStore} from "@/stores/navigationStore.js";

export default {
  name: 'ContentHome',
  data() {
    return {
      store : useNavigationStore(),
      redirectors : {
        schedule : {
          name : "Scheduled",
          icon : "mdi-bookmark-outline",
          link: "schedule"
        },
        completed : {
          name : "Completed",
          icon : "mdi-check-circle",
          link: "completed"
        },
        knowlegde : {
          name : "Knowlegde base",
          icon : "mdi-dots-grid",
          link: "knowlegdebase"
        },
        settings : {
          name : "Settings",
          icon : "mdi-cog",
          link: "settings"
        }
      }
    }
  },
  methods : {
      handleClick(link)
      {
        if(this.store.set(link))
          this.sendToPage(link);
      }
  }
}
</script>

<style scoped>
.my-row {
  height: calc(100% - 56px);
}

.v-col {
  flex-basis: auto;
  max-width: 50%;
}

.v-col .v-btn {
  width: 100%;
  height: 100%;
  font-size: x-large;
}
</style>


