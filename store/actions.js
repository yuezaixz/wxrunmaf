import Services from './services'

export default {
  getWechatSignature({
    commit
  }, url) {
    return Services.getWechatSignature(url)
  },

  getWechatOAuth({
    commit
  }, url) {
    return Services.getWechatOAuth(url)
  }
}
