<template>
    <div>
        <div class="success-finish"><i class="el-icon-more"></i></div>
        <h2 class="success-title">Documents are being processed</h2>
        <div class="label center finish-description">Verification proccess make take up to 24 hours and you will notify about status</div>
    </div>
</template>

<script>
export default {
  name: 'WaitDocument'
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
        margin: 35px auto
        padding: 10px 0
    .success-title
        font-size: 26px
        font-weight: bold
        text-align: center
    .finish-description
        font-size: 14px
        letter-spacing: 0.5px
        line-height: 1.4
        margin: 20px auto
        max-width: 400px

</style>
