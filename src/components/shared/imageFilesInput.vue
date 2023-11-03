<template>
    <v-file-input 
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Additional evidence"
    prepend-icon="mdi-camera"
    label="Image evidence"
    show-size
    counter
    multiple
    @change="handleImageFile"
    ></v-file-input>
</template>

<script>
export default 
{
    name : "imagesFiles",
    data() {
        return {
            selectedFiles : [],
            emits: ['files-updated'],
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
    methods : 
    {
        handleImageFile(e)
        {
            this.selectedFiles = [];
            for (let i = 0; i < e.target.files.length; i++) 
            {
                const file = e.target.files[i];
                this.readAndAddFile(file);
            }
        },
        readAndAddFile(file) 
        {
            const reader = new FileReader();

            reader.onload = (event) => {
                const dataURL = event.target.result;
                this.selectedFiles.push(dataURL);
                this.$emit('files-updated', this.selectedFiles);
            };
            
            reader.readAsDataURL(file);
        }
    }
}

</script>