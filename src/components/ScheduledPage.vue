<template>
    <h1 class="ma-0">This is schedule page</h1>
    <v-divider class="w-50 mx-auto" thickness="3"></v-divider>
    <ProgressBar :display="this.isLoading"/>
    <v-expansion-panels class="mt-5" v-if="formInspection != null" multiple accordion>
      <v-expansion-panel v-for="(category, index) in formInspection" :key="index" class="ma-0">
        <v-expansion-panel-title expand-icon="mdi-menu-down">
            {{ Object.keys(category)[0] }}
        </v-expansion-panel-title>
         <v-expansion-panel-text class="category-view">
            <div v-for="(value, name, index) in category[Object.keys(category)[0]]" :key="index">
                <!-- <v-input>

                </v-input> -->
                <v-text-field :v-model='Object.keys(category)[0]+"-"+name' :label="name">
                </v-text-field>
            </div>
            <!-- <InspectionPanel v-for="(item, index) in category" :key="index" :inspection="item">
            </InspectionPanel> -->
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Additional evidence"
        prepend-icon="mdi-camera"
        label="Image"
  ></v-file-input> -->
</template>

<script>
import {useFormInspectionStore} from "@/stores/formStore.js";
import ProgressBar from "@/components/shared/ProgressBar.vue";

    export default {
        name : "ScheduledPage",
        components : {ProgressBar},
        data() {
            return {
                store : useFormInspectionStore(),
                rules : [
                    value => { return (
                        !value ||
                        !value.length ||
                        value[0].size < 2000000 ||
                        'Picture size should be less than 2 MB!'
                    )}
                ]
            }
        },
        methods : {
            showInspection(e)
            {
                window.alert(e.id);
            },
            fetchForm()
            {
                this.store.fetchFormInspection();
            }, 
            
        },
        computed : {
            formInspection() {
                return this.store.formInspection;
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
            if(this.formInspection.length == 0) 
            {
                this.fetchForm();
            }
        }
    }
</script>

<style scoped>
.centered {
    margin: calc(45vh - 92px) 0;
}
</style>