<template functional>
  <div class="space-y-1 flex flex-col items-center w-auto">
    <div class="bg-blue-400 flex items-center justify-center w-24 h-16 text-4xl font-bold">
      {{ props.label || 0 }}
    </div>
    <p class="text-xs">{{ props.description || 'Total MEWS score' }}</p>
  </div>
</template>