<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Schedules ({{ 5 }})</p>
        <cv-button
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
          @click="$trigger('service:add:open')"
        >
          Add new service
          <Add class="ml-4 w-5 h-5" />
        </cv-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>