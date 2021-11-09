import Vue from 'vue'

import ChevronRight from '@carbon/icons-vue/es/chevron--right/16'
import CloudUpload from '@carbon/icons-vue/es/cloud--upload/16'
import Add from '@carbon/icons-vue/es/add/16'
import AddFilled from '@carbon/icons-vue/es/add--filled/16'
import Edit from '@carbon/icons-vue/es/edit/16'
import AddAlt from '@carbon/icons-vue/es/add--alt/16.js'
import Trash from '@carbon/icons-vue/es/trash-can/16.js'
import Close from '@carbon/icons-vue/es/close/16.js'
import CheckmarkFilled from '@carbon/icons-vue/es/checkmark--filled/16.js'
import Diagnostic from '@carbon/icons-vue/es/microscope/16.js'
import Checkmark from '@carbon/icons-vue/es/checkmark/16.js'

Vue.component('ChevronRight', ChevronRight)
Vue.component('Add', Add)
Vue.component('Edit', Edit)
Vue.component('AddAlt', AddAlt)
Vue.component('Upload', CloudUpload)
Vue.component('Trash', Trash)
Vue.component('Close', Close)
Vue.component('CheckmarkFilled', CheckmarkFilled)
Vue.component('Diagnostic', Diagnostic)
Vue.component('Checkmark', Checkmark)
Vue.component('AddFilled', AddFilled)

import PaymentTypeSelector from '../components/payment/PaymentTypeSelector'

Vue.component('PaymentTypeSelector', PaymentTypeSelector)
