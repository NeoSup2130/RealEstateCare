import {defineStore} from "pinia";
import axios from 'axios';

import { apiURL as url } from '@/globals.js'

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
            axios.get(url + "form-inspection")
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