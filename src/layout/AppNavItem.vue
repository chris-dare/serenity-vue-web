<template functional>
  <div class="w-full">
    <cv-tooltip
      alignment="center"
      direction="right"
      :tip="props.label"
      class="w-full se-tooltip"
    >
      <router-link
        tag="div"
        :to="props.to"
        class="flex items-center h-12 w-full hover:bg-serenity-primary-highlight relative cursor-pointer"
        exact-active-class="bg-serenity-primary-highlight"
        :data-qa="props.label"
      >
        <slot />

        <div
          v-if="props.hasNotifications"
          class="w-2 h-2 rounded-full bg-yellow-400 absolute right-1"
        />
      </router-link>
    </cv-tooltip>
  </div>
</template>
