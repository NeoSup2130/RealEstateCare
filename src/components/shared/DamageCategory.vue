<template>
    <table>
        <tbody>
            <tr>
                <th>
                    <label for="damage-location">Location</label>
                </th>
                <td>
                    <v-text-field
                    type="text"
                    name="damage-location"
                    v-model="Location"
                    ref="location"
                    :rules="[v => !!v || 'Location is required']"
                    >
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="damage-new">Is new</label>
                </th>
                <td>
                    <v-radio-group v-model="IsNew" inline name="damage-new">
                        <v-radio v-for="(value, index) in getFormValues('Is new')" :key="index" :label="value" :value="value"></v-radio>
                    </v-radio-group>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="damage-type">Type</label>
                </th>
                <td>
                    <v-select
                        name="damage-type"
                        v-model="Type"
                        :items="getFormValues('Type')"
                    ></v-select>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="damage-date">Date</label>
                </th>
                <td>
                    <v-text-field
                    type="date"
                    name="damage-date"
                    v-model="DateDamage"
                    ref="dateDamage"
                    :value="DateDamage"
                    :rules="[v => !!v || 'Date is required']"
                    >
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="damage-action">Action Required</label>
                </th>
                <td>
                    <v-radio-group v-model="Action" inline name="damage-action">
                        <v-radio v-for="(value, index) in getFormValues('Action required')" :key="index" :label="value" :value="value"></v-radio>
                    </v-radio-group>
                </td>
            </tr>
            <tr>
                <th>
                    <label for="damage-desc">Description</label>
                </th>
                <td>
                    <v-text-field
                    type="textarea"
                    name="damage-desc"
                    v-model="Desc"
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
    name : "DamageCategory",
    props : {
        dataTable : Object,
        category : String
    },
    components : {ImageEvidence, imagesFiles},
    emits: ['category-saved'],
    mounted()
    {
        console.log(this.dataTable);
        if (this.dataTable !== null && this.dataTable !== undefined)
        {
            this.formStore = useFormInspectionStore();
            this.Location = this.dataTable['Location'];
            this.IsNew = this.dataTable['Is new'];
            this.Type = this.dataTable['Type'];
            this.DateDamage = this.dataTable['Date'];
            this.Action = this.dataTable['Action required'];
            this.Desc = this.dataTable['Description'];

            if (this.dataTable['Images'] !== undefined)
                this.Images = this.dataTable['Images'];
        }
    },
    data() {
        return {
            formStore : useFormInspectionStore(),
            imgStore : useImageStore(),
            Location : '',
            IsNew : 'No',
            Type : 'Normal use',
            DateDamage : new Date().toISOString().split('T')[0],
            Action : 'No',
            Desc : '',
            Images : [],
            selectedFiles : []
        }
    },
    methods :
    {
        async validation()
        {
            const validateFields = [this.$refs.location, this.$refs.dateDamage]; 

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
                'Is new' : this.IsNew,
                'Type' : this.Type,
                'Date' : this.DateDamage,
                'Action required' : this.Action,
                'Description' : this.Desc,
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
            return this.getDamageFormValues[key].value;
        }
    },
    computed :
    {
        getDamageFormValues()
        {
            return this.formStore.formInspection[0]['Damages'];
        }
    }
};
</script>
