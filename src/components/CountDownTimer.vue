<template>
    <div>
        <div class="timer-container">
            <el-progress
                :class="{'timer-time-over':!seconds&&!success}"
                :color="color"
                :width="120"
                :stroke-width="5"
                :show-text="success"
                type="circle"
                :status="success?'success':''"
                :percentage="getPercent">
            </el-progress>
            <div v-if="!success" class="timer">{{seconds | prettify}}</div>
        </div>
    </div>
</template>

<script>
import '@/plugins/vue-rx'
import { interval } from 'rxjs'
import { startWith, scan, take, map, filter } from 'rxjs/operators'

export default {
  props: {
    trigger: {
      type: Function,
      required: true
    },
    success: {
      type: Boolean,
      default: false
    },
    minute: {
      type: Number,
      required: true
    },
    color: {
      type: String
    }
  },
  data: function () {
    return {
      seconds: 0
    }
  },
  watch: {
    minute: {
      immediate: true,
      handler: function (value) {
        let seconds = value * 60
        let success = this.success
        let self = this
        this.$subscribeTo(interval(1000).pipe(
          filter(() => !success),
          take(seconds),
          startWith(seconds),
          scan(total => total - 1),
          map(val => {
            if (val === 0) {
              self.trigger()
            }
            return val
          })
        ), function (seconds) {
          self.seconds = seconds
        })
      }
    }
  },
  computed: {
    getPercent: function () {
      if (this.success) {
        return 100
      }
      if (this.minute === 0) {
        return 0
      }
      return (this.seconds / (this.minute * 60)) * 100
    }
  },
  filters: {
    prettify: function (value) {
      let minutes = parseInt(value / 60)
      let seconds = value % 60
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return minutes + ':' + seconds
    }
  },
  name: 'CountDownTimer'
}
</script>

<style lang="sass">
    .timer-container
        position: relative
        width: 120px
        height: 120px
        text-align: center
        i
            font-weight: bold
            color: var(--primary-color)
            font-size: 70px
        .timer-time-over svg > path
            stroke: #F39D18
        .timer
            position: absolute
            top: 40px
            left: 0
            color: #000
            font-weight: bold
            font-size: 26px
            right: 0
            margin: auto
</style>
