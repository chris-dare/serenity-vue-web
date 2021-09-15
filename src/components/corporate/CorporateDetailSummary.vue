<template functional>
  <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
    <div class="flex">
      <div class="flex items-center">
        <div class="space-y-1">
          <p class="font-semibold">{{ props.client.companyName || props.client.company.company_name }}</p>
          <p class="text-secondary">
            Corporate Client
          </p>
          <div class="flex items-center">
            <p>Client TIN No: {{ props.client.company.tin_number }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="props.client.company.state === 'verified'"
        class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        @click="listeners['edit']"
      >
        <img
          src="@/assets/img/edit 1.svg"
          class="w-4 h-4 cursor-pointer"
        >
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <SeButton
        v-if="props.client.company.state === 'verified'"
        class="mx-2"
        @click="listeners['update']"
      >
        Update Account
      </SeButton>
      <SeButton
        v-else
        @click="listeners['verify']"
      >
        Verify Client
      </SeButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CorporateDetailSummary',
}
</script>
