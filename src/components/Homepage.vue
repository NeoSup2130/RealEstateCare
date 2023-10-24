<template>
    <v-row class="my-row ma-0">
      <v-col>
        <v-btn prepend-icon="mdi-bookmark-outline" class="text-capitalize" stacked>
        Scheduled
        </v-btn>
      </v-col>
      <v-col>
        <v-btn prepend-icon="mdi-check-circle" class="text-capitalize" stacked>
        Completed
        </v-btn>
      </v-col>
      <v-col>
        <v-btn prepend-icon="mdi-dots-grid" class="text-capitalize" stacked>
        Knowledge base
        </v-btn>
      </v-col>
      <v-col>
        <v-btn prepend-icon="mdi-cog" class="text-capitalize" stacked>
        Settings
        </v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'ContentHome'
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


