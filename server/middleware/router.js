import Route from 'koa-router'
import config from '../config'
import wechartMiddle from '../wechat-lib/middleware'
import reply from '../wechat/reply'

export const router = app => {
  const router = new Route()

  router.all('/wechat-hear', wechartMiddle(config.wechat, reply))

  app.use(router.routes())
  app.use(router.allowedMethods())
}
