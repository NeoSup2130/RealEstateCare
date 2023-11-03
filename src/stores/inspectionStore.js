import {defineStore} from "pinia";
import axios from 'axios';

import { glitchServerURL as url } from '@/globals.js'

export const useInspectionStore = defineStore('inspection', 
{
    state: () => {
        return {
            loadingState : 'notLoading',
            inspections : [],
            cache : [],
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
        },
        addInspection(id, data)
        {
            this.cache[id] = data;
            axios({
                method : 'post',
                url : url + "inspections/",
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
                data : {
                    "id" : id,
                    "date" : new Date().toISOString().split('T')[0],
                    "items" : data
                }
            }).then(response => {
                console.log('Post uploaded successfully:', response.data);
                this.cache[id] = null;
            }).catch(error => {
                console.error('Post upload error: '+ error);
            })
        },
        updateInspection(id, changedData)
        {
            this.cache[id] = changedData;
            axios({
                method : 'patch',
                url : url + "inspections/" +id,
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
                data : {
                    "items" : [
                        {...changedData}
                    ]
                }
            }).then(response => {
                console.log('Patch uploaded successfully:', response.data);
                this.cache[id] = null;
            }).catch(error => {
                console.error('Patch upload error: '+ error);
            })
        }
    },
    getters : {
        isLoading()
        {
            return this.loadingState === 'loading';
        }
    }
})