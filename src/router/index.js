import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'

/* 登录页*/
const Login = resolve => require(['@/components/login.vue'], resolve)

/* 404错误页面*/
const NotFoundComponent = resolve => require(['@/components/notfoundcomponent.vue'], resolve)

/* Publice*/
const Publice = resolve => require(['@/components/common/Publice'], resolve)

/* homepage*/
const Page = resolve => require(['@/components/page'], resolve)

/* 企业信息管理*/
const ManageSystem = resolve => require(['@/views/manage/manage-system.vue'], resolve)

/* 新增企业*/
const ManageNew = resolve => require(['@/views/manage/manage-new'], resolve)

/* 企业课程设定*/
const ManageSet = resolve => require(['@/views/manage/manage-setting'], resolve)

/* 企业课程列表*/
const ManageList = resolve => require(['@/views/manage/manage-list'], resolve)

/* 企业购买列表*/
const ManageBuy = resolve => require(['@/views/manage/manage-buy'], resolve)

/* 企业购买列表详情*/
const ManageDetails = resolve => require(['@/views/manage/manage-details'], resolve)

/* 企业课库*/
const CurrEnter = resolve => require(['@/views/curr/curr-enter'], resolve)

/* 企业课程详情*/
const CurrDetails = resolve => require(['@/views/curr/curr-details'], resolve)

/* 企业课程详情编辑*/
const CurrEdit = resolve => require(['@/views/curr/curr-edit'], resolve)

/* 上传视频*/
const CurrVideoup = resolve => require(['@/views/curr/curr-videoup'], resolve)

/* 上传企业视频*/
const CurrEnterup = resolve => require(['@/views/curr/curr-enterup'], resolve)

/* 个人购买记录*/
const CurrRecord = resolve => require(['@/views/curr/curr-record'], resolve)

/* 购买详情*/
const CurrPurchase = resolve => require(['@/views/curr/curr-purchase'], resolve)

/* 分类管理*/
const CurrManagement = resolve => require(['@/views/curr/curr-management'], resolve)

/* 讲师系统*/
const LecturSystem = resolve => require(['@/views/lectur/lectur-system'], resolve)

/* 讲师详情*/
const LecturDetails = resolve => require(['@/views/lectur/lectur-details'], resolve)

/* 讲师课程详情*/
const LecturListdet = resolve => require(['@/views/lectur/lectur-listdet'], resolve)

/* 企业题库*/
const TestbankQuest = resolve => require(['@/views/testbank/testbank-quest'], resolve)

/* 题库预览*/
const TestbankPreview = resolve => require(['@/views/testbank/testbank-preview'], resolve)

/* 上传题库*/
const TestbankUp = resolve => require(['@/views/testbank/testbank-upload'], resolve)

/* 焦点位*/
const FocalPosition = resolve => require(['@/views/focal/focal-position'], resolve)

/* 焦点图上传*/
const FocalUpmap = resolve => require(['@/views/focal/focal-upmap'], resolve)

/* 焦点图修改*/
const FocalModify = resolve => require(['@/views/focal/focal-modify'], resolve)

/* 热门课程*/
const PopularCour = resolve => require(['@/views/popular/popular-courses'], resolve)

/* 热门课程-课程详情*/
//const PopularDetails = resolve => require(['@/views/popular/popular-details'], resolve)

/* 企业课程详情*/
const PopularDetails = resolve => require(['@/views/curr/curr-details'], resolve)

/* 企业课程详情编辑*/
const PopularEdit = resolve => require(['@/views/curr/curr-edit'], resolve)

/* 消息推送*/
const MessageList = resolve => require(['@/views/message/message-list'], resolve)

/* 消息推送-发布消息*/
const MessageNews = resolve => require(['@/views/message/message-news'], resolve)

/* 消息推送-消息详情*/
const MessageDetails = resolve => require(['@/views/message/message-details'], resolve)

/* 城市合伙人列表*/
const PartnerList = resolve => require(['@/views/partner/partner-apply'], resolve)

/* 新增城市合伙人*/
const PartnerAdd = resolve => require(['@/views/partner/partner-add'], resolve)

/* 城市合伙人申请详情*/
const PartnerDefails = resolve => require(['@/views/partner/partner-defails'], resolve)

