import { createRouter, createWebHistory } from "vue-router";

import Homepage from "@/components/Homepage.vue"
import KnowlegdeBase from "@/components/KnowlegdeBase.vue"
import CompletedPage from "@/components/CompletedPage.vue"
import SettingsPage from "@/components/SettingsPage.vue"
import ScheduledPage from "@/components/ScheduledPage.vue"
import LoginPage from "@/components/LoginPage.vue"

import {useAuthStore} from "@/stores/authStore.js"
import {useNavigationStore} from "@/stores/navigationStore.js"

const routes = [
    {path: '/', name: 'home', component: Homepage},
    {path: '/knowlegdebase', name: 'knowlegdebase', component: KnowlegdeBase},
    {path: '/completed-inspections', name: 'completed', component: CompletedPage},
    {path: '/settings', name: 'settings', component: SettingsPage},
    {path: '/schedule', name: 'schedule', component: ScheduledPage},
    {path: '/login-user', name: 'login', component: LoginPage}
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to,from) => {
    const auth = useAuthStore();
    console.log("to: "+to.fullPath+"/ from: "+from.fullPath)
    console.log("Auth: "+auth.isAuth);
    const navStore = useNavigationStore(); 

    if (!auth.isAuth) 
    {
        navStore.set('login');
        if(to.fullPath !== '/login-user')
        {
            auth.returnUrl = to.fullPath;
            return '/login-user';
        }
    } else {
        navStore.set(to.name);
    }
});

export default router;