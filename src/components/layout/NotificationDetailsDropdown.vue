<template>
  <Dropdown
    :visible.sync="visible"
    with-shadow
  >
    <div
      slot="label"
      class="w-12 flex items-center justify-center h-12 cursor-pointer"
      :class="[visible ? 'bg-serenity-primary' : '']"
      @click="visible = !visible"
    >
      <img
        src="@/assets/img/notification 2.svg"
        class="w-5 h-5"
        alt=""
      >
    </div>
    <div class="w-96 bg-white">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="flex border-b border-solid border-subtle p-4"
      >
        <div
          class="flex justify-center items-center rounded-full h-9 w-9 mr-3"
          :class="option.color"
        >
          <component
            :is="option.component"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <div class="text-xs">
            <span class="text-primary font-semibold mr-1">{{ 'Chris Dare' }}</span>
            <span class="text-secondary mr-1">added</span>
            <span class="text-serenity-primary cursor-pointer mr-1">Vitals</span>
            <span class="text-primary">{{ 'Chris Dare' }}</span>
          </div>
          <div class="flex items-center">
            <p class="text-secondary mr-4 text-xs">{{ option.time }}</p>
            <p class="text-secondary underline cursor-pointer text-xs">View details</p>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center h-12 text-xs">
        <p class="text-gray-400 font-semibold underline cursor-pointer">View all notifications</p>
      </div>
    </div>
  </Dropdown>
</template>

<script>
import PersonFavorite from '@carbon/icons-vue/es/person--favorite/32'
import DicomOverlay from '@carbon/icons-vue/es/watson-health/dicom--overlay/32'

export default {
  name: 'NotificationDetailsDropdown',

  components: { PersonFavorite, DicomOverlay },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    options() {
      return [
        { label: 'Chris Dare', component: 'PersonFavorite', color: 'bg-warning', time: '1 hour ago' },
        { label: 'Chris Dare', component: 'DicomOverlay', color: 'bg-success', time: '1 hour ago' },
      ]
    },
  },
}
</script>
