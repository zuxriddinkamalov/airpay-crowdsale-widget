<template>
    <div>
        <div class="success-finish"><i class="el-icon-check"></i></div>
        <h2 class="success-title">Wait confirmation</h2>
        <div class="label center finish-description">Verification proccess make take up to 24 hours and you will notify about status</div>
        <!--<el-row :gutter="15">
            <el-col :xs="24" :sm="12">
                <span class="label uppercase">Share with friends, to make our token popular:</span>
            </el-col>
            <el-col :xs="24" :sm="12">
                <ul class="share">
                    <li class="facebook">
                        <a href="#"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                    </li>
                    <li class="twitter">
                        <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    </li>
                    <li class="telegram">
                        <a href="#"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>
                    </li>
                </ul>
            </el-col>
        </el-row>-->
    </div>
</template>

<script>
export default {
  name: 'Finish'
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
        border: 5px solid #377DFE
        color: #377DFE
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
    .share
        text-align: right
        li
            display: inline
            a
                padding: 10px
                i
                    vertical-align: middle
                    font-size: 40px!important
        .facebook a
            color: #7A92CE
            &:hover
                color: darken(#7A92CE, 10%)
        .twitter a
            color: #7EDFFF
            &:hover
                color: darken(#7EDFFF, 10%)
        .telegram a
            color: #71D6FF
            &:hover
                color: darken(#71D6FF, 10%)
            i
                font-size: 30px!important

</style>
