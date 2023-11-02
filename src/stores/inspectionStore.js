import {defineStore} from "pinia";
import axios from 'axios';

import { apiURL as url } from '@/globals.js'

export const useInspectionStore = defineStore('inspection', 
{
    state: () => {
        return {
            loadingState : 'notLoading',
            inspections : [],
            errors : null
        }
    },
    persist: {
        storage: localStorage,
        debug : true
    },
    actions : {
        fetchInspections()
        {
            this.loadingState = 'loading';
            axios.get(url + 'inspections?_sort=date&_order=desc')
            .then(result => {
                this.loadingState = 'notLoading';
                this.inspections = result.data;
            })
            .catch(error => {
                this.loadingState = 'notLoading';
                this.inspections = [];
                this.errors = error;
            })
        },
        clearInspections()
        {
            this.loadingState = 'notLoading';
            this.inspections = [];
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