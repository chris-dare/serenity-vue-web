<template>
  <div>
    <div class="grid grid-cols-2 gap-8">
      <cv-select
        v-model="form.method_of_payment"
        label="Primary method of payment"
        class="inherit-full-input"
      >
        <cv-select-option disabled selected hidden
          >Mobile Money</cv-select-option
        >
        <cv-select-option
          v-for="(network, index) in networks"
          :key="index"
          :value="network"
          >{{ network }}</cv-select-option
        >
      </cv-select>
      <cv-select
        v-model="form.momo_network"
        label="MoMo Network"
        class="inherit-full-input"
      >
        <cv-select-option disabled selected hidden
          >MTN Mobile Money</cv-select-option
        >
        <cv-select-option
          v-for="(network, index) in networks"
          :key="index"
          :value="network"
          >{{ network }}</cv-select-option
        >
      </cv-select>
      <cv-text-input
        label="Name of Account"
        v-model="form.name_of_account"
        placeholder="Name of MoMo Account"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-text-input
        label="MoMo number"
        v-model="form.momo_number"
        placeholder="Eg. 054 — — — — —"
        class="inherit-full-input"
      >
      </cv-text-input>
      <cv-select
        v-model="form.secondary_method"
        label="Secondary method of payment"
        class="inherit-full-input"
      >
        <cv-select-option disabled selected hidden
          >Select an option</cv-select-option
        >
        <cv-select-option
          v-for="(network, index) in networks"
          :key="index"
          :value="network"
          >{{ network }}</cv-select-option
        >
      </cv-select>
    </div>
    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center">
        <cv-button
          class="border-serenity-primary mr-6 text-serenity-primary hover:text-white focus:bg-serenity-primary hover:bg-serenity-primary"
          kind="tertiary"
          >Cancel</cv-button
        >
        <cv-button @click="$router.push({ name: 'SocialInfo' })" class="bg-black" kind="primary">Go back</cv-button>
      </div>
      <div class="flex items-center">
        <cv-button
          @click="visible = !visible"
          :icon="icon"
          kind="primary"
          class="bg-serenity-primary ml-6"
          >Finish</cv-button
        >
      </div>
    </div>
    <PatientSuccessModal :visible.sync="visible" />
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import PatientSuccessModal from '@/components/patients/modals/PatientSuccessModal'
export default {
  name: 'Payment',

  components: {PatientSuccessModal},

  data() {
    return {
      form: {},
      icon: Checkmark,
      networks: ['MTN', 'Vodafone', 'AirtelTigo'],
      religions: ['christianity', 'islam'],
      visible: false,
    }
  },
}
</script>
