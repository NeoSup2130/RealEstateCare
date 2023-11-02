import {defineStore} from "pinia";
export const useSettingsStore = defineStore('settings', 
{
    state: () => {
        return {
            loadingState : 'notLoading',
            volume : 10,
            notifs : 1,
            errors : null
        }
    },
    persist: {
        storage: localStorage,
        debug : true
    },
    actions : {
        setVolume(value)
        {
            this.volume = value;
        },
        setNotifs(value)
        {
           this.notifs = value;
        }
    }
})