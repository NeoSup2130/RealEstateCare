<template>
    <h1 class="ma-0">Active schedule</h1>
    <v-divider class="w-50 mx-auto" thickness="3"></v-divider>
    <ProgressBar :display="this.isLoading"/>
    <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Additional evidence"
        prepend-icon="mdi-camera"
        label="Image"
        @change="handleImageFile"
  ></v-file-input>
  <v-btn @click="uploadImage()">
    Upload
  </v-btn>
  <img v-if="imageUrl !== null" :src="imageUrl" alt="Uploaded Image" />
</template>

<script>
import {useFormInspectionStore} from "@/stores/formStore.js";
import ProgressBar from "@/components/shared/ProgressBar.vue";
import axios from 'axios';

    export default {
        mounted() {
            if(this.formInspection.length == 0) 
            {
                this.fetchForm();
            }
            axios.get("https://giant-immediate-celsius.glitch.me/images/2").then(response => 
            {
                this.imageUrl = response.data.image;
            })
        },
        name : "ScheduledPage",
        components : {ProgressBar},
        data() {
            return {
                store : useFormInspectionStore(),
                selectedFile : null,
                imageUrl : null,
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
            handleImageFile(e)
            {
                this.selectedFile = e.target.files[0];
            },
            async uploadImage()
            {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const base64Image = event.target.result;
                    this.uploadBase64Image(base64Image);
                };

                reader.readAsDataURL(this.selectedFile);
            },
            async uploadBase64Image(base64Image) 
            {
                console.log(base64Image);
                axios({
                method : 'post',
                url : "https://giant-immediate-celsius.glitch.me/images",
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
                data : {
                    image : base64Image
                }
            }).then(response => {
                console.log('Image uploaded successfully:', response.data);
            }).catch(error => {
                console.error('Error uploading image:', error);
            })
            },
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
        }
    }
</script>

<style scoped>
.centered {
    margin: calc(45vh - 92px) 0;
}
</style>