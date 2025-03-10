import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from '../views/Client.vue'
import Dashboard from '../views/client/Dashboard.vue'
import store from '@/store'

// middlewares
import fetchAppointment from './middleware/fetchAppointment'
import isAdmin from './middleware/isAdmin'
import isProtectedByPermission from './middleware/isProtectedByPermission'
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
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/get-started',
        name: 'GetStarted',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/GetStarted.vue'),
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/locations',
        name: 'Locations',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Locations.vue'),
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/wards',
        name: 'Wards',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/wards/Wards.vue'),
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/resources',
        name: 'Resources',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/resources/Resources.vue'),
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/services',
        name: 'Services',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Services.vue'),
      },
      {
        path: '/schedules',
        name: 'Schedules',
        component: () => import(/* webpackChunkName: "schedule" */ '../views/client/administration/Schedules.vue'),
      },
      {
        path: '/workspaces',
        name: 'Workspaces',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Workspaces.vue'),
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/patients',
        name: 'Patients',
        component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/Patients.vue'),
        meta: { middleware: [isProtectedByPermission], permission: 'patient.read' },
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
        path: '/support',
        name: 'Support',
        component: () => import(/* webpackChunkName: "opd" */ '../views/client/Support.vue'),
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: () => import(/* webpackChunkName: "opd" */ '../views/client/Notifications.vue'),
      },
      {
        path: '/reports',
        name: 'Reports',
        component: () => import(/* webpackChunkName: "opd" */ '../views/client/Reports.vue'),
      },
      {
        path: '/insights',
        name: 'Insights',
        component: () => import(/* webpackChunkName: "opd" */ '../views/client/Insights.vue'),
      },
      {
        path: '/team',
        name: 'Team',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/administration/Team.vue'),
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/team/:id',
        name: 'TeamDetail',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/team/TeamDetail.vue'),
        meta: { middleware: [isAdmin] },
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
        meta: { middleware: [isAdmin] },
      },
      {
        path: '/clients',
        name: 'CorporateClients',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/corporate/CorporateClients.vue'),
      },
      {
        path: '/clients/:id',
        component: () => import(/* webpackChunkName: "corporate" */ '../views/client/corporate/ClientDetail.vue'),
        children: [
          {
            path: 'summary',
            name: 'ClientSummary',
            component: () => import(/* webpackChunkName: "corporate" */ '../views/client/corporate/ClientSummary.vue'),
          },
          {
            path: 'bills',
            name: 'ClientBills',
            component: () => import(/* webpackChunkName: "corporate" */ '../views/client/corporate/ClientBills.vue'),
            props: true,
          },
          {
            path: 'transactions',
            name: 'ClientTransactions',
            component: () => import(/* webpackChunkName: "corporate" */ '../views/client/corporate/ClientTransactions.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/clients/:id/employees',
        name: 'ClientEmployees',
        component: () => import(/* webpackChunkName: "corporate" */ '../views/client/corporate/ClientEmployees.vue'),
      },
      {
        path: '/patient-vitals',
        name: 'Vitals',
        component: () => import(/* webpackChunkName: "client" */ '../views/client/patients/PatientVitals.vue'),
      },
      {
        path: '/register-client',
        props: true,
        component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/corporate/RegisterClient.vue'),
        children: [
          {
            path: '',
            name: 'CompanyInformation',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/corporate/CompanyInformation.vue'),
          },
          {
            path: 'admin-information',
            name: 'CompanyAdminInformation',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/corporate/CompanyAdminInformation.vue'),
          },
          {
            path: 'verification',
            name: 'Verification',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/corporate/Verification.vue'),
          },
        ],
      },
      {
        path: '/insurance',
        name: 'InsuranceClients',
        component: () => import(/* webpackChunkName: "admin" */ '../views/client/insurance/InsuranceClients.vue'),
      },
      {
        path: '/insurance/:id',
        component: () => import(/* webpackChunkName: "corporate" */ '../views/client/insurance/ClientDetail.vue'),
        children: [
          {
            path: 'summary',
            name: 'InsuranceSummary',
            component: () => import(/* webpackChunkName: "insurance" */ '../views/client/insurance/ClientSummary.vue'),
          },
          {
            path: 'bills',
            name: 'InsuranceBills',
            component: () => import(/* webpackChunkName: "insurance" */ '../views/client/insurance/ClientBills.vue'),
            props: true,
          },
          {
            path: 'transactions',
            name: 'InsuranceTransactions',
            component: () => import(/* webpackChunkName: "insurance" */ '../views/client/insurance/ClientTransactions.vue'),
            props: true,
          },
          {
            path: 'policies',
            name: 'InsurancePolicy',
            component: () => import(/* webpackChunkName: "insurance" */ '../views/client/insurance/ClientPolicy.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/register-insurance',
        props: true,
        component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/insurance/RegisterClient.vue'),
        children: [
          {
            path: '',
            name: 'InsuranceInformation',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/insurance/CompanyInformation.vue'),
          },
          {
            path: 'admin-information',
            name: 'InsuranceAdminInformation',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/insurance/CompanyAdminInformation.vue'),
          },
          {
            path: 'verification',
            name: 'InsuranceVerification',
            component: () => import(/* webpackChunkName: "registerclient" */ '../views/client/insurance/Verification.vue'),
          },
        ],
      },
      {
        path: '/clients/:id/benefactors',
        name: 'InsuranceBenefactors',
        component: () => import(/* webpackChunkName: "insurance" */ '../views/client/insurance/ClientEmployees.vue'),
      },
      {
        path: '/register-team',
        component: () => import(/* webpackChunkName: "registeruser" */ '../views/client/team/RegisterTeam.vue'),
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
            meta: {previous: null, next: 'ServicePricing'},
          },
          {
            path: '/register-service/pricing',
            name: 'ServicePricing',
            component: () => import(/* webpackChunkName: "registerservice" */ '../views/client/services/ServicePricing.vue'),
            meta: {previous: 'ServiceInformation', next: 'ServiceAvailability'},
          },
          {
            path: '/register-service/availability',
            name: 'ServiceAvailability',
            component: () => import(/* webpackChunkName: "registerservice" */ '../views/client/services/ServiceAvailability.vue'),
            meta: {previous: 'ServicePricing', next: null},
          },
        ],
      },
      {
        path: '/register-ward',
        component: () => import(/* webpackChunkName: "registerwards" */ '../views/client/wards/RegisterWards.vue'),
        children: [
          {
            path: '',
            name: 'WardInformation',
            component: () => import(/* webpackChunkName: "registerwards" */ '../views/client/wards/WardInformation.vue'),
            meta: {previous: null, next: 'WardPricing'},
          },
          {
            path: 'pricing',
            name: 'WardPricing',
            component: () => import(/* webpackChunkName: "registerwards" */ '../views/client/services/ServicePricing.vue'),
            meta: {previous: 'WardInformation', next: 'WardAvailability'},
          },
          {
            path: 'availability',
            name: 'WardAvailability',
            component: () => import(/* webpackChunkName: "registerwards" */ '../views/client/services/ServiceAvailability.vue'),
            meta: {previous: 'WardPricing', next: null},
          },
        ],
      },
      {
        path: '/register-resource',
        component: () => import(/* webpackChunkName: "registerresources" */ '../views/client/resources/RegisterResource.vue'),
        children: [
          {
            path: '',
            name: 'ResourceInformation',
            component: () => import(/* webpackChunkName: "registerresources" */ '../views/client/resources/ResourceInformation.vue'),
          },
        ],
      },
      {
        path: '/register-admission',
        component: () => import(/* webpackChunkName: "registeradmissions" */ '../views/client/admissions/RegisterAdmission.vue'),
        children: [
          {
            path: '',
            name: 'AdmissionSelectPatient',
            component: () => import(/* webpackChunkName: "registeradmissions" */ '../views/client/appointments/SelectPatient.vue'),
            meta: { next: 'AdmissionPricing', previous: null, parent: 'Dashboard'},
          },
          {
            path: 'pricing',
            name: 'AdmissionPricing',
            component: () => import(/* webpackChunkName: "registeradmissions" */ '../views/client/admissions/AdmissionPricing.vue'),
            meta: { next: 'AdmissionDetails', previous: 'AdmissionSelectPatient', parent: 'Dashboard'},
          },
          {
            path: 'details',
            name: 'AdmissionDetails',
            component: () => import(/* webpackChunkName: "registeradmissions" */ '../views/client/admissions/AdmissionDetails.vue'),
            meta: { previous: 'AdmissionPricing', next: 'AdmissionPayment', parent: 'Dashboard'},
          },
          {
            path: 'payment',
            name: 'AdmissionPayment',
            component: () => import(/* webpackChunkName: "registeradmissions" */ '../views/client/appointments/AppointmentPayment.vue'),
            meta: { next: 'AdmissionNotes', previous: 'AdmissionNotes', parent: 'Dashboard'},
          },
          {
            path: 'notes',
            name: 'AdmissionNotes',
            component: () => import(/* webpackChunkName: "registeradmissions" */ '../views/client/appointments/AppointmentNotes.vue'),
            meta: { next: 'AdmissionSummary', previous: 'AdmissionPayment', parent: 'Dashboard'},
          },
          {
            path: 'summary',
            name: 'AdmissionSummary',
            component: () => import(/* webpackChunkName: "registeradmissions" */ '../views/client/appointments/AppointmentNotes.vue'),
            meta: { next: null, previous: 'AdmissionNotes', parent: 'Dashboard'},
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
            path: 'contact-information',
            name: 'ContactInfo',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/ContactInfo.vue'),
          },
          {
            path: 'emergency-contact',
            name: 'EmergencyContact',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/EmergencyContact.vue'),
          },
          {
            path: 'social-info',
            name: 'SocialInfo',
            component: () => import(/* webpackChunkName: "registerpatient" */ '../views/client/patients/register/SocialInfo.vue'),
          },
          {
            path: 'payment',
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
            meta: { next: 'ClinicsServices', previous: null, parent: 'Appointments'},
          },
          {
            path: '/appointment/:id/update',
            name: 'AppointmentUpdate',
            component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/AppointmentUpdate.vue'),
            meta: { middleware: [fetchAppointment] },
            props: true,
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
            meta: { next: 'AppointmentSummary', previous: 'DateDoctor', parent: 'Appointments'},
          },
          {
            path: '/appointment/summary',
            name: 'AppointmentSummary',
            component: () => import(/* webpackChunkName: "appointment" */ '../views/client/appointments/AppointmentSummary.vue'),
          },
        ],
      },
      {
        path: '/diagnostic',
        // name: 'Diagnostic',
        component: () => import(/* webpackChunkName: "diagnostic" */ '../views/client/diagnostic/NewDiagnostic.vue'),
        children: [
          {
            path: '',
            name: 'DiagnosticSelectPatient',
            component: () => import(/* webpackChunkName: "diagnostic" */ '../views/client/diagnostic/SelectPatient.vue'),
          },
          {
            path: '/diagnostic/service',
            name: 'DiagnosticService',
            component: () => import(/* webpackChunkName: "diagnostic" */ '../views/client/diagnostic/DiagnosticService.vue'),
          },
          {
            path: '/diagnostic/payment',
            name: 'DiagnosticPayment',
            component: () => import(/* webpackChunkName: "diagnostic" */ '../views/client/diagnostic/DiagnosticPayment.vue'),
          },
          {
            path: '/diagnostic/summary',
            name: 'DiagnosticSummary',
            component: () => import(/* webpackChunkName: "diagnostic" */ '../views/client/diagnostic/DiagnosticSummary.vue'),
          },
        ],
      },
      {
        path: '/bill',
        // name: 'billing',
        component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/NewBilling.vue'),
        children: [
          {
            path: '',
            name: 'BillingSelectPatient',
            component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/SelectPatient.vue'),
          },
          {
            path: '/bill/service',
            name: 'BillingService',
            component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/BillingService.vue'),
          },
          {
            path: '/bill/payment',
            name: 'BillingPayment',
            component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/BillingPayment.vue'),
          },
          {
            path: '/bill/summary',
            name: 'BillingSummary',
            component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/BillingSummary.vue'),
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
            path: '/patients/:id/referrals',
            name: 'PatientReferrals',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientReferral.vue'),
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
            props: true,
          },
          {
            path: '/patients/:id/bills',
            name: 'PatientBills',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientBills.vue'),
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
      {
        path: 'patients/:id/encounters/:encounter',
        component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncountersIndex.vue'),
        props: true,
        children: [
          {
            path: '',
            name: 'EncounterReview',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncountersReview.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'diagnosis',
            name: 'EncounterDiagnosis',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncountersDiagnosis.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'diagnosis/:diagnosisId',
            name: 'EditEncounterDiagnosis',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncountersDiagnosis.vue'),
            meta: { noPadding: true },
            props: true,
          },
          {
            path: 'labs',
            name: 'EncounterLabs',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncounterLabs.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'labs/:labId',
            name: 'EditEncounterLab',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncounterLabs.vue'),
            meta: { noPadding: true },
            props: true,
          },
          {
            path: 'medications',
            name: 'EncounterMedications',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncounterMedications.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'medications/:medicationId',
            name: 'EditEncounterMedication',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncounterMedications.vue'),
            meta: { noPadding: true },
            props: true,
          },
          {
            path: 'care-plan',
            name: 'EncounterCarePlan',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncounterCarePlan.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'care-plan/:planId',
            name: 'EditEncounterCarePlan',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncounterCarePlan.vue'),
            meta: { noPadding: true },
            props: true,
          },
          {
            path: 'summary',
            name: 'EncountersSummary',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncountersSummary.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'referral',
            name: 'EncounterReferral',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncountersReferral.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'referral/:referralId',
            name: 'EditEncounterReferral',
            component: () => import(/* webpackChunkName: "encounter" */ '../views/client/encounters/EncountersReferral.vue'),
            meta: { noPadding: true },
            props: true,
          },
        ],
      },
      {
        path: '/pharmacy',
        name: 'Pharmacy',
        component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/pharmacy/Pharmacy.vue'),
      },
      {
        path: '/pharmacy/patients',
        name: 'Pharmacy:Patients',
        component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/pharmacy/Patients.vue'),
      },
      {
        path: '/pharmacy/patients/:id',
        props: true,
        component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/pharmacy/Patient.vue'),
        children: [
          {
            path: 'summary',
            name: 'Pharmacy:PatientSummary',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientSummary.vue'),
          },
          {
            path: 'chart',
            name: 'Pharmacy:PatientChart',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientCharts.vue'),
          },
          {
            path: 'bills',
            name: 'Pharmacy:PatientBills',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientBills.vue'),
          },
          {
            path: 'prescriptions',
            name: 'Pharmacy:PatientPrescriptions',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientPrescriptions.vue'),
            props: true,
          },
          {
            path: '',
            name: 'Pharmacy:PatientPendingPrescriptions',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/pharmacy/patient/Prescriptions.vue'),
            props: true,
          },
        ],
      },
      {
        path: '/pharmacy/dispense',
        name: 'Pharmacy:Dispense',
        component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/pharmacy/Dispense.vue'),
      },
      {
        path: '/pharmacy/new',
        name: 'Pharmacy:New',
        component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/pharmacy/NewPrescription.vue'),
      },
      {
        path: '/pharmacy/new/patient',
        name: 'Pharmacy:PatientNew',
        component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/pharmacy/NewPrescription.vue'),
      },
      // {
      //   path: '/pharmacy/dispense',
      //   name: 'Pharmacy:Dispense',
      // }
      {
        path: '/invoices',
        name: 'Invoices',
        component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/Invoices.vue'),
      },
      {
        path: '/billing/patients',
        name: 'Billing:Patients',
        component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/Patients.vue'),
      },
      {
        path: '/billing/patients/:id',
        props: true,
        component: () => import(/* webpackChunkName: "billing" */ '../views/client/billing/Patient.vue'),
        children: [
          {
            path: 'summary',
            name: 'Billing:Patient',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientSummary.vue'),
          },
          {
            path: 'bills',
            name: 'Billing:PatientBills',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/patients/PatientBills.vue'),
          },
          {
            path: 'account-history',
            name: 'Billing:PatientAccountHistory',
            component: () => import(/* webpackChunkName: "patient" */ '../views/client/billing/PatientAccountHistory.vue'),
          },
        ],
      },
      {
        path: '/diagnostics/patients',
        name: 'Diagnostic:Patients',
        props: true,
        component: () => import(/* webpackChunkName: "diagnostics" */ '../views/client/diagnostic/Patients.vue'),
      },
      {
        path: '/diagnostics/reports',
        name: 'Diagnostic:Reports',
        props: true,
        component: () => import(/* webpackChunkName: "diagnostics" */ '../views/client/diagnostic/Reports.vue'),
      },
      {
        path: '/diagnostics/devices',
        name: 'Diagnostic:Devices',
        props: true,
        component: () => import(/* webpackChunkName: "diagnostics" */ '../views/client/diagnostic/Devices.vue'),
      },
      {
        path: '/diagnostic-orders',
        name: 'Orders',
        props: true,
        component: () => import(/* webpackChunkName: "diagnostics" */ '../views/client/Orders.vue'),
      },
      {
        path: '/diagnostics/patients/:id',
        name: 'Diagnostic:Patient',
        props: true,
        component: () => import(/* webpackChunkName: "diagnostics" */ '../views/client/diagnostic/Patient.vue'),
      },
      {
        path: '/diagnostics/patient-lab/:id',
        name: 'Diagnostic:Labs',
        props: true,
        component: () => import(/* webpackChunkName: "diagnostics" */ '../views/client/diagnostic/LabResults.vue'),
      },
      {
        path: '/virtual-care/patients',
        name: 'VirtualCare:Patients',
        props: true,
        component: () => import(/* webpackChunkName: "virtual-care" */ '../views/client/virtual-care/Patients.vue'),
      },
      {
        path: '/virtual-care/patients/:id',
        name: 'VirtualCare:Patient',
        props: true,
        component: () => import(/* webpackChunkName: "virtual-care" */ '../views/client/virtual-care/Patient.vue'),
      },

      {
        path: 'patients/:id/virtual-care/:care',
        component: () => import(/* webpackChunkName: "virtual-care" */ '../views/client/virtual-care/VirtualCareIndex.vue'),
        props: true,
        children: [
          {
            path: '',
            name: 'VirtualCareChat',
            component: () => import(/* webpackChunkName: "virtual-care" */ '../views/client/virtual-care/VirtualCareChat.vue'),
            meta: { noPadding: true },
          },
          {
            path: 'video',
            name: 'VirtualCareVideo',
            component: () => import(/* webpackChunkName: "virtual-care" */ '../views/client/virtual-care/VirtualCareVideo.vue'),
            meta: { noPadding: true },
          },
        ],
      },

      {
        path: '/checkout',
        props: true,
        component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/checkout/CheckoutIndex.vue'),
        children: [
          {
            path: '',
            name: 'CheckoutSelectPatient',
            component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/checkout/CheckoutSelectPatient.vue'),
          },
          {
            path: 'payment-options',
            name: 'CheckoutPaymentOptions',
            component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/checkout/CheckoutPaymentOptions.vue'),
          },
          {
            path: 'receipts',
            name: 'CheckoutReceipts',
            component: () => import(/* webpackChunkName: "pharmacy" */ '../views/client/checkout/CheckoutReceipts.vue'),
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
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: () => import(/* webpackChunkName: "auth" */ '../views/NotFound.vue'),
  // },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
    permission: to.meta.permission ? to.meta.permission : null,
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  })
})

export default router
