<template>
    <div class="timer-counter-container">
        <div class="timer">
            <div class="number bold">{{ counter.days }}</div>
            <span class="time-meter uppercase">Days</span>
        </div>
        <div class="timer">
            <div class="number bold">{{ counter.hours }}</div>
            <span class="time-meter uppercase">Hours</span>
        </div>
        <div class="timer">
            <div class="number bold">{{ counter.minutes | prettify }}</div>
            <span class="time-meter uppercase">Minutes</span>
        </div>
        <div class="timer">
            <div class="number bold">{{ counter.seconds | prettify }}</div>
            <span class="time-meter uppercase">Seconds</span>
        </div>
    </div>
</template>

<script>
import '@/plugins/vue-rx'
import { interval } from 'rxjs'
import { startWith, scan, take, map } from 'rxjs/operators'

export default {
  name: 'CountDownDate',
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  subscriptions () {
    let now = new Date().getTime()
    let distanceTime = this.date.getTime() - now
    return {
      counter: interval(1000).pipe(
        take(distanceTime),
        startWith(distanceTime),
        scan((distance, change) => {
          return distance - 1000
        }),
        map(distance => {
          let days = Math.floor(distance / (1000 * 60 * 60 * 24))
          let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          let seconds = Math.floor((distance % (1000 * 60)) / 1000)
          return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          }
        })
      )
    }
  },
  filters: {
    prettify: function (value) {
      if (value < 10) {
        value = '0' + value
      }
      return value
    }
  }
}
</script>

<style lang="sass" scoped>
    .timer-counter-container
        display: flex
        justify-content: space-between
        .timer
            line-height: 2
            .number
                font-size: 45px
                line-height: 1
            .time-meter
                font-size: 15px
                letter-spacing: 0.8px
                line-height: 1
</style>
