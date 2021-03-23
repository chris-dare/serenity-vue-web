<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Corporate Clients ({{ 5 }})</p>
        <router-link
          :to="{name:'CompanyInformation'}"
          tag="cv-button"
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
        >
          Add new company
          <Add class="ml-4 w-5 h-5" />
        </router-link>
      </div>

      <cv-search
        v-model="search"
        placeholder="Search for company"
        autocomplete="off"
      />

      <cv-data-table
        ref="table"
        :data="[]"
        :columns="columns"
        :pagination="{ itemsPerPage:10, numberOfItems: 12, pageSizes: [10, 15, 20, 25] }"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in 10"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center space-x-2 py-2">
                <Avatar :name="$faker().name.findName()" />
                <p>{{ $faker().name.findName() }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ $faker().phone.phoneNumber() }}</p>
            </cv-data-table-cell>
            
            
            <cv-data-table-cell>
              <p>{{ Math.round(Math.random()) }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p class="lowercase">{{ $faker().internet.email() }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <router-link
                tag="div"
                :to="`/clients/${Math.random()}`"
                class="flex items-center cursor-pointer font-semibold"
              >
                View client
              </router-link>
            </cv-data-table-cell>
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
  </div>
</template>

<script>
import Add from '@carbon/icons-vue/es/add/32'
export default {
  name: 'CorporateClients',

  components: { Add },

  data() {
    return {
      search: '',
      columns: [
        'Company name',
        'Mobile',
        'TIN Number',
        'Email',
        'Action',
      ],
    }
  },
}
</script>
