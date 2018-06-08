<template>
  <section class="container">
    <img src="../static/img/logo.png" alt="Nuxt.js Logo" class="logo" />
  </section>
</template>
<script>
export default {
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: `测试一下`
    }
  },
  beforeMount() {
    const wx = window.wx
    const url = window.location.href

    this.$store.dispatch('getWechatSignature', url).then(res => {
      if (res.data.success) {
        const params = res.data.params
        wx.config({
          debug: true, // 调试模式
          appId: params.appId, // 公众号的唯一标识
          timestamp: params.timestamp, // 生成签名的时间戳
          nonceStr: params.noncestr, // 生成签名的随机串
          signature: params.signature, // 签名
          jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'onMenuShareTimeline',
            'showMenuItems',
            'hideAllNonBaseMenuItem'
          ]
        })
        wx.ready(() => {
          setTimeout(() => {
            wx.hideAllNonBaseMenuItem()
            console.log('success')
          }, 10000)
        })
      }
    })
  }
}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
