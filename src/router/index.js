import { createRouter, createWebHistory } from "vue-router";

import Homepage from "@/components/Homepage.vue"
import KnowlegdeBase from "@/components/KnowlegdeBase.vue"
import CompletedPage from "@/components/CompletedPage.vue"

const routes = [
    {path: '/', name: 'home', component: Homepage},
    {path: '/knowlegdebase', name: 'knowlegdebase', component: KnowlegdeBase},
    {path: '/completed-inspections', name: 'completed', component: CompletedPage},

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;