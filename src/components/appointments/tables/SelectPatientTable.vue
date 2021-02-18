<template>
  <div>
    <!-- header -->
    <div
      :class="[`grid-cols-${columns.length}`]"
      class="grid gap-4 px-4 h-12 bg-table"
    >
      <div
        v-for="(column, index) in columns"
        :key="index"
        class="flex items-center"
      >
        <p class="font-semibold">{{ column }}</p>
      </div>
    </div>
    <!-- body -->
    <div class="divide-y divide-dark divide-opacity-10 divide-solid">
      <div
        v-for="(row, rowIndex) in data"
        :key="`${rowIndex}`"
        :class="[`grid-cols-${columns.length}`, internalPatient === row ? 'bg-serenity-subtle-border' : 'bg-white']"
        class="grid gap-4 px-4 cursor-pointer"
        @click="internalPatient = row"
      >
        <div class="flex items-center py-4 space-x-3">
          <cv-radio-button
            v-model="internalPatient"
            :value="row"
            name="group-1"
          />
          <img
            class="w-12 h-12 rounded-full"
            :src="row.image"
            alt=""
          >
          <div>
            <p class="">{{ row.name }}</p>
            <p class="text-secondary text-xs">
              {{ row.gender }}, {{ row.age }} years
            </p>
          </div>
        </div>
        <div class="flex justify-center flex-col">
          <p class="">{{ row.weight }}kg</p>
          <p class="text-secondary text-xs">{{ row.height }}cm</p>
        </div>
        <div class="flex items-center ">
          <p class="">{{ row.phone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectPatientTable',

  props: {
    columns: {
      type: Array,
      default:() => [],
    },
    data: {
      type: Array,
      required: true,
    },
    patient: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    internalPatient: {
      set(val) {
        this.$emit('update:patient', val)
      },
      get() {
        return this.patient
      },
    },
  },
}
</script>
