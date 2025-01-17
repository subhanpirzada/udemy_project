
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import Home from "@/components/Home.vue";
import SignUp from "@/components/SignUp.vue";
import Login from "@/components/Login.vue";
import DataTable from "@/components/DataTable.vue";

import { createRouter, createWebHistory } from 'vue-router/auto'
import { components } from "vuetify/dist/vuetify-labs.js";


const routes=[
  {
      name:'Home',
      path:'/',
      component:Home,
  },
  {
      name:'SignUp',
      path:'/signup',
      component:SignUp,
  },
  {
      name:'Login',
      path:'/login',
      component:Login,
  },
  {
    name:'DataTable',
    path:'/datatable',
    component:DataTable,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
