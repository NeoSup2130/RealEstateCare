<template>
  <v-expansion-panel-title expand-icon="mdi-menu-down">
      {{ category }}
      </v-expansion-panel-title>
      <v-expansion-panel-text class="pa-4">
      <table>
          <tbody>
              <slot :dataTable="inspectionTable[category]"></slot>
          </tbody>
      </table>
  </v-expansion-panel-text>
</template>

<script>
export default {
  name : "InspectionCategory",
  props: {
    category : String,
    inspectionTable : Object,
  }
}
</script>