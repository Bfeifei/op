import axios from 'axios';
import qs from 'qs'

import store from '../store/store'
import * as types from '../store/types'

axios.defaults.timeout = 500000;

let api = window.apiUrl.apiPath

let header = {
	'headers': {
		'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=UTF-8'
	}
}

//let api = 'http://118.190.206.74:8888'

/*  线上*/
//let api = 'http://api.qikevip.com'

//let api = 'http://192.168.100.58'

/*  测试*/
//let api = 'http://api.security00.com'
//let api = 'http://118.190.206.74:8888'

//let api = 'http://testapi.qikevip.com'

//灰度  
//let api = 'http://grayapi.qikevip.com'

//let lectur = '/api';

//企业信息管理api
let base = api + '/operation/';
//
//192.168.100.227
//
//上传企业视频
let video = 'http://video.security00.com/upload.php';
//
//let bran = 'http://192.168.100.227/api/v1/'

//
//登陆
export const requestLogin = params => {
	return axios.post(base + 'login-login', params, header).then(res => res.data)
};
//
//企业信息管理
export const getUserList = params => {
	return axios.get(base + 'company-list', {
		params: params
	}, header).then(res => res.data)
};
//
//新增企业的所属行业下拉列表
export const getDropList = params => {
	return axios.get(base + 'company-industry', header).then(res => res.data)
};
//
//新增企业的公司规模
export const companyScale = params => {
	return axios.get(base + 'company-scale', header).then(res => res.data)
};
//
//新增企业提交
export const addUser = params => {
	return axios.post(base + 'company-add', params, header).then(res => res.data)
};
//export const addUser = params => { return axios.post('http://192.168.100.247/operation/company-add', params, header).then(res => res.data)};
//
//企业课程设定搜索
export const searchCour = params => {
	return axios.get(base + 'coursesearch-search', {
		params: params
	}, header).then(res => res.data)
};
//export const searchCour = params => { return axios.get('http://192.168.100.247/operation/coursesearch-search', { params: params }, header).then(res => res.data)};
//searchCourse?course_lists_title=人
//
//企业课程设定提交
export const createCompany = params => {
	return axios.post(base + 'companyorder-add', params, header).then(res => res.data)
};
//export const createCompany = params => { return axios.post( 'http://192.168.100.247/operation/companyorder-add', params, header).then(res => res.data)};

//
//企业课程列表
export const showCompanyList = params => {
	return axios.get(base + 'company-orderlist', {
		params: params
	}, header).then(res => res.data)
};
//
//企业购买列表
export const showCompanyCourseList = params => {
	return axios.get(base + 'companyorder-list', {
		params: params
	}, header).then(res => res.data)
};
//export const showCompanyCourseList = params => { return axios.get('http://192.168.100.247/operation/companyorder-list', { params: params }, header).then(res => res.data)};
//
//课程详情
export const showCourseInfo = params => {
	return axios.get(base + 'companyorder-show', {
		params: params
	}, header).then(res => res.data)
};
//export const showCourseInfo = params => { return axios.get('http://192.168.100.247/companyorder-show', { params: params }, header).then(res => res.data)};
//
//欢迎页点击排名
export const getclick = params => {
	return axios.get(base + 'course-hotfour', header).then(res => res.data)
};
//
//上传课程选择分类下拉列表
export const getification = params => {
	return axios.get(base + 'course-categorylist', header).then(res => res.data)
};
//
//讲师下拉列表
export const CourseAuthorlist = params => {
	return axios.get(base + 'course-authorlist', header).then(res => res.data)
};
//
//上传课程添加课程
export const uploadCour = params => {
	return axios.post(base + 'course-add', params, header).then(res => res.data)
};
//
//上传企业视频 token 不加 使用了ajax

//export const Video = params => { return axios.post( params, header).then(res => res.data)};
//
//企业视频与封面
export const CourseUpload = params => {
	return axios.post(base + 'course-edit', params, header).then(res => res.data)
};
//
//隐式调用
export const CourseJob = params => {
	return axios.get(base + 'course-job', {
		params: params
	}, header).then(res => res.data)
};
//
//企业课库
export const courseLists = params => {
	return axios.post(base + 'course-list', params, header).then(res => res.data)
};
//
//企业课库排序
export const clickSort = params => {
	return axios.get(base + 'clickSort', header).then(res => res.data)
};
//
//课程详情
export const detail = params => {
	return axios.get(base + 'course-detail', {
		params: params
	}, header).then(res => res.data)
};
//
//设置热门课程
export const courseSethot = params => {
	return axios.get(base + 'course-sethot', {
		params: params
	}, header).then(res => res.data)
};
//
//课程选集按钮
export const videoInfo = params => {
	return axios.get(base + 'course-videoshow?', {
		params: params
	}, header).then(res => res.data)
};
//
//课程选集列表
export const videoList = params => {
	return axios.get(base + 'course-videolist', {
		params: params
	}, header).then(res => res.data)
};
//
//课程编辑列表
export const courseListsdetails = params => {
	return axios.get(base + 'course-courselistsdetails', {
		params: params
	}, header).then(res => res.data)
};
//
//课程编辑提交
export const Courselistsedit = params => {
	return axios.post(base + 'course-courselistsedit', params, header).then(res => res.data)
};
//
//删除单个课程
export const del = params => {
	return axios.get(base + 'course-deleteone', {
		params: params
	}, header).then(res => res.data)
};
//
//删除全部课程
export const delAll = params => {
	return axios.get(base + 'course-deletemany', {
		params: params
	}, header).then(res => res.data)
};
//

