import Vue from 'vue'
export default class Appointment {
  constructor(data) {
    this.data = { ...data }
  }

  getCreateView() {
    let createData = {
      appointment: '99f65066-4784-4ba1-be3d-b186634b6024',
      start_time: Vue.prototype.$date.queryNow(),
      ...this.data,
    }

    return createData
  }

  getEndView() {
    let createData = {
      ...this.data,
      status: 'finished', end_time: Vue.prototype.$date.queryNow(),
    }

    return createData
  }
}