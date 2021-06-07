<template functional>
  <div
    class="flex justify-between items-center hover:bg-serenity-subtle-border p-4 cursor-pointer"
  >
    <InfoImageBlock
      :label="props.name"
      :description="props.specialty"
    />
    <div class="text-center">
      <p>{{ props.slot }}</p>
    </div>
    <div>
      <SeButton
        v-if="props.specialty"
        @click="listeners['change']"
      >
        Change slot
      </SeButton>
    </div>
  </div>
</template>