/* 讲师列表*/
const LecturApply = resolve => require(['@/views/lectur/lectur-apply'], resolve)

/* 讲师申请详情*/
const LecturDefails = resolve => require(['@/views/partner/partner-defails'], resolve)

/* 企业列表*/
const ManageApply = resolve => require(['@/views/manage/manage-apply'], resolve)

/* 企业申请详情*/
const ManageDefails = resolve => require(['@/views/partner/partner-defails'], resolve)

/* 新闻列表*/
const NewsList = resolve => require(['@/views/news/news-list'], resolve)

/* 新闻详情*/
const NewsDetails = resolve => require(['@/views/news/news-details'], resolve)

/* 新闻编辑*/
const Newseditor = resolve => require(['@/views/news/news-editor'], resolve)

/* 新闻发布*/
const NewsRelease = resolve => require(['@/views/news/news-release'], resolve)

/* 新闻发布*/
const NewsDrafts = resolve => require(['@/views/news/news-drafts'], resolve)

import LiveList from '@/views/live/live-list'
import All from '@/views/live/all'
import Now from '@/views/live/now'
//直播
import liveDetails from '@/views/live/live-details'
import liveParticulars from '@/views/live/live-particulars'
import liveLog from '@/views/live/live-log'
import liveLogDetails from '@/views/live/live-LogDetails'
import Banned from '@/views/live/banned'

//企业管理
import firmOrganization from '@/views/firm/firm-organization'
import firmRegulate from '@/views/firm/firm-regulate'
import firmMessage from '@/views/firm/firm-message'

//任务管理
import taskManagement from '@/views/task/task-management'
import taskParticulars from '@/views/task/task-particulars'
import taskWork from '@/views/task/task-work'
import taskInformation from '@/views/task/task-information'

//用户管理

import userMent from '@/views/user/user-ment'
import userMessage from '@/views/user/user-message'


//打卡管理
import punchRegulate from '@/views/punch/punch-regulate'
import punchDetails from '@/views/punch/punch-details'




Vue.use(VueRouter)


