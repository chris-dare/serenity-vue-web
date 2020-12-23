import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from '../views/Client.vue'
import store from '@/store'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
    if (!store.state.auth.loggedIn) {
      next({
        name: 'AuthLogin',
      })
    } else {
      next()
    }
}

const routes = [
  {
    path: '/',
    component: Client,
    beforeEnter: requireAuth,
    children: [
        {
            path: '/',
            name: 'Dashboard',
            component: () => import(/* webpackChunkName: "client" */ '../views/client/Dashboard.vue'),
        },
        {
            path: '/patients',
            name: 'Patients',
            component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/Patients.vue'),
        },
        {
            path: '/register-patient',
            name: 'RegisterPatient',
            component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/Register.vue'),
            children: [
                {
                    path: '/register-patient/biodata',
                    name: 'Biodata',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/register/Biodata.vue'),
                },
                {
                    path: '/register-patient/contact-information',
                    name: 'ContactInfo',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/register/ContactInfo.vue'),
                },
                {
                    path: '/register-patient/emergency-contact',
                    name: 'EmergencyContact',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/register/EmergencyContact.vue'),
                },
                {
                    path: '/register-patient/social-info',
                    name: 'SocialInfo',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/register/SocialInfo.vue'),
                },
                {
                    path: '/register-patient/payment',
                    name: 'Payment',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/register/Payment.vue'),
                },
            ],
        },
        {
            path: '/appointments',
            name: 'Appointments',
            component: () => import(/* webpackChunkName: "client" */ '../views/client/appointments/Appointments.vue'),
        },
        {
            path: '/appointment',
            name: 'Appointment',
            component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/NewAppointment.vue'),
            children: [
                {
                    path: '/appointment/select-patient',
                    name: 'SelectPatient',
                    component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/SelectPatient.vue'),
                },
                {
                    path: '/appointment/clinics-services',
                    name: 'ClinicsServices',
                    component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/ClinicsServices.vue'),
                },
                {
                    path: '/appointment/date-doctor',
                    name: 'DateDoctor',
                    component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/DateDoctor.vue'),
                },
                {
                    path: '/appointment/payment',
                    name: 'AppointmentPayment',
                    component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/AppointmentPayment.vue'),
                },
                {
                    path: '/appointment/notes',
                    name: 'AppointmentNotes',
                    component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/AppointmentNotes.vue'),
                },
                {
                    path: '/appointment/summary',
                    name: 'AppointmentSummary',
                    component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/AppointmentSummary.vue'),
                },
            ],
        },
        {
            path: '/patients/:id',
            name: 'SinglePatient',
            component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/SinglePatient.vue'),
            props: true,
            children: [
                {
                    path: '/patients/:id',
                    name: 'PatientSummary',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientSummary.vue'),
                },
                {
                    path: '/patients/:id/charts',
                    name: 'PatientCharts',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientCharts.vue'),
                },
                {
                    path: '/patients/:id/encounters',
                    name: 'PatientEncounters',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientEncounters.vue'),
                },
                {
                    path: '/patients/:id/history',
                    name: 'PatientHistory',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientHistory.vue'),
                },
                {
                    path: '/patients/:id/orders',
                    name: 'PatientOrders',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientOrders.vue'),
                },
                {
                    path: '/patients/:id/prescriptions',
                    name: 'PatientPrescriptions',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientPrescriptions.vue'),
                },
                {
                    path: '/patients/:id/reports',
                    name: 'PatientReports',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientReports.vue'),
                },
                {
                    path: '/patients/:id/notes',
                    name: 'PatientNotes',
                    component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientNotes.vue'),
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
