<template>
    <v-bottom-navigation :elevation="0" mode="shift" grow class="my-toolbar bg-teal">
        <v-btn value="active-task">
        <v-icon>mdi-wrench</v-icon>
        <span>Active tasks</span>
        </v-btn>

        <v-btn value="search">
        <v-icon>mdi-magnify</v-icon>
        <span>Search</span>
        </v-btn>

        <v-btn value="alert">
        <v-icon>mdi-alert</v-icon>
        <span>Alerts</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "BottomNav",
    data() {
        return {
            value: 1
        }
    }
}
</script>

<style scoped>
.my-toolbar >>> button {
    max-width: 33% !important;
}
</style>