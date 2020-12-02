<template>
  <div>
    <cv-header class="relative bg-black flex">
      <div
        class="w-12 h-12 bg-serenity-gray flex justify-center items-center cursor-pointer"
      >
        <img src="@/assets/img/close.svg" alt="" />
      </div>
      <div class="flex justify-between items-center w-100">
        <cv-header-name href="javascript:void(0)">
            <img src="@/assets/img/logo-full.svg" alt="" />
        </cv-header-name>
        <div class="flex items-center">
            <cv-text-input
            class="no-label-input h-12 w-102"
            placeholder="Search for patient name or Phone number"
            v-model="search"
            >
            </cv-text-input>
            <div
            class="bg-serenity-gray h-12 flex items-center justify-center px-4"
            >
            <img src="@/assets/img/search 1.svg" alt="" />
            </div>
        </div>
        <div class="flex items-center mx-6">
            <div class="flex items-center">
            <img src="@/assets/img/location 1.svg" alt="" />
            <p class="ml-3 text-white text-sm">Airport Residential</p>
            </div>

            <cv-select class="no-label-input focus:bg-serenity-gray mx-6 text-sm" label="false">
                <cv-select-option class="text-white" disabled selected hidden>Out Patient</cv-select-option>
            </cv-select>

            <div class="w-12 flex items-center justify-center h-12">
                <img src="@/assets/img/notification 2.svg" class="w-5 h-5" alt="">
            </div>
            <div class="w-12 flex items-center justify-center h-12">
                <img src="@/assets/img/user 1.svg" class="w-5 h-5" alt="">
            </div>
        </div>
      </div>
    </cv-header>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',

  data() {
    return {
      search: '',
    }
  },
}
</script>
