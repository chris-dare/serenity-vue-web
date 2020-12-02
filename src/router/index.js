import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from '../views/Client.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client,
    children: [
        {
            path: '/patients',
            name: 'Patients',
            component: () => import(/* webpackChunkName: "client" */ '../views/client/Patients.vue'),
        },
        {
            path: '/patients/:id',
            name: 'SinglePatient',
            component: () => import(/* webpackChunkName: "client" */ '../views/client/SinglePatient.vue'),
            props: true,
        },
    ],
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
