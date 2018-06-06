export default async (ctx, next) => {
  const msg = ctx.weixin
  console.log(msg)
  ctx.body = 'Hello，欢迎使用跑动\n' +
    '点击 <a href="http://www.podoon.com"></a>'
}
