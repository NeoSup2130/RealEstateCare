<template>
    <h2 class="mt-2">Completed inspections</h2>
    <v-divider class="w-50 mx-auto my-1" thickness="3"></v-divider>
    <ProgressBar :display="this.inspections == null"/>

    <div >
    <v-expansion-panels v-if="inspections != null" >
      <v-expansion-panel v-for="inspection in inspections" :key="inspection.id" class="ma-2">
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          <v-row>
            <v-col> Inspection Nr. {{ inspection.id }} </v-col>
            <v-col> Date. {{ inspection.date }} </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="category-view">
            <InspectionPanel v-for="(item, index) in inspection.items" :key="index" :inspection="item">
            </InspectionPanel>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    </div>
</template>

<script>
import InspectionPanel from "@/components/shared/InspectionPanel.vue";
import ProgressBar from "@/components/shared/ProgressBar.vue";

    export default {
        name: "CompletedView",
        components: { InspectionPanel, ProgressBar },
        data() {
            return {
                inspections : null
            }
        },
        methods : {
            showInspection(e)
            {
                window.alert(e.id);
            }
        },
        async created() 
        {
            const response = await fetch("http://localhost:3000/inspections?_sort=date&_order=desc", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            this.inspections = data;
        }
    }
</script>

<style scoped>
.category-view :deep(.v-expansion-panel-text__wrapper){
    padding: 0 !important;
}

.centered {
    margin: calc(45vh - 92px) 0;
}
</style>