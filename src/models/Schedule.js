import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
export default class Schedule {
  constructor(data) {
    this.data = { ...data }
  }

  getNormalizedView() {
    return {
      ...this.data,
      title: `${this.data.practitioner_title || ''} ${this.data.practitioner_firstname} ${this.data.practitioner_lastname}`,
      start: this.data.start_time,
      end: this.data.end_time,
      fullDate: format(parseISO(this.data.start_time), 'yyyy-MM-dd'),
      day: format(parseISO(this.data.start_time), 'E').toLowerCase(),
      timeRange: `${format(parseISO(this.data.start_time), 'HH:mm a')} - ${format(parseISO(this.data.end_time), 'hh:mm a')}`,
      start_time: format(parseISO(this.data.start_time), 'HH:mm:ss'),
      end_time: format(parseISO(this.data.end_time), 'HH:mm:ss'),
    }
  }

  getCreateView() {
    let createData = { }

    createData.comment = this.data.comment || ''
    createData.healthcare_service_id = this.data.health_service.id
    createData.location_id = this.data.location ? this.data.location.id : null

    createData.recurring_weeks = this.data.recurring_weeks ? this.data.recurring_weeks : 1

    let planning_horizon = []

    this.data.days.forEach(day => {
      planning_horizon.push({
        start: this.getDayFromDate(day, this.data.start_time),
        end: this.getDayFromDate(day, this.data.end_time),
      })
    })
    

    createData.planning_horizon = planning_horizon

    return createData
  }

  getUpdateView() {
    let updateData = { }

    updateData.comment = this.data.comment || ''
    updateData.healthcare_service_id = this.data.health_service.id
    updateData.location_id = this.data.location ? this.data.location.id : null

    updateData.recurring_weeks = this.data.recurring_weeks ? this.data.recurring_weeks : 1

    updateData.startDateTime = this.getDayFromDate(this.data.day, this.data.start_time)
    updateData.endDateTime = this.getDayFromDate(this.data.day, this.data.end_time)

    return updateData
  }

  getNormalizedUpdateView() {
    return {
      ...this.data,
      start_time: this.data.startDateTime,
      end_time: this.data.endDateTime,
    }
  }

  getDayFromDate(day, time) {
    var dayOfWeek = this.getDayIndex(day)
    var date = new Date()
    date = new Date(`${format(date, 'MM dd, yyyy')} ${time}`)
    date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7)
    return this.formatDate(date)
  }

  formatDate(date) {
    return `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH:mm:ss')}Z`
  }

  getDayIndex(date) {
    let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

    return days.indexOf(date)
  }
}