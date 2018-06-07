import config from '../config'

const tip = 'Hello，欢迎使用跑动\n' +
  //  '回复 1，\n' +
  //  '回复 2，\n' +
  //  '回复 3，\n' +
  //  '回复 4，\n' +
  '或者点击 <a href="' + config.SITE_ROOT_URL + '/exam">了解更多</a>'

const bt = '我的博客 <a href="http://blog.davidandty.com">点击进入</a>'

export default async (ctx, next) => {
  const message = ctx.weixin
  let mp = require('../wechat')
  let client = mp.getWechat()

  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      ctx.body = tip
    } else if (message.Event === 'unsubscribe') {
      console.log('取关了')
    } else if (message.Event === 'LOCATION') {
      ctx.body = message.Latitude + ' : ' + message.Longitude
    } else if (message.Event === 'view') {
      ctx.body = message.EventKey + message.MenuId
    } else if (message.Event === 'pic_sysphoto') {
      ctx.body = message.Count + ' photos sent'
    } else if (message.Event === 'CLICK') {
      if (message.EventKey === 'bt') {
        console.log(1)
        ctx.body = bt
        console.log(2)
      }
    } else {
      ctx.body = tip
    }
    console.log(3)
  } else if (message.MsgType === 'text') {
    if (message.Content === '更新按钮吧') {
      const menu = require('./menu').default
      let menuMsg = '创建成功'

      try {
        await client.handle('delMenu')
      } catch (e) {
        console.log('删除菜单失败')
        console.log(e)

        menuMsg = '删除失败'
      }

      try {
        await client.handle('createMenu', menu)
      } catch (err) {
        console.log('创建菜单失败')
        console.log(err)
        menuMsg += menuMsg
      }

      ctx.body = menuMsg
    } else if (message.Content === 'bt' || message.Content === '3') {
      ctx.body = bt
    }
  } else if (message.MsgType === 'image') {
    ctx.body = {
      type: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      type: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title: message.Title,
      description: message.Description,
      picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/knCHmO7t1HPM65O26N6NSI2genC7WFmXXyGoXxnqyOz49FQ4jBpslrDUQqOgZZo8M6C8ibQcOQV1e8fknNticcQQ/0',
      url: message.Url
    }]
  }
}
