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



export default {
  name: 'SinglePatientModals',
  components: { AdmitPatientModal, StartEncounterModal, RequestDiagnosticTestModal, AddMedicationModal, AddNotesModal, MarkAsDeceasedModal, DeceasedDetailsModal, EndVisitConfirmationModal },
}
</script>
