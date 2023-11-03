<template>
    <table>
        <tbody>
            <tr>
                <th>
                    <label for="modifications-state">Latest House State</label>
                </th>
                <td>
                    <v-select
                        name="modifications-state"
                        v-model="State"
                        :items="getFormValues('Latest House State')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="modifications-location">Location</label>
                </th>
                <td>
                    <v-text-field
                    type="text"
                    name="modifications-location"
                    v-model="Location"
                    ref="location"
                    :rules="[v => !!v || 'Location is required']"
                    >
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="modifications-doneby">Done By</label>
                </th>
                <td>
                    <v-select
                        name="modifications-doneby"
                        v-model="DoneBy"
                        :items="getFormValues('Done By')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="modifications-description">Description Modification</label>
                </th>
                <td>
                    <v-text-field
                    type="textarea"
                    name="modifications-description"
                    v-model="Desc"
                    >
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="modifications-action">Action</label>
                </th>
                <td>
                    <v-select
                        name="modifications-action"
                        v-model="Action"
                        :items="getFormValues('Action')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="modifications-notes">Notes</label>
                </th>
                <td>
                    <v-text-field
                    type="textarea"
                    name="modifications-notes"
                    v-model="Notes"
                    >
                    </v-text-field>
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
    name : "ModificationsCategory",
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
            this.DoneBy = this.dataTable['Done By'];
            this.Desc = this.dataTable['Description Modification'];
            this.Action = this.dataTable['Action'];
            this.Notes = this.dataTable['Notes'];

            if (this.dataTable['Images'] !== undefined)
                this.Images = this.dataTable['Images'];
        }
    },
    data() {
        return {
            formStore : useFormInspectionStore(),
            imgStore : useImageStore(),
            State : "originaldocument.pdf",
            Location : "",
            DoneBy : 'Unknown',
            Desc : "",
            Action : "Inspect",
            Notes : "",
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
                'Latest House State' : this.State,
                'Location' : this.Location,
                'Done By' : this.DoneBy,
                'Description Modification' : this.Desc,
                'Action' : this.Action,
                'Notes' : this.Notes,
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
            return this.formStore.formInspection[3]['House Modifications'];
        }
    }
};
</script>
