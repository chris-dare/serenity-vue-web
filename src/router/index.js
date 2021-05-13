import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from '../views/Client.vue'
import Dashboard from '../views/client/Dashboard.vue'
import store from '@/store'

// middlewares
import fetchAppointment from './middleware/fetchAppointment'
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component: Client,
    meta: {requiresAuth: true},
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/admin-dashboard',
        name: 'AdminDashboard',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/AdminDashboard.vue'),
      },
      {
        path: '/get-started',
        name: 'GetStarted',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/GetStarted.vue'),
      },
      {
        path: '/locations',
        name: 'Locations',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Locations.vue'),
      },
      {
        path: '/services',
        name: 'Services',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Services.vue'),
      },
      {
        path: '/schedules',
        name: 'Schedules',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Schedules.vue'),
      },
      {
        path: '/workspaces',
        name: 'Workspaces',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Workspaces.vue'),
      },
      {
        path: '/patients',
        name: 'Patients',
        component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/Patients.vue'),
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "client" */ '../views/client/Settings.vue'),
      },
      {
        path: '/visits',
        name: 'Visits',
        component: () => import(/* webpackChunkName: "client" */ '../views/client/Visits.vue'),
      },
      {
        path: '/team',
        name: 'Team',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Team.vue'),
      },
      {
        path: '/team/:id',
        name: 'TeamDetail',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/team/TeamDetail.vue'),
      },
      {
        path: '/inventory',
        name: 'Inventory',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Inventory.vue'),
      },
      {
        path: '/billing',
        name: 'Billing',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Billing.vue'),
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Roles.vue'),
      },
      {
        path: '/clients',
        name: 'CorporateClients',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/CorporateClients.vue'),
      },
      {
        path: '/clients/:id',
        name: 'ClientDetail',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/ClientDetail.vue'),
      },
      {
        path: '/patient-vitals',
        name: 'Vitals',
        component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientVitals.vue'),
      },
      {
        path: '/register-client',
        component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/corporate/RegisterClient.vue'),
        children: [
          {
            path: '',
            name: 'CompanyInformation',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/corporate/CompanyInformation.vue'),
          },
          {
            path: '/register-client/admin-information',
            name: 'CompanyAdminInformation',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/corporate/CompanyAdminInformation.vue'),
          },
        ],
      },
      {
        path: '/register-team',
        component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/team/RegisterTeam.vue'),
        children: [
          {
            path: '',
            name: 'TeamBiodata',
            component: () => import(/* webpackChunkName: "registeruser" */ '../views/client/team/TeamBioData.vue'),
          },
          {
            path: '/register-team/identification',
            name: 'TeamIdentification',
            component: () => import(/* webpackChunkName: "registeruser" */ '../views/client/team/TeamIdentification.vue'),
          },
          {
            path: '/register-team/contact-information',
            name: 'TeamContactInformation',
            component: () => import(/* webpackChunkName: "registeruser" */ '../views/client/team/TeamContactInformation.vue'),
          },
        ],
      },
      {
        path: '/register-service',
        component: () => import(/* webpackChunkName: "registerservice" */ '../views/client/services/RegisterService.vue'),
        children: [
          {
            path: '',
            name: 'ServiceInformation',
            component: () => import(/* webpackChunkName: "registerservice" */ '../views/client/services/ServiceInformation.vue'),
          },
          {
            path: '/register-service/pricing',
            name: 'ServicePricing',
            component: () => import(/* webpackChunkName: "registerservice" */ '../views/client/services/ServicePricing.vue'),
          },
          {
            path: '/register-service/availability',
            name: 'ServiceAvailability',
            component: () => import(/* webpackChunkName: "registerservice" */ '../views/client/services/ServiceAvailability.vue'),
          },
        ],
      },
      {
        path: '/register-patient',
        component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/Register.vue'),
        children: [
          {
            path: '',
            name: 'Biodata',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/Biodata.vue'),
          },
          {
            path: '/register-patient/contact-information',
            name: 'ContactInfo',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/ContactInfo.vue'),
          },
          {
            path: '/register-patient/emergency-contact',
            name: 'EmergencyContact',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/EmergencyContact.vue'),
          },
          {
            path: '/register-patient/social-info',
            name: 'SocialInfo',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/SocialInfo.vue'),
          },
          {
            path: '/register-patient/payment',
            name: 'Payment',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/Payment.vue'),
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
        component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/NewAppointment.vue'),
        children: [
          {
            path: '',
            name: 'SelectPatient',
            component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/SelectPatient.vue'),
            meta: {middleware: [fetchAppointment]},
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
        component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/SinglePatient.vue'),
        props: true,
        children: [
          {
            path: '',
            name: 'PatientSummary',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientSummary.vue'),
          },
          {
            path: '/patients/:id/charts',
            name: 'PatientCharts',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientCharts.vue'),
          },
          {
            path: '/patients/:id/timeline',
            name: 'PatientTimeline',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientTimeline.vue'),
          },
          {
            path: '/patients/:id/encounters',
            name: 'PatientEncounters',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientEncounters.vue'),
          },
          {
            path: '/patients/:id/history',
            name: 'PatientHistory',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientHistory.vue'),
          },
          {
            path: '/patients/:id/orders',
            name: 'PatientOrders',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientOrders.vue'),
          },
          {
            path: '/patients/:id/prescriptions',
            name: 'PatientPrescriptions',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientPrescriptions.vue'),
          },
          {
            path: '/patients/:id/reports',
            name: 'PatientReports',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientReports.vue'),
          },
          {
            path: '/patients/:id/notes',
            name: 'PatientNotes',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientNotes.vue'),
          },
          {
            path: '/patients/:id/appointments',
            name: 'PatientAppointments',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientAppointments.vue'),
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
  {
    path: '/password-reset',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "auth" */ '../views/auth/ResetPassword.vue'),
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store,
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  })
})

export default router
