export default {
  data() {
    return {
      date: [],
    }
  },
  methods: {
    convertFromDatePickerFormat(event) {
      let date = event.split(' to ')
      return {
        start: date[0] ? this.$date.formatQueryParamsDate(date[0]) : null,
        end: date[1] ? this.$date.formatQueryParamsDate(date[1]) : this.$date.formatQueryParamsDate(date[0]),
      }
    },
  },
}