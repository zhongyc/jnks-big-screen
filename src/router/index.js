import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_BASE),
    routes: [
        {
            path: '/',
            name: 'HOME',
            component: () => import('@/views/Home/index.vue'),
        },
    ]
})

export default router
