<template>
<v-system-bar class="bg-teal">
    <v-icon icon="mdi-wifi-strength-4"></v-icon>
    <v-icon icon="mdi-signal" class="ms-2"></v-icon>
    <v-icon icon="mdi-battery" class="ms-2"></v-icon>

    <span class="ms-2">15:05</span>
    </v-system-bar>
    <v-toolbar density="comfortable" title="">

      <v-list-item>
        <template v-slot:prepend>
          <v-avatar :image="getImgURL('icon-logo.png')"></v-avatar>
        </template>
            <v-list-item-title>Real Estate Care</v-list-item-title>
            <v-list-item-subtitle>Caring is in our nature</v-list-item-subtitle>
      </v-list-item>

      <v-spacer></v-spacer>
      <v-icon class="float-right ma-1" icon="mdi-bell"></v-icon>
      <v-icon class="float-right ma-1" icon="mdi-cog"></v-icon>
    </v-toolbar>
</template>

<script>
import imageLoader from "@/mixins/imageLoader";

export default {
  name: 'TopBar',
  mixins: [imageLoader]
}
</script>

<style scoped>
.v-toolbar {
  background-color: rgb(20,27,31);
}
.v-toolbar .v-icon {
  color: white;
}
.v-list-item {
  color: white;
  text-align: left;
}
</style>