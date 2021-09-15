<template>
  <cv-tabs
    class="se-tabs"
    :open="true"
    :container="false"
    aria-label="navigation tab label"
  >
    <cv-tab
      id="queue"
      label="Queue"
    >
      <UtilityQueue />
    </cv-tab>
    <cv-tab
      id="patients"
      label="Patients"
    >
      <UtilityPatients />
    </cv-tab>
  </cv-tabs>
</template>

<script>
import UtilityQueue from './UtilityQueue'
import UtilityPatients from './UtilityPatients'

export default {
  name: 'UtilityBar',

  components: { UtilityQueue, UtilityPatients },
}
</script>
