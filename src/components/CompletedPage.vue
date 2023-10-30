<template>
    <h2 class="mt-2">Completed inspections</h2>
    <v-divider class="w-50 mx-auto my-1" thickness="3"></v-divider>
    <ProgressBar :display="this.isLoading"/>

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
import {useInspectionStore} from "@/stores/inspectionStore.js";

    export default {
        name: "CompletedView",
        components: { InspectionPanel, ProgressBar },
        data() {
            return {
                store : useInspectionStore(),
            }
        },
        methods : {
            showInspection(e)
            {
                window.alert(e.id);
            },
            fetchInspections()
            {
                this.store.fetchInspections();
            }
        },
        computed : {
            inspections() {
                return this.store.inspections;
            },
            isLoading() {
                if (this.store)
                {
                    return this.store.isLoading;
                } 
                return true;
            },
            error() {
                return this.store.errors;
            }
        },
        mounted()
        {
            if(this.inspections.length == 0) 
            {
                this.fetchInspections();
            }
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