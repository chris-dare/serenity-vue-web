<template>
  <FullCalendar
    :options="calendarOptions"
    class="custom-calendar"
  />
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'Calendar',

  components: {
    FullCalendar,
  },

  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar: { start: 'prev,next', center: 'title', end: 'dayGridMonth,dayGridWeek,dayGridDay' },
        dateClick: this.handleDateClick,
        events: [
          { title: 'event 1', date: '2021-03-21' },
          { title: 'event 2', date: '2021-03-02' },
        ],
        eventClick: this.handleEventClicks,
        editable: true,
      },
    }
  },

  methods: {
    handleDateClick(arg) {
      console.log('date click! ' + arg.dateStr)
    },
    handleEventClicks(arg) {
      this.$trigger('schedule:view:open', {})
      console.log('event click', arg)
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
