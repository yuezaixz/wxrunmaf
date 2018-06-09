import Route from 'koa-router'
import config from '../config'
import wechartMiddle from '../wechat-lib/middleware'
import reply from '../wechat/reply'
import {
  signature,
  redirect,
  oauth
} from '../controllers/wechat'

export const router = app => {
  const router = new Route()

  router.all('/wechat-hear', wechartMiddle(config.wechat, reply))
  router.all('/wechat-signature', signature)
  router.all('/wechat-redirect', redirect)
  router.all('/wechat-oauth', oauth)

  app.use(router.routes())
  app.use(router.allowedMethods())
}