const router = new VueRouter({
	mode: 'history',
	saveScrollPosition: true, //记住页面的滚动位置 html5模式适用
	linkActiveClass: 'active-menu',
	routes: [{
			path: '/',
			name: 'Login',
			component: Login,
			meta: {
				title: '登录页'
			},
		},
		{
			path: '/publice/',
			name: 'publice',
			meta: {
				title: '企课网',
				requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
			},
			component: Publice,
			children: [{
					path: 'page',
					name: '企课网运营后台',
					meta: {
						title: '企课网运营后台',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: Page
				},

				{
					path: 'manage-system',
					name: '后台系统',
					meta: {
						title: '企业信息管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageSystem
				},
				{
					path: 'manage-new',
					name: '新增企业',
					meta: {
						title: '新增企业',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageNew
				},
				{
					path: 'manage-set',
					name: '企业课程设定',
					meta: {
						title: '企业课程设定',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageSet
				},
				{
					path: 'manage-list',
					name: '企业课程列表',
					meta: {
						title: '企业课程列表',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageList
				},
				{
					path: 'manage-list/:id',
					name: '企业购买列表',
					meta: {
						title: '企业购买列表',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageBuy
				},
				{
					path: 'manage-list/:id/:orderID',
					name: '企业购买课程详情',
					meta: {
						title: '企业购买详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageDetails
				},
				{
					path: 'curr-enter',
					name: '企业课库',
					meta: {
						title: '企业课库',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrEnter
				},
				{
					path: 'curr-enter/curr-details',
					name: '企业课程详情',
					meta: {
						title: '企业课库详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrDetails
				},
				{
					path: 'curr-enter/curr-details/edit',
					name: '企业课程编辑',
					meta: {
						title: '企业课程编辑',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrEdit
				},
				{
					path: 'curr-videoup',
					name: '上传视频',
					meta: {
						title: '上传视频',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrVideoup
				},
				{
					path: 'curr-enterup',
					name: '上传企业视频',
					meta: {
						title: '上传企业视频',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrEnterup
				},
				{
					path: 'curr-record',
					name: '个人购买记录',
					meta: {
						title: '个人购买记录',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrRecord
				},
				{
					path: 'curr-record/:id',
					name: '购买详情',
					meta: {
						title: '购买详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrPurchase
				},
				{
					path: 'curr-management',
					name: '分类管理',
					meta: {
						title: '分类管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: CurrManagement
				},
				{
					path: 'testbank-quest',
					name: '企业题库',
					meta: {
						title: '企业题库',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: TestbankQuest
				},
				{
					path: 'testbank-quest/:id',
					name: '题库预览',
					meta: {
						title: '题库预览',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: TestbankPreview
				},
				{
					path: 'testbank-upload',
					name: '上传题库',
					meta: {
						title: '上传题库',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: TestbankUp
				},
				{
					path: 'lectur-system',
					name: '讲师系统',
					meta: {
						title: '讲师系统',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: LecturSystem
				},
				{
					path: 'lectur-system/:id',
					name: '讲师详情',
					meta: {
						title: '讲师详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: LecturDetails
				},
				//    	{
				//        path: 'lectur-system/:id/:orderID',
				//        name: '讲师的课程详情',
				//        meta: {
				//        	title: '讲师课程详情',
				//          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
				//    		},
				//        component: LecturListdet
				//	      },
				{
					path: 'focal-position',
					name: '焦点位',
					meta: {
						title: '焦点位',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: FocalPosition
				},
				{
					path: 'focal-position/upmap',
					name: '上传焦点图',
					meta: {
						title: '焦点图上传',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: FocalUpmap
				},
				{
					path: 'focal-position/modify',
					name: '焦点图修改',
					meta: {
						title: '焦点图修改',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: FocalModify
				},
				{
					path: 'popular-cour',
					name: '热门课程',
					meta: {
						title: '热门课程',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: PopularCour
				},
				//    	{
				//		  path: 'popular-cour/:id',
				//	  	  name: '热门课程详情',
				//	  	  meta: {
				//	  	  	title: '热门课程详情',
				//      	requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
				//		  },
				//		  component: PopularDetails
				//	  	},
				{
					path: 'popular-cour/popular-details',
					name: '热门课程详情',
					meta: {
						title: '热门课程详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: PopularDetails
				},
				{
					path: 'popular-cour/popular-details/edit',
					name: '热门课程编辑',
					meta: {
						title: '热门课程编辑',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: PopularEdit
				},
				{
					path: 'message-list',
					name: '消息推送',
					meta: {
						title: '消息推送',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: MessageList
				},
				{
					path: 'message-list/message-news',
					name: '发布消息',
					meta: {
						title: '发布消息',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: MessageNews
				},
				{
					path: 'message-list/message-details',
					name: '消息详情',
					meta: {
						title: '消息详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: MessageDetails
				},
				{
					path: 'partner-list',
					name: '城市合伙人',
					meta: {
						title: '城市合伙人',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: PartnerList
				},
				{
					path: 'partner-list/partner-details',
					name: '城市合伙人申请详情',
					meta: {
						title: '城市合伙人申请详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: PartnerDefails
				},
				//	  	{
				//		  path: 'partner-list/partner-add',
				//	  	  name: '添加城市合伙人',
				//	  	  meta: {
				//	  	  	title: '添加城市合伙人',
				//      	requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
				//		  },
				//		  component: PartnerAdd
				//	  	},
				//	  	{
				//		  path: 'partner-apply',
				//	  	  name: '城市合伙人申请列表',
				//	  	  meta: {
				//	  	  	title: '城市合伙人申请列表',
				//      	requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
				//		  },
				//		  component: PartnerApply
				//	  	},
				{
					path: 'lectur-apply',
					name: '讲师管理',
					meta: {
						title: '讲师管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: LecturApply
				},
				{
					path: 'lectur-apply/lectur-details',
					name: '讲师申请详情',
					meta: {
						title: '讲师申请详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: LecturDefails
				},
				{
					path: 'manage-apply',
					name: '企业管理',
					meta: {
						title: '企业管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageApply
				},
				{
					path: 'manage-apply/manage-details',
					name: '企业申请详情',
					meta: {
						title: '企业申请详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: ManageDefails
				},
				{
					path: 'news-list',
					name: '企课新闻',
					meta: {
						title: '企课新闻',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: NewsList
				},
				{
					path: 'news-list/news-details',
					name: '企课新闻详情',
					meta: {
						title: '企课新闻详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: NewsDetails
				},
				{
					path: 'news-list/news-editor',
					name: '企课新闻编辑',
					meta: {
						title: '企课新闻编辑',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: Newseditor
				},
				{
					path: 'news-list/news-release',
					name: '企课新闻发布',
					meta: {
						title: '企课新闻发布',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: NewsRelease
				},
				{
					path: 'news-list/news-drafts',
					name: '企课新闻草稿箱',
					meta: {
						title: '企课新闻草稿箱',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: NewsDrafts
				},

//				{
//					path: 'now',
//					name: '正在直播',
//					meta: {
//						title: '正在直播',
//						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
//					},
//					component: Now,

//					children: [{
//							path: 'All',
//							name: '全部列表',
//
//							meta: {
//								title: '全部列表',
//								requireAuth: true
//							},
//							component: All
//						},
//
//						{
//							path: 'Now',
//							name: '正在直播',
//							meta: {
//								title: '正在直播',
//								requireAuth: true
//							},
//							component: Now
//						},
//						{
//							path: '/',
//							name: '正在直播',
//
//							meta: {
//								title: '正在直播',
//								requireAuth: true
//							},
//							component: Now
//						}
//					]
//				},
				{
					path: 'live-list',
					name: '直播',
					meta: {
						title: '直播',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: LiveList,
				},
				{
					path: 'live-list/now',
					name: '正在直播',
					meta: {
						title: '正在直播',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: Now,
				},
				{
					path: 'live-list/all',
					name: '全部直播',
					meta: {
						title: '全部直播',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: All,
				},
				{
					path: 'live-list/all/banned',
					name: '封禁列表',
					meta: {
						title: '封禁列表',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: Banned,
				},
				{
					path: 'live-list/now/:id',
					name: '企业信息',
					meta: {
						title: '企业信息',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: taskInformation
				},
				
				{
					path: 'live-list/all/:id',
					name: '直播详情',
					meta: {
						title: '直播详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: liveDetails,
				},
				
				{
					path: 'live-list/:id',
					name: '关闭详情',
					meta: {
						title: '关闭详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: liveParticulars,
				},
				{
					path: 'live-log',
					name: '日志操作',
					meta: {
						title: '日志操作',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: liveLog
				},
				{
					path: 'live-log/:id',
					name: '日志详情',
					meta: {
						title: '日志详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: liveLogDetails,
				},
				
				
				
				
				
				
				

				//				企业管理

				{
					path: 'firm-organization',
					name: '企业管理',
					meta: {
						title: '企业管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: firmOrganization,
				},
				//组织架构
				{
					path: 'firm-regulate',
					name: '组织架构',
					meta: {
						title: '组织架构',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: firmRegulate,
				},
				//公司信息
				{
					path: 'firm-organization/:id',
					name: '公司信息',
					meta: {
						title: '公司信息',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: firmMessage,
				},

				//				任务管理

				{
					path: 'task-management',
					name: '任务管理',
					meta: {
						title: '任务管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: taskManagement,
				},
				{
					path: 'task-management/:id',
					name: '学习详情',
					meta: {
						title: '学习详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: taskParticulars,
				},
				{
					path: 'task-management/:id',
					name: '工作详情',
					meta: {
						title: '工作详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: taskWork
				},
				
				
				//用户管理
				{
					path: 'user-ment',
					name: '用户管理',
					meta: {
						title: '用户管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: userMent
				},
				{
					path: 'user-ment/:id',
					name: '员工信息',
					meta: {
						title: '员工信息',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: userMessage
				},
				
				
				//打卡管理
				{
					path: 'punch-regulate',
					name: '打卡管理',
					meta: {
						title: '打卡管理',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: punchRegulate
				},
				{
					path: 'punch-regulate/:id',
					name: '打卡详情',
					meta: {
						title: '打卡详情',
						requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
					},
					component: punchDetails
				},
				
				
			]
		},
		{
			path: '*',
			component: NotFoundComponent,
			meta: {
				title: '404错误页'
			}
		}
	]
})

export default router;