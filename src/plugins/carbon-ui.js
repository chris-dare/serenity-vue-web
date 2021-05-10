import Vue from 'vue'
import 'carbon-components/css/carbon-components.css'
import CarbonCharts from '@carbon/charts-vue'
// import DisableAutocomplete from 'vue-disable-autocomplete'

import { 
  CvButton,
  CvDataTable,
  CvSearch,
  CvSelect,
  CvSelectOption,
  CvModal,
  CvDataTableRow,
  CvDataTableCell,
  CvTextArea,
  CvTextInput,
  CvTag,
  CvDatePicker,
  CvTimePicker, 
  CvTab,
  CvTabs,
  CvHeader,
  CvHeaderName,
  CvCheckbox,
  CvRadioGroup,
  CvSkeletonText,
  CvRadioButton,
  CvForm,
  CvSideNav,
  CvInlineNotification,
  CvInlineLoading,
  CvButtonSkeleton,
  CvMultiSelect,
  CvNumberInput,
  CvDataTableSkeleton,
} from '@carbon/vue/src/index'

Vue.component(CvButton.name, CvButton)
Vue.component(CvDataTable.name, CvDataTable)
Vue.component(CvSearch.name, CvSearch)
Vue.component(CvSelect.name, CvSelect)
Vue.component(CvSelectOption.name, CvSelectOption)
Vue.component(CvModal.name, CvModal)
Vue.component(CvDataTableRow.name, CvDataTableRow)
Vue.component(CvDataTableCell.name, CvDataTableCell)
Vue.component(CvTextArea.name, CvTextArea)
Vue.component(CvTextInput.name, CvTextInput)
Vue.component(CvTag.name, CvTag)
Vue.component(CvDatePicker.name, CvDatePicker)
Vue.component(CvTimePicker.name, CvTimePicker)
Vue.component(CvTab.name, CvTab)
Vue.component(CvTabs.name, CvTabs)
Vue.component(CvHeaderName.name, CvHeaderName)
Vue.component(CvCheckbox.name, CvCheckbox)
Vue.component(CvRadioGroup.name, CvRadioGroup)
Vue.component(CvSkeletonText.name, CvSkeletonText)
Vue.component(CvHeader.name, CvHeader)
Vue.component(CvRadioButton.name, CvRadioButton)
Vue.component(CvForm.name, CvForm)
Vue.component(CvSideNav.name, CvSideNav)
Vue.component(CvSideNav.name, CvSideNav)
Vue.component(CvInlineNotification.name, CvInlineNotification)
Vue.component(CvInlineLoading.name, CvInlineLoading)
Vue.component(CvButtonSkeleton.name, CvButtonSkeleton)
Vue.component(CvMultiSelect.name, CvMultiSelect)
Vue.component(CvNumberInput.name, CvNumberInput)
Vue.component(CvDataTableSkeleton.name, CvDataTableSkeleton)

Vue.use(CarbonCharts)
// Vue.use(DisableAutocomplete)