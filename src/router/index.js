import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from '../views/Client.vue'
// import store from '@/store'

Vue.use(VueRouter)

// const requireAuth = (to, from, next) => {
//     if (!store.state.auth.loggedIn) {
//       next({
//         name: 'AuthLogin',
//       })
//     } else {
//       next()
//     }
// }

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
            children: [
                {
                    path: '/patients/:id',
                    name: 'PatientSummary',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientSummary.vue'),
                },
                {
                    path: '/patients/:id/charts',
                    name: 'PatientCharts',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientCharts.vue'),
                },
                {
                    path: '/patients/:id/encounters',
                    name: 'PatientEncounters',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientEncounters.vue'),
                },
                {
                    path: '/patients/:id/history',
                    name: 'PatientHistory',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientHistory.vue'),
                },
                {
                    path: '/patients/:id/orders',
                    name: 'PatientOrders',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientOrders.vue'),
                },
                {
                    path: '/patients/:id/prescriptions',
                    name: 'PatientPrescriptions',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientPrescriptions.vue'),
                },
                {
                    path: '/patients/:id/reports',
                    name: 'PatientReports',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientReports.vue'),
                },
                {
                    path: '/patients/:id/notes',
                    name: 'PatientNotes',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/PatientNotes.vue'),
                },
            ],
        },
    ],
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/Login.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/ForgotPassword.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
