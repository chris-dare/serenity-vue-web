<template>
  <Dropdown
    :visible.sync="visible"
    with-shadow
  >
    <!-- <div
      @click="visible = !visible"
      slot="label"
      class="w-12 flex items-center justify-center h-12 cursor-pointer"
      :class="[visible ? 'bg-serenity-primary' : '']"
    >
      <img src="@/assets/img/notification 2.svg" class="w-5 h-5" alt="" />
    </div> -->
    <cv-button
      slot="label"
      size="field"
      kind="ghost"
      class="px-4 bg-white hover:bg-white mr-2 text-placeholder"
      @click="visible = !visible"
    >
      Filters
      <img
        src="@/assets/img/filter 1.svg"
        class="ml-2"
        alt=""
      >
    </cv-button>
    <div class="w-52 bg-white mt-2">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="h-12 flex items-center px-6"
      >
        {{ item }}
      </div>
    </div>
  </Dropdown>
</template>

<script>
export default {
  name: 'FilterDropdown',

  props: {
    value: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      default: () => ['Filter 1', 'Filter 2'],
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    input: {
      set(val) {
        this.$emit('input', val)
      },
      get() {
        return this.value
      },
    },
  },
}
</script>
