import {defineStore} from "pinia";
import axios from 'axios';

import { apiURL } from '@/globals.js'

export const useAuthStore = defineStore('authStore', 
{
    state: () => {
        return {
            loadingState : 'notLoading',
            user : null,
            errors : null,
            returnUrl: null
        }
    },
    persist: {
        storage: sessionStorage,
        debug : true
    },
    actions : {
        login(userEmail, password)
        {
            this.loadingState = 'loading';
            console.log("apiURL: " + apiURL);
            axios({
                method : 'post',
                url : apiURL + "login",
                headers : {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
                data : {
                    email : userEmail,
                    password : password
                }
            })
            .then(result => {
                this.loadingState = 'notLoading';
                this.user = result.data;
                this.$router.push(this.returnUrl ? this.returnUrl : '/');
            })
            .catch(error => {
                this.loadingState = 'notLoading';
                this.user = [];
                this.errors = error;
                console.log(error);
            })
        },
        logout()
        {
            console.log('log out called');
            this.loadingState = 'notLoading';
            this.user = [];
            this.errors = null;
            this.returnUrl = null;
            console.log('log out called');
            this.$router.push('/login-user');
        }
    },
    getters : {
        isLoading()
        {
            return this.loadingState === 'loading';
        },
        isAuth()
        {
            return !(this.user === null || this.user.length === 0);
        }
    }
})