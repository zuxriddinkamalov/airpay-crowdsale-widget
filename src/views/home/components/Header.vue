<template>
    <el-header class="header">
        <div class="logo" :style="{
            background: `url(${logo || 'images/no-logo.png'})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#fff'
        }">
        </div>
        <div v-if="title" class="title">
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
      type: String
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
        padding-bottom: 50px
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
            border: 3px solid #FFFFFF
            box-shadow: 0 0 3px 1px rgba(220,220,220,0.40)
        .title
            margin-top: 14px
            text-align: center
            font-size: 24px
            font-weight: 600
            color: $BASE_COLOR
            &:first-letter
                text-transform: uppercase
</style>
