<template>
  <div>
    <div class="flex justify-between items-center">
      <p class="text-secondary font-semibold text-xl">
        Hello, <span class="text-primary">Dr. Grey Strep</span>
      </p>
      <div>
        <p class="text-xs">
          {{ $date.formatDate(Date.now(), "EEEE, MMM dd, yyyy") }}
        </p>
        <p class="font-semibold">
          {{ $date.formatDate(Date.now(), "HH:mm a") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
