<template>
    <table>
        <tbody>
            <tr>
                <th>
                    <label for="maintenance-location">Location</label>
                </th>
                <td>
                    <v-text-field
                    type="text"
                    name="maintenance-location"
                    v-model="Location"
                    ref="location"
                    :rules="[v => !!v || 'Location is required']"
                    >
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="maintenance-type">Type</label>
                </th>
                <td>
                    <v-select
                        name="maintenance-type"
                        v-model="Type"
                        :items="getFormValues('Type')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="maintenance-cost">Cost</label>
                </th>
                <td>
                    <v-select
                        name="maintenance-cost"
                        v-model="Cost"
                        :items="getFormValues('Cost')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="maintenance-action">Action Required</label>
                </th>
                <td>
                    <v-radio-group v-model="Action" inline name="maintenance-action">
                        <v-radio v-for="(value, index) in getFormValues('Action required')" :key="index" :label="value" :value="value"></v-radio>
                    </v-radio-group>
                </td>
            </tr>
        </tbody>
    </table>
    <v-container>
        <imagesFiles @files-updated="handleFilesUpdated">
        </imagesFiles>
    </v-container>

    <div v-if="Images.length > 0">
        <h3>Image Evidence</h3>
        <v-container>
            <v-row>
            <v-col
                v-for="(value, index) in Images"
                :key="index"
                class="d-flex child-flex" cols="6">
                <ImageEvidence :imageID="value"></ImageEvidence>
            </v-col>
            </v-row>
        </v-container>
    </div>

    <v-btn @click="SaveChanges()">
        Save
    </v-btn>
</template>

<script>
import {useFormInspectionStore} from "@/stores/formStore.js";
import {useImageStore} from "@/stores/imagesStore.js";
import imagesFiles from "@/components/shared/imageFilesInput.vue";
import ImageEvidence from "@/components/shared/ImageEvidence.vue";

export default {
    name : "MaintainanceCategory",
    props : {
        dataTable : Object,
        category : String
    },
    components : {ImageEvidence, imagesFiles},
    emits: ['category-saved'],
    mounted()
    {
        if (this.dataTable !== null && this.dataTable !== undefined)
        {
            this.formStore = useFormInspectionStore();
            this.Location = this.dataTable['Location'];
            this.Type = this.dataTable['Type'];
            this.Action = this.dataTable['Action required'];
            this.Cost = this.dataTable['Cost'];

            if (this.dataTable['Images'] !== undefined)
                this.Images = this.dataTable['Images'];
        }
    },
    data() {
        return {
            formStore : useFormInspectionStore(),
            imgStore : useImageStore(),
            Location : '',
            Action : 'No',
            Type : 'Painting',
            Cost : "0-500",
            Images : [],
            selectedFiles : []
        }
    },
    methods :
    {
        async validation()
        {
            const validateFields = [this.$refs.location]; 

            let result = [];
            for (let i = 0; i < validateFields.length; i++) 
            {
            const response = await validateFields[i].validate();
            result.push(...response);
            }

            return result;
        },
        async SaveChanges()
        {
            let result = await this.validation();
            if (result.length !== 0) return;

            let imgID = await this.imgStore.uploadImages(this.selectedFiles);
            this.Images.push(...imgID);

            const data = {
                'Location' : this.Location,
                'Action required' : this.Action,
                'Type' : this.Type,
                'Cost' : this.Cost,
                'Images' : this.Images
            }
            console.log('[SaveChanges] data: '+JSON.stringify(data));
            this.$emit('category-saved', {"data":data, "category":this.category});
        },
        handleFilesUpdated(files)
        {
            this.selectedFiles = files;
        },
        getFormValues(key)
        {
            return this.getForm[key].value;
        }
    },
    computed :
    {
        getForm()
        {
            return this.formStore.formInspection[1]['Deferred Maintainance'];
        }
    }
};
</script>
