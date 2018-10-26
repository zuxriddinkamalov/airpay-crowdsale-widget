<template>
    <el-header class="header">
        <div class="logo" :style="{
            background: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#fff'
        }">
        </div>
        <div class="title">
            <h4>{{title}}</h4>
        </div>
    </el-header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    logo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
    $BASE_COLOR: #565656
    .header
        position: relative
        width: 100%
        padding-top: 50px
        padding-bottom: 30px
        .logo
            width: 80px
            height: 80px
            position: absolute
            overflow: hidden
            top: -40px
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%
            left: 0
            right: 0
            margin: 0 auto
            background: #FFFFFF
            box-shadow: 2px 2px 7px 0 rgba(220,220,220,0.50)
        .title
            text-align: center
            font-size: 24px
            font-weight: 600
            color: $BASE_COLOR
            &:first-letter
                text-transform: uppercase
</style>
