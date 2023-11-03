<template>
    <table>
        <tbody>
            <tr>
                <th>
                    <label for="technical-location">Location</label>
                </th>
                <td>
                    <v-text-field
                    type="text"
                    name="technical-location"
                    v-model="Location"
                    ref="location"
                    :rules="[v => !!v || 'Location is required']"
                    >
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="technical-type">Type</label>
                </th>
                <td>
                    <v-select
                        name="technical-type"
                        v-model="Type"
                        :items="getFormValues('Type')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="technical-report">Report</label>
                </th>
                <td>
                    <v-text-field
                    type="textarea"
                    name="technical-report"
                    ref="report"
                    :rules="[v => !!v || 'Report is required']"
                    v-model="Report"
                    >
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="technical-procedure">Procedure</label>
                </th>
                <td>
                    <v-select
                        name="technical-procedure"
                        v-model="Procedure"
                        :items="getFormValues('Procedure')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="technical-approved">Approved</label>
                </th>
                <td>
                    <v-radio-group v-model="Approved" inline name="technical-approved">
                        <v-radio v-for="(value, index) in getFormValues('Approved')" :key="index" :label="value" :value="value"></v-radio>
                    </v-radio-group>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="technical-notes">Notes</label>
                </th>
                <td>
                    <v-text-field
                    type="textarea"
                    name="technical-notes"
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
    name : "TechnicalCategory",
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
            this.Report = this.dataTable['Report'];
            this.Procedure = this.dataTable['Procedure'];
            this.Approved = this.dataTable['Approved'];
            this.Notes = this.dataTable['Notes'];

            if (this.dataTable['Images'] !== undefined)
                this.Images = this.dataTable['Images'];
        }
    },
    data() {
        return {
            formStore : useFormInspectionStore(),
            imgStore : useImageStore(),
            Location : "",
            Type : 'Cooling',
            Report : "",
            Procedure : "originaldocument.pdf",
            Approved : "No",
            Notes : "",
            Images : [],
            selectedFiles : []
        }
    },
    methods :
    {
        async validation()
        {
            const validateFields = [this.$refs.location, this.$refs.report]; 

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
                'Type' : this.Type,
                'Report' : this.Report,
                'Procedure' : this.Procedure,
                'Approved' : this.Approved,
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
            return this.formStore.formInspection[2]['Technical Installations'];
        }
    }
};
</script>
