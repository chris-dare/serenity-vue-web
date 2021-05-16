import Vue from 'vue'

const ChevronRight = () => import('@carbon/icons-vue/es/chevron--right/32')
const CloudUpload = () => import('@carbon/icons-vue/es/cloud--upload/32')
const Add = () => import('@carbon/icons-vue/es/add/32')
const Edit = () => import('@carbon/icons-vue/es/edit/32')
const AddAlt = () => import('@carbon/icons-vue/es/add--alt/32.js')
const Trash = () => import('@carbon/icons-vue/es/trash-can/32.js')
const CheckmarkFilled = () => import('@carbon/icons-vue/es/checkmark--filled/32.js')
const Diagnostic = () => import('@carbon/icons-vue/es/microscope/32.js')
const Checkmark = () => import('@carbon/icons-vue/es/checkmark/32.js')

Vue.component('ChevronRight', ChevronRight)
Vue.component('Add', Add)
Vue.component('Edit', Edit)
Vue.component('AddAlt', AddAlt)
Vue.component('Upload', CloudUpload)
Vue.component('Trash', Trash)
Vue.component('CheckmarkFilled', CheckmarkFilled)
Vue.component('Diagnostic', Diagnostic)
Vue.component('Checkmark', Checkmark)