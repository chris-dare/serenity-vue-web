<template functional>
  <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
    <div class="flex">
      <div class="flex items-center">
        <div class="space-y-1">
          <p class="font-semibold">{{ props.client.company.company_name }}</p>
          <p class="text-secondary">
            Insurance Company
          </p>
          <div class="flex items-center">
            <p>Client TIN No: {{ props.client.company.tin_number }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="props.client.status === 'ACTIVE'"
        class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        @click="listeners['edit']"
      >
        <img
          src="@/assets/img/edit 1.svg"
          class="w-4 h-4 cursor-pointer"
        >
      </div>
    </div>
    <div
      v-if="props.client.account_type"
      class="flex items-center space-x-2"
    >
      <SeButton
        v-if="props.client.status === 'ACTIVE'"
        class="mx-2 bg-serenity-gray"
        @click="listeners['verify']"
      >
        Suspend Account
      </SeButton>
      <SeButton
        v-else
        @click="listeners['verify']"
      >
        Verify Client
      </SeButton>
      <SeButton
        v-if="props.client.status === 'SUSPENDED'"
        class="mx-2 bg-serenity-gray"
        @click="listeners['verify']"
      >
        Close Account
      </SeButton>
    </div>
    <div v-else>
      <SeButton
        class="mx-2 bg-serenity-primary"
        @click="listeners['clientaccount']"
      >
        Create Client Account
      </SeButton>
    </div>
  </div>
</template>

<script>

export default {

  name: 'InsuranceDetailSummary',

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    options() {
      return [
        {
          label: 'Verify',
          event: 'verify',
        },
        {
          label: 'Suspend',
          event: 'suspend',
        },
      ]
    },
  },

  methods: {
    onSelect(val) {
      this.$emit(val.event)
      this.visible = false
    },
  },
}
</script>
