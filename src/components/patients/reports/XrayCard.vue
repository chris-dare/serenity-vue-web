<template functional>
  <div
    class="h-72 border border-subtle border-solid bg-white p-4 cursor-pointer"
    @click="listeners['click']"
  >
    <div class="flex flex-wrap items-center h-3/5">
      <img
        class="w-full h-full"
        src="@/assets/img/frame.svg"
        alt=""
      >
    </div>
    <div class="my-4">
      <span
        class="bg-serenity-primary py-1 px-2 rounded-xl text-white text-xs w-auto"
      >
        X-ray
      </span>
    </div>
    <div>
      <p>{{ props.report.display }} — {{ props.date }}</p>
    </div>
  </div>
</template>
