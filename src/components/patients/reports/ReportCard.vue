<template functional>
  <div
    class="h-72 border border-subtle border-solid bg-white p-4 cursor-pointer"
    @click="listeners['click']"
  >
    <div class="flex flex-wrap items-center h-3/5">
      <div class="rounded-lg h-3 w-12 bg-serenity-subtle-border m-1" />
      <div class="rounded-lg h-3 w-4/5 bg-serenity-subtle-border m-1" />
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1" />
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1" />
      <div class="rounded-lg h-3 w-4/5 bg-serenity-subtle-border m-1" />
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1" />
      <div class="rounded-lg h-3 w-5/6 bg-serenity-subtle-border m-1" />
    </div>
    <div class="my-4">
      <span
        class="bg-serenity-primary py-1 px-2 rounded-xl text-white text-xs w-auto"
      >
        {{ props.report.category }}
      </span>
    </div>
    <div>
      <p>{{ props.report.code }} — {{ props.date }}</p>
    </div>
  </div>
</template>
