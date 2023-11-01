import Mock from 'mockjs'

export function registerUser() {
  Mock.mock('/api/login', 'post', function (e) {
    const body = JSON.parse(e.body)
    if (body) {
      if (body.username === '1274001055' && body.password === '440233jum') {
        return {
          data: {
            token: 'asd123456'
          },
          msg: '登录成功!',
          code: 200
        }
      }
    }
    return {
      data: null,
      msg: '登录失败!',
      code: 400
    }
  })

  // 获取用户信息
  Mock.mock('/api/userinfo', 'post', function (e) {
    const body = JSON.parse(e.body)
    if (body.token) {
      return {
        data: {
          userId: '1233211234567',
          username: 'anthonyLuo',
          avatar:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F257de8c4-1239-41db-a86e-0a3ceab39a5a%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1695046859&t=8791c36192ec172691398f38821409c3',
          roles: ['member'],
          likes: [1, 2]
        },
        msg: '操作成功!',
        code: 200
      }
    }
    return {
      data: null,
      msg: '登录失败!',
      code: 400
    }
  })
}
