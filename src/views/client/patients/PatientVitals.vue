<template>
  <div class="w-3/4 mx-auto">
    <p class="text-primary text-xl font-semibold">Capture vitals</p>
    <div class="grid grid-cols-4 my-6 gap-6">
      <div>
        <cv-radio-group :vertical="true">
          <div
            tag="div"
            :class="[
              checked == item.index
                ? 'border-serenity-primary'
                : 'border-serenity-subtle-border',
            ]"
            class="border-l-2 text-sm h-20 flex items-center border-solid px-4 cursor-pointer"
            v-for="(item, index) in navItems"
            :key="index"
            @click="checked = item.index"
          >
            <div class="flex">
              <div>
                <CircleFilled
                  v-if="checked == item.index"
                  class="w-5 h-5"
                  :class="[
                    checked == item.index
                      ? 'text-serenity-primary'
                      : 'text-primary',
                  ]"
                />
                <CheckmarkOutline
                  v-else-if="checked >= item.index"
                  class="w-5 h-5 text-serenity-primary"
                />
                <div
                  class="w-5 h-5 border border-solid rounded-full"
                  v-else
                ></div>
              </div>
              <div class="ml-4">
                <p
                  class="leading-4"
                  :class="[
                    checked == item.index
                      ? 'text-serenity-primary'
                      : 'text-primary',
                  ]"
                >
                  {{ item.label }}
                </p>
                <p class="text-xs text-secondary leading-7">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </cv-radio-group>
      </div>
      <div class="col-span-3 bg-white py-4 px-8">
        <WeightHeight v-if="checked === 0" :form.sync="form" @next="nextStep" />
        <Temperature v-else-if="checked === 1" :form.sync="form" @next="nextStep" />
        <Pressure v-else-if="checked === 2" :form.sync="form" @next="nextStep" />
        <Respiration v-else :form.sync="form" @confirm="visible = !visible" />
      </div>
    </div>
    <ConfirmVitalsModal :visible.sync="visible" :form="form" />
  </div>
</template>

<script>
import WeightHeight from '@/components/vitals/WeightHeight'
import Temperature from '@/components/vitals/Temperature'
import Pressure from '@/components/vitals/Pressure'
import Respiration from '@/components/vitals/Respiration'
import ConfirmVitalsModal from '@/components/vitals/ConfirmVitalsModal'
import CircleFilled from '@carbon/icons-vue/es/circle--filled/32'
import CheckmarkOutline from '@carbon/icons-vue/es/checkmark--outline/32.js'
export default {
    name: 'PatientVitals',

    components: { CircleFilled, WeightHeight, Temperature, Pressure, Respiration, ConfirmVitalsModal, CheckmarkOutline },

    data() {
        return {
            checked: 0,
            visible: false,
            navItems: [
                { label: 'Weight and Height', description: 'Patient biological information', value: 'weight', index: 0},
                { label: 'Temperature', description: 'Phone and location of patient', value: 'temperature', index: 1},
                { label: 'Blood Pressure', description: 'Family and friends', value: 'pressure', index: 2},
                { label: 'Respiration Rate and SPO2', description: 'Work, religion, other addresses', value: 'respiration', index: 3},
            ],
            form: {},
        }
    },

    methods: {
        nextStep(step) {
            this.checked = step
        },
    },
}
</script>
