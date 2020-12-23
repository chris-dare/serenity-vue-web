<template>
  <div @click="$emit('click')" class="h-72 border border-subtle border-solid bg-white p-4 cursor-pointer">
    <div class="flex flex-wrap items-center h-3/5">
      <div class="rounded-lg h-3 w-12 bg-serenity-subtle-border m-1"></div>
      <div class="rounded-lg h-3 w-4/5 bg-serenity-subtle-border m-1"></div>
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1"></div>
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1"></div>
      <div class="rounded-lg h-3 w-4/5 bg-serenity-subtle-border m-1"></div>
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1"></div>
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1"></div>
    </div>
    <div class="my-4">
      <span
        class="bg-serenity-primary py-1 px-2 rounded-xl text-white text-xs w-auto"
      >
        Lab report
      </span>
    </div>
    <div>
      <p>Full Blood Count — Mar 13 2020</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
