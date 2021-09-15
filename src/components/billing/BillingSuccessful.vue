<template functional>
  <div>
    <div class="p-10 text-center">
      <div class="p-4 flex items-center justify-center"><CheckMark /></div>
      <h1 class="text-xl font-bold"> Payment successful! </h1>
      <p class="text-secondary text-sm"> Congratulations, the transaction was successfully accepted</p>
    </div>
    <div class="flex items-center justify-center mt-4">
      <SeButton @click="listeners['click']">Close</SeButton>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>