import type { RouteRecordRawPlus } from '../types'

import Layout from '@renderer/layout/Layout.vue'
import Recommend from '@renderer/views/recommend/Recommend.vue'
import Recent from '@renderer/views/recent/Recent.vue'
import Download from '@renderer/views/download/Download.vue'
import Local from '@renderer/views/local/Local.vue'
import Like from '@renderer/views/like/Like.vue'

export const constantRoutes: RouteRecordRawPlus[] = [
  {
    path: '/',
    redirect: '/mine/recent',
    name: 'root',
    meta: { title: '主页', icon: '', roles: [] }
  },
  {
    path: '/online',
    component: Layout,
    redirect: '/online/recommend',
    name: 'online',
    meta: { title: '在线音乐', icon: '', roles: [], isMenu: true },
    children: [
      {
        path: '/online/recommend',
        name: 'recommend',
        component: Recommend,
        meta: { title: '推荐', icon: 'i-solar:hand-stars-linear', roles: [] }
      }
    ]
  },
  {
    path: '/mine',
    component: Layout,
    redirect: '/mine/recent',
    name: 'mine',
    meta: { title: '我的音乐', icon: '', roles: [], isMenu: true },
    children: [
      {
        path: '/mine/recent',
        name: 'recent',
        component: Recent,
        meta: { title: '最近播放', icon: 'i-solar:clock-square-linear', roles: [] }
      },
      {
        path: '/mine/download',
        name: 'download',
        component: Download,
        meta: { title: '下载音乐', icon: 'i-solar:download-square-linear', roles: [] }
      },
      {
        path: '/mine/local',
        name: 'local',
        component: Local,
        meta: { title: '本地歌曲', icon: 'i-solar:music-library-2-linear', roles: [] }
      },
      {
        path: '/mine/like',
        name: 'like',
        component: Like,
        meta: { title: '我喜欢', icon: 'i-solar:heart-angle-linear', roles: ['member'] }
      }
    ]
  }
]