//1单选 2多选 3判断 q_type
//企业题库
export const ExamclassList = params => {
	return axios.get(base + 'examclass-list', {
		params: params
	}, header).then(res => res.data)
};
//
//企业题库设定搜索
export const ExamclassSearch = params => {
	return axios.post(base + 'examclass-search', {
		params: params
	}, header).then(res => res.data)
};
//
//上传题库
export const ExamclassAdd = params => {
	return axios.post(base + 'examclass-add', params, header).then(res => res.data)
};

//上传题库
export const ExamclassDownfile = base + 'examclass-downfile'
//
//http://api.security00.com/operation/examclass-downfile?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly8xMTguMTkwLjIwNi43NDo4ODg4L2FwaS92MS9sb2dpbiIsImlhdCI6MTUwODIzMjEzMiwiZXhwIjoxNTEwNjUxMzMyLCJuYmYiOjE1MDgyMzIxMzIsImp0aSI6IjBuTXZVRFAxVjg5RU5UMkQifQ.MHXOdJ4dVk13Qwu3n92kp_-NajNgJytfM4KL35VdE1U
//
//预览题库
export const ExamclassPreview = params => {
	return axios.get(base + 'examclass-preview', {
		params: params
	}, header).then(res => res.data)
};
//
//删除课程题库
export const ExamclassDelete = params => {
	return axios.get(base + 'examclass-deletesubject', {
		params: params
	}, header).then(res => res.data)
};
//

//
//讲师系统列表
export const authorList = params => {
	return axios.get(base + 'author-list', {
		params: params
	}, header).then(res => res.data)
};
//
//
//讲师详情
export const authorInfo = params => {
	return axios.get(base + 'author-info', {
		params: params
	}, header).then(res => res.data)
};
//

//焦点图
export const gatherList = params => {
	return axios.get(base + 'gather-list', params, header).then(res => res.data)
};

//上传焦点图
export const gatherAdd = params => {
	return axios.post(base + 'gather-add', params, header).then(res => res.data)
};

//删除焦点图
export const gatherDel = params => {
	return axios.get(base + 'gather-del', {
		params: params
	}, header).then(res => res.data)
};

//修改焦点图
export const gatherInfo = params => {
	return axios.get(base + 'gather-info', {
		params: params
	}, header).then(res => res.data)
};

//完成修改焦点图
export const gatherEdit = params => {
	return axios.post(base + 'gather-edit', params, header).then(res => res.data)
};

//热门课程列表
export const courseHotlist = params => {
	return axios.get(base + 'course-hotlist', {
		params: params
	}, header).then(res => res.data)
};
//
//热门课程排序
export const courseSetsort = params => {
	return axios.post(base + 'course-setsort', params, header).then(res => res.data)
};
//

//消息推送
export const pushList = params => {
	return axios.get(base + 'push-list', {
		params: params
	}, header).then(res => res.data)
};

//发布消息
export const pushMsgAll = params => {
	return axios.post(base + 'push-msg-all', params, header).then(res => res.data)
};

//消息详情
export const pushDetial = params => {
	return axios.get(base + 'push-detial', {
		params: params
	}, header).then(res => res.data)
};
//

//城市合伙人列表
export const enterCitylist = params => {
	return axios.get(base + 'enter-citylist', {
		params: params
	}, header).then(res => res.data)
};

//城市合伙人详情
export const enterCitydetails = params => {
	return axios.get(base + 'enter-citydetails', {
		params: params
	}, header).then(res => res.data)
};

//讲师列表
export const enterTeacherlist = params => {
	return axios.get(base + 'enter-teacherlist', {
		params: params
	}, header).then(res => res.data)
};

//讲师详情
export const enterTeacherdetails = params => {
	return axios.get(base + 'enter-teacherdetails', {
		params: params
	}, header).then(res => res.data)
};

//企业列表
export const enterCompanylist = params => {
	return axios.get(base + 'enter-companylist', {
		params: params
	}, header).then(res => res.data)
};

//企业详情
export const enterCompanydetails = params => {
	return axios.get(base + 'enter-companydetails', {
		params: params
	}, header).then(res => res.data)
};

