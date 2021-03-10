import Vue from 'vue'

import EditableCard from '@/components/ui/cards/EditableCard'
import ToggleList from '@/components/ui/ToggleList'
import ListCard from '@/components/ui/cards/ListCard'
import FileUploadButton from '@/components/ui/FileUploadButton'
import Webcam from '@/components/ui/Webcam'
import Dropdown from '@/components/ui/Dropdown'
import DateTimePicker from '@/components/ui/DateTimePicker'
import Button from '@/components/ui/Button'
import FilterDropdown from '@/components/ui/FilterDropdown'
import InfoBlock from '@/components/ui/InfoBlock'
import Avatar from '@/components/ui/Avatar'
import SuccessModal from '@/components/ui/SuccessModal'
// icons
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import Add from '@carbon/icons-vue/es/add/32'
import CloudUpload from '@carbon/icons-vue/es/cloud--upload/32'

Vue.component('ToggleList', ToggleList)
Vue.component('EditableCard', EditableCard)
Vue.component('ListCard', ListCard)
Vue.component('FileUploadButton', FileUploadButton)
Vue.component('Webcam', Webcam)
Vue.component('Dropdown', Dropdown)
Vue.component('DateTimePicker', DateTimePicker)
Vue.component('SeButton', Button)
Vue.component('FilterDropdown', FilterDropdown)
Vue.component('InfoBlock', InfoBlock)
Vue.component('Avatar', Avatar)
Vue.component('SuccessModal', SuccessModal)

// icons
Vue.component('ChevronRight', ChevronRight)
Vue.component('Add', Add)
Vue.component('Upload', CloudUpload)
