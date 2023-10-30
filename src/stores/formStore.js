import {defineStore} from "pinia";
import axios from 'axios';

let port = "3000";
const url = "http://localhost:"+port+"/form-inspection"; 

export const useFormInspectionStore = defineStore('formInspection', 
{
    state: () => {
        return {
            loadingState : 'notLoading',
            formInspection : [],
            errors : null
        }
    },
    persist: {
        storage: sessionStorage,
        debug : true
    },
    actions : {
        fetchFormInspection()
        {
            this.loadingState = 'loading';
            axios.get(url)
            .then(result => {
                this.loadingState = 'notLoading';
                this.formInspection = result.data;
            })
            .catch(error => {
                this.loadingState = 'notLoading';
                this.formInspection = [];
                this.errors = error;
            })
        },
        clearFormInspection()
        {
            this.loadingState = 'notLoading';
            this.formInspection = [];
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