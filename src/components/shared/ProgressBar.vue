<template>
    <v-layout class="justify-center centered" v-show="display">
        <v-progress-circular
        color="primary"
        indeterminate
        :size="63"
        :width="8"
        ></v-progress-circular>
    </v-layout>
</template>

<script>
    export default {
        name: "ProgressBar",
        props : {
            display : Boolean
        }
    }
</script>