<template functional>
  <div>
    <p class="text-3xl font-bold text-serenity-primary">{{ props.description }}</p>
    <p class="text-secondary text-xs">{{ props.label }}</p>
  </div>
</template>

<script>
export default {
  name: 'InfoSubBlock',
}
</script>
