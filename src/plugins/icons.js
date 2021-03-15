import Vue from 'vue'

const ChevronRight = () => import('@carbon/icons-vue/es/chevron--right/32')
const Add = () => import('@carbon/icons-vue/es/add/32')
const CloudUpload = () => import('@carbon/icons-vue/es/cloud--upload/32')

Vue.component('ChevronRight', ChevronRight)
Vue.component('Add', Add)
Vue.component('Upload', CloudUpload)