import Mock from 'mockjs'

export function registerMusic() {
  // 音乐列表
  Mock.mock('/api/music', 'get', function () {
    return {
      data: [
        {
          id: 1,
          name: '南方姑娘',
          cover: '',
          src: 'src/assets/music/south_lady.mp3',
          author: '赵雷',
          duration: '00:00',
          album: '赵小雷'
        },
        {
          id: 2,
          name: '亲亲',
          cover: '',
          src: 'http://lu.sycdn.kuwo.cn/9a288bef263981317634a40b798e7cf9/64dbb58f/resource/n2/65/60/1523545707.mp3',
          author: '梁静茹',
          duration: '00:00',
          album: '亲爱的'
        },
        {
          id: 3,
          name: '吉姆餐厅',
          cover: '',
          src: 'src/assets/music/jimu.mp3',
          author: '赵雷',
          duration: '00:00',
          album: '赵小雷'
        },
        {
          id: 4,
          name: '一生何求',
          cover: '',
          src: 'src/assets/music/for_what_of_left.mp3',
          author: '陈百强',
          duration: '00:00',
          album: '求'
        }
      ],
      msg: 'success',
      code: 200
    }
  })

  // 我喜欢
  Mock.mock('/api/like', 'get', function () {
    return {
      data: [
        {
          id: 1,
          name: '南方姑娘',
          cover: '',
          src: 'src/assets/music/south_lady.mp3',
          author: '赵雷',
          duration: '00:00',
          album: '赵小雷'
        },
        {
          id: 2,
          name: '亲亲',
          cover: '',
          src: 'http://lu.sycdn.kuwo.cn/9a288bef263981317634a40b798e7cf9/64dbb58f/resource/n2/65/60/1523545707.mp3',
          author: '梁静茹',
          duration: '00:00',
          album: '亲爱的'
        }
      ],
      msg: 'success',
      code: 200
    }
  })
}
