<template>
  <div>
    <AdmitPatientModal />
    <RequestDiagnosticTestModal />
    <AddMedicationModal />
    <AddNotesModal />
    <MarkAsDeceasedModal />
    <DeceasedDetailsModal />
    <EndVisitConfirmationModal />
    <StartEncounterModal />
    <ServiceRequestModal />
    <MedicationRequestModal />
  </div>
</template>

<script>
const AdmitPatientModal = () => import('@/components/patients/modals/AdmitPatientModal')
const RequestDiagnosticTestModal = () => import('@/components/patients/modals/RequestDiagnosticTestModal')
const AddMedicationModal = () => import('@/components/patients/modals/AddMedicationModal')
const AddNotesModal = () => import('@/components/patients/modals/AddNotesModal')
const MarkAsDeceasedModal = () => import('@/components/patients/modals/MarkAsDeceasedModal')
const DeceasedDetailsModal = () => import('@/components/patients/modals/DeaceasedDetailsModal')
const EndVisitConfirmationModal = () => import('@/components/patients/modals/EndVisitConfirmationModal')
const StartEncounterModal = () => import('@/components/patients/encounters/StartEncounterModal')
const ServiceRequestModal = () => import('@/components/patients/modals/ServiceRequestModal')
const MedicationRequestModal = () => import('@/components/patients/modals/MedicationRequestModal')



export default {
  name: 'SinglePatientModals',
  components: { AdmitPatientModal, MedicationRequestModal, StartEncounterModal, ServiceRequestModal, RequestDiagnosticTestModal, AddMedicationModal, AddNotesModal, MarkAsDeceasedModal, DeceasedDetailsModal, EndVisitConfirmationModal },
}
</script>
