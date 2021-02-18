<template>
  <div class="w-3/4 mx-auto">
    <p class="text-primary text-xl font-semibold">Register new patient</p>
    <div class="grid grid-cols-4 my-6 gap-6">
      <div>
        <cv-radio-group :vertical="true">
          <router-link
            v-for="(item, index) in navItems"
            :key="index"
            tag="div"
            :to="{name: item.path}"
            :class="[checked == item.path ? 'border-serenity-primary' : 'border-serenity-subtle-border']"
            class="border-l-2  h-20 flex items-center border-solid px-4 cursor-pointer"
          >
            <div class="flex">
              <div>
                <CircleFilled
                  v-if="checked == item.path"
                  class="w-5 h-5"
                  :class="[checked == item.path ? 'text-serenity-primary' : 'text-primary']"
                />
                <div
                  v-else
                  class="w-5 h-5 border border-solid rounded-full"
                />
              </div>
              <div class="ml-4">
                <p
                  class="leading-4"
                  :class="[checked == item.path ? 'text-serenity-primary' : 'text-primary']"
                >
                  {{ item.label }}
                </p>
                <p class="text-xs text-secondary leading-7">{{ item.description }}</p>
              </div>
            </div>
          </router-link>
        </cv-radio-group>
      </div>
      <div class="col-span-3 bg-white py-4 px-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import CircleFilled from '@carbon/icons-vue/es/circle--filled/32'
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CircleFilled, Checkmark },
  data() {
    return {
      checked: '',
      navItems: [
        { label: 'Biodata', description: 'Patient biological information', path: 'Biodata'},
        { label: 'Contact Information', description: 'Phone and location of patient', path: 'ContactInfo'},
        { label: 'Emergency Contact', description: 'Family and friends', path: 'EmergencyContact'},
        { label: 'Social Information', description: 'Work, religion, other addresses', path: 'SocialInfo'},
        { label: 'Payment', description: 'Method for payment', path: 'Payment'},
      ],
    }
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.checked = val.name
      },
    },
  },
}
</script>

<style></style>
