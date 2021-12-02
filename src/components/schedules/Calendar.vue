<template>
  <div class="relative">
    <FullCalendar
      :options="calendarOptions"
      class="custom-calendar"
    />
    <Loading v-if="loading" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { mapGetters } from 'vuex'

export default {
  name: 'Calendar',

  components: {
    FullCalendar,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: { start: 'prev,next', center: 'title', end: 'dayGridMonth,dayGridWeek,dayGridDay' },
        dateClick: this.handleDateClick,
        events: [
          { title: 'event 1', date: '2021-05-21' },
          { title: 'event 2', date: '2021-05-02' },
        ],
        eventClick: this.handleEventClicks,
        editable: true,
      },
    }
  },

  computed: {
    ...mapGetters({
      schedules: 'schedules/schedules',
    }),
  },

  watch: {
    schedules: {
      immediate: true,
      handler(val) {
        if (val) {
          this.calendarOptions.events = val
        }
      },

    },
  },

  methods: {
    handleDateClick(arg) {
      console.log('date click! ' + arg.dateStr)
    },
    handleEventClicks(arg) {
      this.$trigger('schedule:view:open', this.schedules.find(sch => sch?.id?.toString() === arg.event.id))
    },
  },
}
</script>

<style lang="scss">
.custom-calendar{
  .fc-header-toolbar {
    background-color: #eaebec;
    @apply px-4 py-2
  }

  .fc-toolbar-title{
    @apply text-base
  }

  .fc-button{
    @apply bg-white rounded-none text-dark border-0 hover:bg-white hover:text-dark capitalize;
  }

  .fc-event-title-container{
    @apply bg-serenity-primary
  }

  .fc-button-active{
    color: white !important;
    background-color: #0B6B74 !important;
    &:hover{
      background-color: #0B6B74 !important;
      color: white !important;
    }
  }

  .fc-prev-button, .fc-next-button  {
    @apply bg-transparent border-0 text-dark p-0 text-lg hover:bg-transparent;
  }
}
</style>
