<template>
  <div class="w-4/5 mx-auto">
    <div class="flex justify-between items-center">
      <p class="text-secondary font-semibold text-xl">
        Hello, <span class="text-primary">Dr. Grey Strep</span>
      </p>
      <div>
        <p class="text-xs">
          {{ $date.formatDate(Date.now(), "EEEE, MMM dd, yyyy") }}
        </p>
        <p class="font-semibold">
          {{ $date.formatDate(Date.now(), "HH:mm a") }}
        </p>
      </div>
    </div>
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6 my-4">
      <PatientCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="w-full bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
export default {
  name: 'Settings',

  components: { PatientCard },

  data() {
    return {
      selected: 'search',
      dashboardTypes: [
        {
          label: 'Provider Profile',
          description: 'Information about this company',
          type: 'home',
          value: 'profile',
        },
        {
          label: 'Admin Profile',
          description: 'A quick overview of you',
          type: 'user',
          value: 'add',
        },
        {
          label: 'Security',
          description: 'Protect your account',
          type: 'security',
          value: 'security',
        },
      ],
    }
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'profile' || dashboard.value === 'admin') {
        this.$trigger('profile:edit')
      }

      if (dashboard.value === 'security') {
        this.$trigger('profile:security')
      }
      
    },
  },
}
</script>
