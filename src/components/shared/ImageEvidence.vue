<template>
    <ProgressBar :display="loadedImage === null"/>
    <v-img aspect-ratio="1" :src="imgSrc" alt="Loaded Evidence Image"/>
</template>

<script>
import {useImageStore} from "@/stores/imagesStore.js";
import ProgressBar from "@/components/shared/ProgressBar.vue";

export default {
    name : "ImageEvidence",
    components : {ProgressBar},
    props: {
    imageID: String
    },
    async created() 
    {
        await this.getImageAsync();
    },
    data() 
    {
        return {
            imageStore : useImageStore(),
            loadedImage : null
        }
    },
    computed :
    {
        imgSrc()
        {
            return this.loadedImage;
        }
    },
    methods :
    {
        async getImageAsync()
        {
            if (this.imageID === null || this.imageID === undefined) return;
            const imageData = await this.imageStore.fetchImage(this.imageID);
            this.loadedImage = imageData;
        }
    }
}
</script>