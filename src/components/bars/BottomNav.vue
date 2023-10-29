<template>
    <v-bottom-navigation :elevation="0" mode="shift" grow class="my-toolbar bg-teal" :model-value="NavValue">
        <template v-for="(item, index) in navigation" :key="index">
            <v-btn class="px-1" :value="item.link" v-on:click="handleClick(item.link)">
                <v-icon>{{ item.icon }}</v-icon>
                <span>{{ item.name }}</span>
            </v-btn>
        </template>
    </v-bottom-navigation>
</template>

<script>
import {useNavigationStore} from "@/stores/navigationStore.js";

export default {
    created() {
        console.log(this.NavValue);
    },
    name: "BottomNav",
    data() {
        return {
            store : useNavigationStore(),
            navigation : {
                task : {
                    name : "Active tasks",
                    link: "schedule",
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
    },
    methods : {
        handleClick(link)
        {
            if(this.store.set(link))
                this.sendToPage(link);
        }
    },
    computed : {
        NavValue() {
            return this.store.page;
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