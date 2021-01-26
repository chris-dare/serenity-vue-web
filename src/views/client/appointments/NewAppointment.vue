<template>
  <div class="w-4/5 mx-auto">
    <p class="text-primary text-xl font-semibold">New Appointment</p>
    <div class="grid grid-cols-4 my-6 gap-6">
      <div>
        <cv-radio-group :vertical="true">
            <router-link tag="div" :to="{name: item.path}" :class="[checked == item.path ? 'border-serenity-primary' : 'border-serenity-subtle-border']" class="border-l-2 text-sm h-20 flex items-center border-solid px-4 cursor-pointer" v-for="(item, index) in navItems" :key="index">
                <div class="flex">
                    <div>
                        <CircleFilled v-if="checked == item.path" class="w-5 h-5" :class="[checked == item.path ? 'text-serenity-primary' : 'text-primary']" />
                        <div class="w-5 h-5 border border-solid rounded-full" v-else></div>
                    </div>
                    <div class="ml-4">
                        <p class="leading-4" :class="[checked == item.path ? 'text-serenity-primary' : 'text-primary']">{{item.label}}</p>
                        <p class="text-xs text-secondary leading-7">{{ item.description }}</p>
                    </div>
                </div>
            </router-link>
        </cv-radio-group>
      </div>
      <div class="col-span-3 bg-white py-4 px-8">
          <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import CircleFilled from '@carbon/icons-vue/es/circle--filled/32'
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
export default {
    // eslint-disable-next-line vue/no-unused-components
    components: { CircleFilled, Checkmark },
    data() {
        return {
            checked: '',
            navItems: [
                { label: 'Select patient', description: 'Existing or new patient', path: 'SelectPatient'},
                { label: 'Clinics, Services', description: 'Choose service', path: 'ClinicsServices'},
                { label: 'Date, Doctor', description: 'Choose your date and doctor', path: 'DateDoctor'},
                { label: 'Payment', description: 'How patient makes payment', path: 'AppointmentPayment'},
                { label: 'Notes', description: 'Any notes to take', path: 'AppointmentNotes'},
                { label: 'Summary', description: 'Overview of appointment', path: 'AppointmentSummary'},
            ],
        }
    },

    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler: function (val) {
                this.checked = val.name
            },
        },
    },
}
</script>

<style></style>
