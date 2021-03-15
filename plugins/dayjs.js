import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter("date", (value, format = "YYYY-M-DD") => {
  return dayjs(value).format(format)
})