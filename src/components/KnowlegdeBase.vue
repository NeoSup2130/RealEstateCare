<template>
    <h1 class="ma-0">Knowlegde base</h1>
    <v-divider class="w-50 mx-auto" thickness="3"></v-divider>
    <v-list lines="two" class="text-left">
        <v-list-item
        v-for="(pdf, index) in pdfs"
        :key="index"
        :title="pdf.name"
        >
        <a :href="'/pdf/' + pdf.file" target="_blank">{{pdf.file}}</a>
        <template v-slot:prepend>
          <v-icon icon="mdi-file-pdf-box"></v-icon>
        </template>
    </v-list-item>
    </v-list>
    
</template>

<script> 
export default {
    name: "KnowlegdeBase",
    data() {
        return {
            pdfs : [
                {file : "originaldocument.pdf", name : "Real Estate Care case document"},
                {file : "originaldocument.pdf", name : "Test procedures"}
            ]
        }
    }
}
</script>

<style scoped>
</style>