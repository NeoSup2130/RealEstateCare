import {defineStore} from "pinia";

function validate(value) {
    const pages = ['home', 'schedule', 'completed', 'knowlegdebase', 'settings'];

    if(pages.indexOf(value) != -1) 
        return true;
    else 
        window.alert("[Validation Error] Invalid page: " + value)
}

export const useNavigationStore = defineStore('navigation', 
{
    state: () => {
        return {
            page : 'home'
        }
    },
    actions : {
        set(newPage)
        {
            if (validate(newPage)) this.page = newPage;
        },
        reset() {
            this.page = 'home';
        }
    },
    getters : {

    }
})