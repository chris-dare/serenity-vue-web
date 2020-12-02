<template>
  <cv-tabs :open="true" :container="false" aria-label="navigation tab label">
    <cv-tab id="queue" label="Queue">
      <Queue />
    </cv-tab>
    <cv-tab id="activity" label="Activities">
      <PatientActivities />
    </cv-tab>
    <cv-tab id="patients" label="Patients">
      <Patients />
    </cv-tab>
  </cv-tabs>
</template>

<script>
import Queue from './Queue'
import PatientActivities from './PatientActivities'
import Patients from './Patients'
export default {
  name: 'UtilityBar',

  components: { Queue, PatientActivities, Patients },
}
</script>
