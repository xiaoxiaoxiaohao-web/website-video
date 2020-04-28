import Vue from 'vue'
import Router from 'vue-router'
import Antd from 'ant-design-vue'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import moment from 'moment'
import 'moment/locale/zh-cn'
import echarts from 'echarts'
import { API } from '^/js/api'

import 'ant-design-vue/dist/antd.css'
import 'video.js/dist/video-js.css'

Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.prototype.$API = API
// 全局公共播放视频函数
Vue.prototype.onVideoPlayerClick = function (vID) {
  let routerUrl = this.$router.resolve({path: '/play/' + vID})
  window.open(routerUrl.href, '_blank')
}
moment.locale('zh-cn')

Vue.use(Router)
Vue.use(Antd)
Vue.use(VueResource)
Vue.use(VueCookies)

const router = new Router({
  routes: [
    // 默认首页
    {
      path: '/',
      name: 'Index',
      component: () => import('@/components/Index'),
      meta: {
        title: '视频网站'
      }
    },
    // 报错404
    {
      path: '/404',
      component: () => import('@/components/errorPage'),
      hidden: true
    },
    // 首页
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/components/Index'),
      meta: {
        title: '视频网站'
      }
    },
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Public/Login')
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/Public/Register')
    },
    // 个人中心
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/components/Personal')
    },
    // // 动态
    // {
    //   path: '/dynamic',
    //   name: 'Dynamic',
    //   component: () => import('@/components/Dynamic'),
    //   meta: {
    //     title: '动态首页'
    //   }
    // },
    // 排行榜
    {
      path: '/ranking',
      name: 'Ranking',
      component: () => import('@/components/Ranking'),
      meta: {
        title: '热门视频排行榜 '
      },
      children: [
        {
          path: '/ranking/origin',
          name: 'Origin',
          component: () => import('@/components/Ranking')
        }
      ]
    },
    // 个人空间
    {
      path: '/information',
      name: 'Information',
      component: () => import('@/components/Information'),
      children: [
        {
          path: '/',
          name: 'infoHomepage',
          component: () => import('@/components/Information/infoHomepage'),
          meta: {
            title: '个人空间'
          }
        }
      ]
    },
    // 专栏
    {
      path: '/read',
      name: 'Read',
      component: () => import('@/components/Read'),
      children: [
        {
          path: '/',
          name: 'readHome',
          component: () => import('@/components/Read/readHome'),
          meta: {
            title: '网站专栏'
          }
        },
        {
          path: '/read/cartoon',
          name: 'readCartoon',
          component: () => import('@/components/Read/readCartoon')
        },
        {
          path: '/read/game',
          name: 'readGame',
          component: () => import('@/components/Read/readGame')
        },
        {
          path: '/read/video',
          name: 'readVideo',
          component: () => import('@/components/Read/readVideo')
        },
        {
          path: '/read/life',
          name: 'readLife',
          component: () => import('@/components/Read/readLife')
        },
        {
          path: '/read/interest',
          name: 'readInterest',
          component: () => import('@/components/Read/readInterest')
        },
        {
          path: '/read/science',
          name: 'readScience',
          component: () => import('@/components/Read/readScience')
        }
      ]
    },
    // 活动
    {
      path: '/act_list',
      name: 'Activity',
      component: () => import('@/components/Activity'),
      meta: {
        title: '活动列表'
      }
    },
    // 专题
    {
      path: '/topic',
      name: 'Topic',
      component: () => import('@/components/Topic'),
      meta: {
        title: '专题列表'
      }
    },
    // 创作中心
    {
      path: '/contribute',
      name: 'Contribute',
      component: () => import('@/components/Contribute'),
      children: [
        {
          path: '/contribute',
          name: 'uploadWorks',
          component: () => import('@/components/Contribute/uploadWorks')
        },
        {
          path: '/contribute/upload',
          name: 'uploadWorks',
          component: () => import('@/components/Contribute/uploadWorks'),
          meta: {
            title: '创作中心'
          }
        },
        {
          path: '/contribute/home',
          name: 'ContibuteHome',
          component: () => import('@/components/Contribute/contibuteHome'),
          meta: {
            title: '创作中心'
          }
        },
        {
          path: '/contribute/manuscript',
          name: 'contentManagement',
          component: () => import('@/components/Contribute/contentManagement')
        },
        {
          path: '/contribute/data_core',
          name: 'dataCenter',
          component: () => import('@/components/Contribute/dataCenter')
        },
        {
          path: '/contribute/message',
          name: 'message',
          component: () => import('@/components/Contribute/messageContent')
        },
        {
          path: '/contribute/barrage',
          name: 'barrage',
          component: () => import('@/components/Contribute/barrageContent')
        },
        {
          path: '/contribute/setting',
          name: 'createSetting',
          component: () => import('@/components/Contribute/createSetting')
        },
        {
          path: '/contribute/updateVideoInfo/:vID',
          name: 'updateVideoInfo',
          component: () => import('@/components/Contribute/updateVideo')
        }
      ]
    },
    // 视频播放页面
    {
      path: '/play/:vID',
      name: 'Playpage',
      component: () => import('@/components/Playpage')
    },
    // 类型页面
    {
      path: '/typepage',
      name: 'typePage',
      component: () => import('@/components/Typepage')
    },
    // 超级管理员页面
    {
      path: '/root',
      name: 'root',
      component: () => import('@/components/Root'),
      children: [
        {
          path: '/root',
          name: 'userTable',
          component: () => import('@/components/Root/userTable'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/root/userTable',
          name: 'userTable',
          component: () => import('@/components/Root/userTable'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/root/videoData',
          name: 'videoData',
          component: () => import('@/components/Root/videoData'),
          meta: {
            title: '视频管理'
          }
        },
        {
          path: '/root/carouselPicture',
          name: 'carouselPicture',
          component: () => import('@/components/Root/carouselPicture'),
          meta: {
            title: '图片管理--轮播图'
          }
        },
        {
          path: '/root/bgPicture',
          name: 'bgPicture',
          component: () => import('@/components/Root/bgPicture'),
          meta: {
            title: '图片管理--背景图'
          }
        }
      ]
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/typePage') {
//     // to.meta.title = to.query.type
//   }
//   next()
// })
export default router
