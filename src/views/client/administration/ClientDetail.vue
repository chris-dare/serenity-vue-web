<template>
  <div class="w-4/5 mx-auto space-y-4">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <div class="space-y-1">
            <p class="font-semibold">Barclays Bank Ghana</p>
            <p class="text-secondary">
              Corporate Client
            </p>
            <div class="flex items-center">
              <p>Client No: 0012456</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <SeButton>
          Raise claim
        </SeButton>
      </div>
    </div>
    <div class="bg-white px-4 py-6 grid grid-cols-5 divide-x divide-gray-100 divide-solid">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-col items-center justify-center h-24"
      >
        <p class="text-xl font-semibold">{{ item.value }}</p>
        <p class="text-secondary text-sm">{{ item.label }}</p>
      </div>
    </div>

    <div class="mt-2 bg-white flex">
      <div
        v-for="(link, index) in links"
        :key="index"
        class="relative cursor-pointer items-center justify-center flex border-b-2 py-4 border-serenity-primary-highlight w-16"
        @click="selected = link.value"
      >
        {{ link.label }}
        <div
          class="w-4/5 mx-auto h-0.5 absolute bg-serenity-light-gray bottom-0"
          :class="{ 'bg-serenity-primary-highlight': link.value === selected }"
        />
      </div>
    </div>

    <div
      v-if="selected === 'about'"
      class="grid grid-cols-2 gap-4"
    >
      <PatientSummaryCard
        title="General Information"
        :fields="generalFields"
      />
      <PatientSummaryCard
        title="Admin Information"
        :fields="emergencyFields"
      />
    </div>
    <div v-else>
      <div class="flex justify-end">
        <cv-date-picker
          v-model="date"
          class="flex-none se-date-picker"
          kind="range"
          :cal-options="{
            dateFormat: 'm/d/Y',
          }"
        />
      </div>
      <cv-data-table
        :columns="columns"
        :pagination="{
          numberOfItems: 5,
          pageSizes: [5, 10, 15, 20, 25]
        }"
        :data="[]"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 5"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              {{ $date.formatDate($faker().date.recent(), 'yyyy/MM/dd') }}
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                {{ Math.random() }}
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>Specialist Appointment</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>Virtual</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $faker().phone.phoneNumber() }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $faker().phone.phoneNumber() }}</p>
              </div>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
  </div>
</template>

<script>
import Add from '@carbon/icons-vue/es/add/32'
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
export default {
  name: 'ClientDetail',

  components: { PatientSummaryCard },

  data() {
    return {
      add: Add,
      date: '',
      items: [
        {label: 'Account type', value: 'limited-debit-active'},
        {label: 'Current balance', value: 125},
        {label: 'Credit start date', value: '08-Feb-2021'},
        {label: 'Credit duration', value: '30 days'},
        {label: 'Credit end date', value: '38-Feb-2021'},
      ],
      selected: 'about',
      links: [
        { label: 'About', value: 'about' },
        { label: 'Bills', path: 'bills' },
      ],
      columns: [
        'Date',
        'Bill ID',
        'Service',
        'Price',
        'Practitioner',
        'Payment Method',
      ],
    }
  },
  computed: {
    generalFields() {
      return [
        { label: 'Date of Birth', value: this.$faker().lorem.word() },
        { label: 'Phone', value: this.$faker().lorem.word() },
        { label: 'Address', value: this.$faker().lorem.word() },
        { label: 'Email', value: this.$faker().lorem.word() },
      ]
    },
    emergencyFields() {
      return [
        { label: 'First Name', value: this.$faker().lorem.word() },
        { label: 'Last Name', value: this.$faker().lorem.word() },
        { label: 'Phone Number', value: this.$faker().lorem.word() },
        { label: 'Admin Email', value: this.$faker().lorem.word() },
      ]
    },
  },

}
</script>