//发布新闻
export const officialWritenews = params => {
	return axios.post(base + 'official-writenews', params, header).then(res => res.data)
};
//上传封面
export const officialCover = base + 'official-writenews'

//新闻列表
export const officialNewslist = params => {
	return axios.get(base + 'official-newslist', {
		params: params
	}, header).then(res => res.data)
};

//新闻详情
export const officialContent = params => {
	return axios.get(base + 'official-content', {
		params: params
	}, header).then(res => res.data)
};

//新闻编辑
export const officialNewsedit = params => {
	return axios.post(base + 'official-newsedit', params, header).then(res => res.data)
};

//新闻删除
export const officialDel = params => {
	return axios.get(base + 'official-del', {
		params: params
	}, header).then(res => res.data)
};

//获取图片链接
export const officialUploadimg = params => {
	return axios.post(base + 'official-uploadimg', params, header).then(res => res.data)
};

//任务列表
export const taskCompanyLists = params => {
	return axios.post(base + 'task-company-lists', params, header).then(res => res.data)
};

//任务详情
export const taskInfo = params => {
	return axios.post(base + 'task-info', params, header).then(res => res.data)
};

//任务员工列表
export const taskUsersList = params => {
	return axios.post(base + 'task-users-list', params, header).then(res => res.data)
};

//任务员工删除
export const taskDelete = params => {
	return axios.post(base + 'task-delete', params, header).then(res => res.data)
};

//人员删除
export const taskDeleteUser = params => {
	return axios.post(base + 'task-delete-user', params, header).then(res => res.data)
};

//直播操作日志
export const liveLogLists = params => {
	return axios.post(base + 'live-log-lists', params, header).then(res => res.data)
};

//操作日志信息
export const liveLogInfo = params => {
	return axios.post(base + 'live-log-info', params, header).then(res => res.data)
};

//图片上传
export const uploadImages = params => {
	return axios.post(base + 'upload-images', params, header).then(res => res.data)
};

//修改日志
export const liveLogEdit = params => {
	return axios.post(base + 'live-log-edit', params, header).then(res => res.data)
};

//正在直播接口
export const liveLists = params => {
	return axios.post(base + 'live-lists', params, header).then(res => res.data)
};

//直播详情
export const liveInfo = params => {
	return axios.post(base + 'live-info', params, header).then(res => res.data)
};

//封禁列表
export const liveProhibitionLists = params => {
	return axios.post(base + 'live-prohibition-lists', params, header).then(res => res.data)
};

//解封员工
export const liveRelieve = params => {
	return axios.post(base + 'live-relieve', params, header).then(res => res.data)
};

//关闭直播
export const liveClose = params => {
	return axios.post(base + 'live-close', params, header).then(res => res.data)
};

//封禁员工
export const liveProhibition = params => {
	return axios.post(base + 'live-prohibition', params, header).then(res => res.data)
};

//直播删除
export const liveDelete = params => {
	return axios.post(base + 'live-delete', params, header).then(res => res.data)
};

//企业信息接口
export const liveCompanyInfo = params => {
	return axios.post(base + 'live-company-info', params, header).then(res => res.data)
};

//添加公司时长
export const liveCompanyEdit = params => {
	return axios.post(base + 'live-company-edit', params, header).then(res => res.data)
};

//修改记录
export const liveCompanyTimeLog = params => {
	return axios.post(base + 'live-company-time-log', params, header).then(res => res.data)
};

//企业信息列表
export const companyAllLists = params => {
	return axios.post(base + 'company-all-lists', params, header).then(res => res.data)
};

//修改讲师详情
export const authorSave = params => {
	return axios.post(base + 'author-save', params, header).then(res => res.data)
};

//企业信息修改
export const companyInfoEdit = params => {
	return axios.post(base + 'company-info-edit', params, header).then(res => res.data)
};

//公司帐号使用期限
export const companyUseTime = params => {
	return axios.post(base + 'company-use-time', params, header).then(res => res.data)
};

//公司停用接口
export const companyUse = params => {
	return axios.post(base + 'company-use', params, header).then(res => res.data)
};

//回放视频删除
export const liveVideoDelete = params => {
	return axios.post(base + 'live-video-delete', params, header).then(res => res.data)
};

//查询员工管理信息
export const userShow = params => {
	return axios.post(base + 'user-show', params, header).then(res => res.data)
};

//员工详情
export const userLook = params => {
	return axios.post(base + 'user-look', params, header).then(res => res.data)
};

//企业员工打卡信息
export const cardShowclock = params => {
	return axios.post(base + 'card-showclock', params, header).then(res => res.data)
};

//组织架构
export const orgListStructure = params => {
	return axios.post(base + 'org-list-structure', params, header).then(res => res.data)
};

//修改员工
export const userSave = params => {
	return axios.post(base + 'user-save', params, header).then(res => res.data)
};

//打卡详情
export const cardDesclock = params => {
	return axios.post(base + 'card-desclock', params, header).then(res => res.data)
};