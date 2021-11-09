<template>
  <SeForm
    class="max-w-5xl mx-auto"
    :data-qa="checked"
  >
    <p class="text-primary text-xl font-semibold">{{ label }}</p>
    <div class="grid grid-cols-4 my-6 gap-6">
      <div>
        <cv-radio-group :vertical="true">
          <div
            v-for="(item, index) in navItems"
            :key="index"
            :class="[checked == item.path ? 'border-serenity-primary' : 'border-serenity-subtle-border']"
            class="border-l-2  h-20 flex items-center border-solid px-4 cursor-pointer"
            @click="goTo(item)"
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
          </div>
        </cv-radio-group>
      </div>
      <div class="col-span-3 bg-white py-4 px-8">
        <slot />
      </div>
    </div>
  </SeForm>
</template>

<script>
import CircleFilled from '@carbon/icons-vue/es/circle--filled/32'
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
export default {
  name: 'AppRegisterLayout',
  // eslint-disable-next-line vue/no-unused-components
  components: { CircleFilled, Checkmark },

  props: {
    navItems: {
      type: Array,
      default: () => [],
    },

    label: {
      type: String,
      default: '',
    },

    checked: {
      type: [Number, String],
      default: '',
    },

    modal: {
      type: Boolean,
      default: false,
    },
  },

  // data() {
  //   return {
  //     checked: '',
  //   }
  // },

  // watch: {
  //   $route: {
  //     deep: true,
  //     immediate: true,
  //     handler: function (val) {
  //       this.checked = val.name
  //     },
  //   },
  // },

  methods: {
    goTo(item) {
      if (this.modal) {
        this.$emit('next', item.step)
        return
      }
      this.$trigger('multistep:save')
      this.$router.push({ name: item.path, query: { ...this.$route.query }})
    },
  },
}
</script>

