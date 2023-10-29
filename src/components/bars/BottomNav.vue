<template>
    <v-bottom-navigation :elevation="0" mode="shift" grow class="my-toolbar bg-teal" :model-value="NavValue">
        <template v-for="(item, index) in navigation" :key="index">
            <v-btn class="px-1" :value="item.name" v-on:click="sendToPage(item.link)">
                <v-icon>{{ item.icon }}</v-icon>
                <span>{{ item.name }}</span>
            </v-btn>
        </template>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "BottomNav",
    props: {
        NavValue : String
    }, 
    data() {
        return {
            navigation : {
                task : {
                    name : "Active tasks",
                    link: "active-task",
                    icon : "mdi-wrench"
                },
                search : {
                    name : "Home",
                    link: "home",
                    icon : "mdi-home"
                },
                alert : {
                    name: "Alerts",
                    link: "alert",
                    icon: "mdi-alert"
                }
            }
        }
    }
}
</script>

<style scoped>
.my-toolbar :deep(button) {
    max-width: 33% !important;
}
span {
    font-size: 1.3em;
}
</style>