<template>
    <h1 class="ma-0">Completed inspections</h1>
    <v-divider class="w-50 mx-auto" thickness="3"></v-divider>
    <ProgressBar :display="this.isLoading"/>
    <v-expansion-panels v-if="inspections != null" class="mt-5">
      <v-expansion-panel v-for="inspection in inspections" :key="inspection.id" class="ma-2">
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          <v-row>
            <v-col> Inspection Nr. {{ inspection.id }} </v-col>
            <v-col> Date. {{ inspection.date }} </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="category-view">
            <InspectionPanel v-for="(item, index) in inspection.items" :key="index" :inspection="item" :inspectID="inspection.id">
            </InspectionPanel>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import InspectionPanel from "@/components/shared/InspectionPanel.vue";
import ProgressBar from "@/components/shared/ProgressBar.vue";
import {useFormInspectionStore} from "@/stores/formStore.js";
import {useInspectionStore} from "@/stores/inspectionStore.js";

    export default {
        name: "CompletedView",
        components: { InspectionPanel, ProgressBar },
        mounted()
        {
            this.fetchInspections();
            
            if (this.inspectionForm.length == 0)
            {
                this.fetchForm();
            }
        },
        data() {
            return {
                store : useInspectionStore(),
                formStore : useFormInspectionStore(),
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
            },
            fetchForm()
            {
                this.formStore.fetchFormInspection();
            }, 
        },
        computed : {
            inspections() {
                return this.store.inspections;
            },
            inspectionForm() {
                return this.formStore.formInspection;
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