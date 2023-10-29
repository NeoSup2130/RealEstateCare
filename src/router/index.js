import { createRouter, createWebHistory } from "vue-router";

import Homepage from "@/components/Homepage.vue"
import KnowlegdeBase from "@/components/KnowlegdeBase.vue"
import CompletedPage from "@/components/CompletedPage.vue"
import SettingsPage from "@/components/SettingsPage.vue"
import ScheduledPage from "@/components/ScheduledPage.vue"

const routes = [
    {path: '/', name: 'home', component: Homepage},
    {path: '/knowlegdebase', name: 'knowlegdebase', component: KnowlegdeBase},
    {path: '/completed-inspections', name: 'completed', component: CompletedPage},
    {path: '/settings', name: 'settings', component: SettingsPage},
    {path: '/schedule', name: 'schedule', component: ScheduledPage},

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;