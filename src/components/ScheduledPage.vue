<template>
    <h1 class="ma-0">Active schedule</h1>
    <v-divider class="w-50 mx-auto" thickness="3"></v-divider>
    <ProgressBar :display="this.isLoading"/>

    <v-expansion-panels v-if="openForms != null" class="mt-5">
      <v-expansion-panel v-for="inspection in openForms" :key="inspection.id" class="ma-2">
        <v-expansion-panel-title expand-icon="mdi-menu-down">
          <v-row>
            <v-col> Open Inspection Nr. {{ getOpenID }} </v-col>
            <v-col> Address: {{ inspection.address }} </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="category-view">

            <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                    <v-expansion-panel-title expand-icon="mdi-menu-down">
                    Damages
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-4">
                        <DamageCategory :category="'Damages'" :dataTable="damageCache" @category-saved="updateCategory"></DamageCategory>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                    <v-expansion-panel-title expand-icon="mdi-menu-down">
                    Maintenance
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-4">
                        <MaintenanceCategory :category="'Maintenance'" :dataTable="maintenanceCache" @category-saved="updateCategory"></MaintenanceCategory>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                    <v-expansion-panel-title expand-icon="mdi-menu-down">
                        Technical installations
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-4">
                        <TechnicalCategory :category="'Technical installations'" :dataTable="technicalCache" @category-saved="updateCategory"></TechnicalCategory>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-expansion-panels variant="accordion">
                <v-expansion-panel>
                    <v-expansion-panel-title expand-icon="mdi-menu-down">
                    House adjustments
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-4">
                        <ModificationsCategory :category="'House adjustments'" :dataTable="houseCache" @category-saved="updateCategory"></ModificationsCategory>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-btn class="w-50 my-5" @click="submitInspection">
                Submit
            </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import {useInspectionStore} from "@/stores/inspectionStore.js";
import {useFormInspectionStore} from "@/stores/formStore.js";
import DamageCategory from "@/components/shared/DamageCategory.vue";
import MaintenanceCategory from "@/components/shared/MaintenanceCategory.vue";
import ModificationsCategory from "@/components/shared/ModificationsCategory.vue";
import TechnicalCategory from "@/components/shared/TechnicalCategory.vue";
import ProgressBar from "@/components/shared/ProgressBar.vue";

export default {
    mounted() 
    {
        if (this.completedStore.inspections.length === 0)
        {
            this.completedStore.fetchInspections();
        }
        
        this.fetchForm();

        if (this.completedStore.cache[this.getOpenID] !== undefined)
        {
            this.completedStore.cache[this.getOpenID] = [];
        }
    },
    name : "ScheduledPage",
    components: { ProgressBar, DamageCategory, MaintenanceCategory, ModificationsCategory, TechnicalCategory },
    data() {
        return {
            store : useFormInspectionStore(),
            completedStore : useInspectionStore(),
            damageCache : null,
            maintenanceCache : null,
            technicalCache : null,
            houseCache : null,
            hideForm : false
        }
    },
    methods : {
        showInspection(e)
        {
            window.alert(e.id);
        },
        fetchForm()
        {
            this.store.fetchOpenForms();
            this.store.fetchFormInspection();
        }, 
        submitInspection()
        {
            console.log("submitted!");

            const data = this.completedStore.cache[this.getOpenID];

            this.completedStore.addInspection(this.getOpenID, data);
            
            this.hideForm = true;

            setTimeout(() => {
                this.sendToPage('completed');
            }, 1000);

        },
        updateCategory(payload) 
        {
            if (this.completedStore.cache[this.getOpenID] === undefined || this.completedStore.cache.length === 0)
            {
                this.completedStore.cache[this.getOpenID] = [];
            }
            this.completedStore.cache[this.getOpenID].push({ [payload.category]: payload.data });

            switch(payload.category)
            {
                case "Damages":
                this.damageCache = payload.data;
                break;
                case "Maintenance":
                this.maintenanceCache = payload.data;
                break;
                case "Technical installations":
                this.technicalCache = payload.data;
                break;
                case "House adjustments":
                this.houseCache = payload.data;
                break;
            }
        }
    },
    computed : {
        openForms()
        {
            return this.store.openInspections;
        },
        formInspection() {
            return this.store.formInspection;
        },
        isLoading() {
            if (this.hideForm) return true;

            if (this.store)
            {
                return this.store.isLoading;
            } 
            return true;
        },
        error() {
            return this.store.errors;
        },
        getOpenID()
        {
            return this.completedStore.inspections.length + 1;
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

<style scoped>
.category-view :deep(.v-expansion-panel-text__wrapper){
    padding: 0 !important;
}
.centered {
    margin: calc(45vh - 92px) 0;
}
</style>