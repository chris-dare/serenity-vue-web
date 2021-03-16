import Vue from 'vue'

const ChevronRight = () => import('@carbon/icons-vue/es/chevron--right/32')
const CloudUpload = () => import('@carbon/icons-vue/es/cloud--upload/32')
const Add = () => import('@carbon/icons-vue/es/add/32')
const AddAlt = () => import('@carbon/icons-vue/es/add--alt/32.js')
const Trash = () => import('@carbon/icons-vue/es/trash-can/32.js')

Vue.component('ChevronRight', ChevronRight)
Vue.component('Add', Add)
Vue.component('AddAlt', AddAlt)
Vue.component('Upload', CloudUpload)
Vue.component('Trash', Trash)