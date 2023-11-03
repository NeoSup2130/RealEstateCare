<template>
    <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="(category, index) in Object.keys(inspection)" :key="index">
            <InspectionCategory :category="category" :inspectionTable="inspection">
                <template v-slot:default="slotProps">
                    <DamageCategory v-if="category==='Damages'" :dataTable="slotProps.dataTable" :category="category"
                    @category-saved="updateCategory">
                    </DamageCategory>
                    <MaintenanceCategory v-else-if="category==='Maintenance'" :dataTable="slotProps.dataTable" :category="category"
                    @category-saved="updateCategory">
                    </MaintenanceCategory>
                    <ModificationsCategory v-else-if="category==='House adjustments'" :dataTable="slotProps.dataTable" :category="category"
                    @category-saved="updateCategory">
                    </ModificationsCategory>
                    <TechnicalCategory v-else-if="category==='Technical installations'" :dataTable="slotProps.dataTable" :category="category"
                    @category-saved="updateCategory">
                    </TechnicalCategory>
                </template>
            </InspectionCategory>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import InspectionCategory from "@/components/shared/InspectCategory.vue";
import DamageCategory from "@/components/shared/DamageCategory.vue";
import MaintenanceCategory from "@/components/shared/MaintenanceCategory.vue";
import ModificationsCategory from "@/components/shared/ModificationsCategory.vue";
import TechnicalCategory from "@/components/shared/TechnicalCategory.vue";

import {useInspectionStore} from "@/stores/inspectionStore.js";


export default {
    name: "InspectionPanel",
    components: { InspectionCategory, DamageCategory, MaintenanceCategory, ModificationsCategory, TechnicalCategory },
    props : {
        inspection : Object,
        inspectID : String
    },
    data() {
        return {
            selectedIndex : null,
            store : useInspectionStore()
        }
    },
    methods : {
        updateCategory(payload) 
        {
            console.log("old inspect: "+JSON.stringify(this.inspection));
            let newInspection = this.inspection;
            newInspection[payload.category] = payload.data;
            console.log("new inspect: "+JSON.stringify(newInspection));
            this.store.updateInspection(this.inspectID, newInspection);
        }
    }
}
</script>

<style>
table {
    width: 100%;
}
th, td {
    width: 50%;
    text-align: left;
}
th {
    vertical-align: text-top;
}
</style>