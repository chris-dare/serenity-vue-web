<template>
  <div class="w-3/4 mx-auto">
    <p class="text-primary text-xl font-semibold">Register new company</p>
    <div class="grid grid-cols-4 my-6 gap-6">
      <div>
        <cv-radio-group :vertical="true">
          <router-link
            v-for="(item, index) in navItems"
            :key="index"
            :tag="item.verify ? 'div' : ''"
            to=""
            :class="[checked == item.path ? 'border-serenity-primary' : 'border-serenity-subtle-border']"
            class="flex items-center h-20 border-l-2 border-solid   px-4 cursor-pointer"
          >
            <div 
              v-if="item.verify"
              class="flex" 
            >
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
import { mapActions } from 'vuex'
export default {
  name: 'RegisterProvider',
  // eslint-disable-next-line vue/no-unused-components
  components: { CircleFilled, Checkmark },
  props: {
    id: {
      type: Number,
      required: false,
      default: undefined,
    }, 
  },
  data() {
    return {
      checked: '',
      navItems: [
        { label: 'Company Information', description: 'Basic provider info', path: 'CompanyInformation', verify: true},
        { label: 'Admin Information', description: 'Corporate admin', path: 'CompanyAdminInformation', verify: true},
        { label: 'Verification', description: 'Client Verification', path: 'Verification', verify: true},
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

  created() {
    if(!this.id){
      this.navItems[2].verify = false
      this.refresh()
    }
    this.$router.push({name:'CompanyInformation'})
  },
  
  methods: {
    ...mapActions({
      refresh: 'clients/refreshForm',
    }),
  },
}
</script>

<style></style>
