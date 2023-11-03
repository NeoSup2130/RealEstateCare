import {defineStore} from "pinia";
import axios from 'axios';

// import { apiURL as url } from '@/globals.js'

export const useImageStore = defineStore('imageStore', 
{
    state: () => {
        return {
            loadingState : 'notLoading',
            images : [],
            errors : null
        }
    },
    persist: {
        storage: localStorage,
        debug : true
    },
    actions : {
        async fetchImage(id)
        {
            console.log("fetch image id: "+id);

            if((id in this.images) && this.images[id] !== null && this.images[id] !== undefined)
            {
                console.log("image already exists: "+this.images[id]);
                return this.images[id];
            }
            this.loadingState = 'loading';
            try {
                const result = await axios.get("https://giant-immediate-celsius.glitch.me/" + "images/"+id);
                this.loadingState = 'notLoading';
                this.images[result.data.id] = result.data.image;
                return this.images[id];
            }
            catch(error) 
            {
                this.loadingState = 'notLoading';
                this.errors = error;
                console.log("error while fetching image: "+error);
                return undefined;
            }
        },
        async uploadImages(encodedImages)
        {
            let imageIDs = [];
            for (let i = 0; i < encodedImages.length; i++) 
            {
                try 
                {
                    const result = await axios({
                        method : 'post',
                        url : "https://giant-immediate-celsius.glitch.me/images",
                        headers : {
                            'Access-Control-Allow-Origin' : '*',
                            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                        },
                        data : {
                            image : encodedImages[i]
                        }
                    });
                    console.log('Image nr. '+i+', uploaded successfully:', result.data);
                    imageIDs[i] = result.data.id;
                }
                catch(error) 
                {
                    console.error('Error uploading image nr. '+i+':', error);
                }
            }
            return imageIDs;
        },
        clearImages()
        {
            this.loadingState = 'notLoading';
            this.images = [];
            this.errors = null;
        }
    },
    getters : {
        isLoading()
        {
            return this.loadingState === 'loading';
        }
    }
})