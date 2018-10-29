<template>
    <div>
        <div class="success-finish"><i class="el-icon-check"></i></div>
        <h2 class="success-title">Crowdsale successfully reached hardcap</h2>
        <div class="label center finish-description">Verification proccess make take up to 24 hours and you will notify about status</div>
    </div>
</template>

<script>
export default {
  name: 'CrowdsaleReached'
}
</script>

<style lang="sass" scoped>
    .success-finish
        width: 80px
        height: 80px
        box-sizing: border-box
        font-size: 53px
        font-weight: bold
        text-align: center
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        border: 5px solid var(--primary-color)
        color: var(--primary-color)
        margin: 15px auto 35px
        padding: 10px 0
    .success-title
        font-size: 26px
        font-weight: bold
        text-align: center
        max-width: 80%
        line-height: 1.4
        margin: 0 auto
    .finish-description
        font-size: 14px
        letter-spacing: 0.5px
        line-height: 1.4
        margin: 20px auto
        max-width: 400px

</style>
