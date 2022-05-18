<template>
  <div>
    <AdmitPatientModal v-if="$isCurrentWorkspace('IPD')" />
    <ObservationsModal v-if="$isCurrentWorkspace('IPD')" />
    <RequestDiagnosticTestModal />
    <AddNotesModal />
    <MarkAsDeceasedModal />
    <DeceasedDetailsModal />
    <EndVisitConfirmationModal />
    <StartEncounterModal />
    <ServiceRequestModal />
    <MedicationRequestModal />
    <EncounterReferralModal />
    <CaptureVitalsModal />
    <PatientEncountersModal />
  </div>
</template>

<script>
const AdmitPatientModal = () => import('@/components/patients/modals/AdmitPatientModal')
const RequestDiagnosticTestModal = () => import('@/components/patients/modals/RequestDiagnosticTestModal')
const AddNotesModal = () => import('@/components/patients/modals/AddNotesModal')
const MarkAsDeceasedModal = () => import('@/components/patients/modals/MarkAsDeceasedModal')
const DeceasedDetailsModal = () => import('@/components/patients/modals/DeaceasedDetailsModal')
const EndVisitConfirmationModal = () => import('@/components/patients/modals/EndVisitConfirmationModal')
const StartEncounterModal = () => import('@/components/patients/encounters/StartEncounterModal')
const ServiceRequestModal = () => import('@/components/patients/modals/ServiceRequestModal')
const MedicationRequestModal = () => import('@/components/patients/modals/MedicationRequestModal')
const EncounterReferralModal = () => import('@/components/patients/encounters/modals/EncounterReferralModal')
const PatientEncountersModal = () => import('@/components/patients/modals/PatientEncountersModal')
const CaptureVitalsModal = () => import('@/components/vitals/CaptureVitalsModal')

export default {
  name: 'SinglePatientModals',
  components: {
    CaptureVitalsModal,
    EncounterReferralModal,
    AdmitPatientModal,
    MedicationRequestModal,
    StartEncounterModal,
    ServiceRequestModal,
    RequestDiagnosticTestModal,
    AddNotesModal,
    MarkAsDeceasedModal,
    DeceasedDetailsModal,
    EndVisitConfirmationModal,
    PatientEncountersModal,
    ObservationsModal: () => import(/* webpackPrefetch: true */ '@/components/ipd/observations/ObservationsModal'),
  },
}
</script>
