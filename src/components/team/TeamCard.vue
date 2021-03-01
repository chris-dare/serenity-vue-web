<template>
  <div class="bg-white w-full h-60 space-y-4 flex flex-col justify-center items-center">
    <img
      :src="$faker().image.image()"
      alt=""
      class="w-16 h-16 rounded-full"
    >
    <div class="space-y-1 flex items-center flex-col justify-center">
      <p class="font-semibold">Dr. Eben Gahm</p>
      <p class="text-sm text-primary">General Practitioner</p>
      <p class="text-sm text-secondary">nm@nmc.org</p>
    </div>
    <p class="text-sm text-serenity-primary font-semibold">View Profile</p>
  </div>
</template>
