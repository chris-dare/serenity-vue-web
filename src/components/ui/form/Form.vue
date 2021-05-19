<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <slot />
  </cv-form>
</template>

<script>
export default {
  name: 'SeForm',
}
</script>

<style>

</style>