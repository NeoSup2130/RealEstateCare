<template>
    <h1 class="mt-2">Settings</h1>
    <v-divider class="w-50 mx-auto my-1 mb-5" thickness="3"></v-divider>
    <v-card class="mx-auto" max-width="344"
    >
    <v-card-title>
        User details
    </v-card-title>
    <v-card-text>
        <v-avatar>
            <div class="letter-avatar">
                {{ this.getUsername().charAt(0).toUpperCase() }}
            </div>
        </v-avatar>
        <p class="font-weight-bold">Welkom, {{ this.getUsername() }}!</p>
        <v-divider class="w-50 mx-auto mb-5" thickness="3"></v-divider>
        <v-container class="pa-0 mt-4" fluid>
            <p class="font-weight-bold text-left">Receive Notifications</p>
            <v-radio-group inline class="mt-3" v-model="notifs" v-bind:on-update:model-value="setNotifs()">
                <v-radio label="Yes" :value="1"></v-radio>
                <v-radio label="No" :value="0"></v-radio>
            </v-radio-group>
        </v-container>
        
        <p class="text-left font-weight-bold">Notification volume</p>
        <v-slider class="pr-5" v-model="volume" prepend-icon="mdi-volume-high"
        v-bind:on-update:model-value="setVolume()"></v-slider>

    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="teal-darken-4" @click="userLogout()" >
        Logout
      </v-btn>
    </v-card-actions>
    </v-card>
</template>

<script>
import {useAuthStore} from "@/stores/authStore.js"
import {useSettingsStore} from "@/stores/settingsStore.js"

export default {
    created(){
        this.volume = this.settingsStore.volume;
        this.notifs = this.settingsStore.notifs;
    },
    name : "SettingsPage",
    data() {
        return {
            authStore : useAuthStore(),
            settingsStore : useSettingsStore(),
            volume : 0,
            notifs : 0
        }
    },
    methods :
    {
        userLogout() {
            this.authStore.logout();
        },
        getUsername() {
            if (this.authStore.isAuth)
            {
                console.log("getUsername auth was true");
                return this.authStore.user.user.username;
            }
            else return 'a';
        },
        setVolume()
        {
            this.settingsStore.setVolume(Math.round(this.volume));
        },
        setNotifs()
        {
            this.settingsStore.setNotifs(this.notifs);
        }
    }
}
</script>

<style scoped>
.v-table, tr {
    width: 100%;
}
th, td {
    text-align: left;
}
th {
    font-weight: bold !important;
}

.letter-avatar {
    min-width: 50px;
    min-height: 50px;
    width: 100%;
    height: 100%;
    max-width: 344px;
    max-height: 344px;

    color: rgb(255, 255, 255);
    border-radius: 50%;
    background-color: teal;

    text-align: center;
    line-height: 50px;
    font-family: "Roboto-Regular", Roboto, Helvetica, Arial;
}
</style>