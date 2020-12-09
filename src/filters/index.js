import Vue from 'vue'
import { format } from 'date-fns'

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('format', function (value) {
    if (!value) return ''
    return format(value)
})