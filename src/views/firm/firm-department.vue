<template>
	<div class="bg-hd" id="modification">

		<el-row class="hd-content" style="padding-left: 120px; margin-top: 20px;">
			<el-row>
				<el-col :span="20" class="hd-tips-title">

					<br> *删除组织部门时，必须先清空该部门所有员工
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="10">
					<div class="hd-tree">
						<el-tree :data="sdata" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
						</el-tree>
					</div>

				</el-col>
				<el-col :span="10">
					<el-button type="success" round @click="dialogFormVisible = true">新增部门</el-button>
					<el-button type="success" round>新增员工 </el-button>
				</el-col>
			</el-row>
		</el-row>

		<!--新增部门弹框-->
		<el-dialog title="新增部门" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="上级" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="部门排序" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				<!--在确定的时候添加一个函数，执行添加的ajax-->
			</div>
		</el-dialog>

		<!--新增部门弹框end-->

		<!--修改部门弹框-->
		<el-dialog title="修改部门" :visible.sync="dialogFormVisible1">
			<el-form :model="form">
				<el-form-item label="上级" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<div style="margin-left: 120px;margin-bottom: 20px;">
					<p> *删除组织部门时，必须先清空该部门所有员工</p>

					<el-button type="info" plain @click='Deletedepartment'>删除部门</el-button>
				</div>

				<el-form-item label="部门排序" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
				<!--在确定的时候添加一个函数，执行添加的ajax-->
			</div>
		</el-dialog>

		<!--修改部门弹框end-->

	</div>

</template>

<script>
	import { manageDelete, orgListStructure } from '@/api/api.js';

	export default {
		data() {
			return {
				
				sdata: [],
				dialogFormVisible: false,
				dialogFormVisible1: false,
				defaultProps: {
					children: 'child',
					label: 'name',

				},
				loading2: true,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
			};
		},
		methods: {
			Deletedepartment() {
				alert('这里是删除操作')
			},
			route() {
				this.$router.go(-1)
			},

			renderContent: function(createElement, {
				node,
				data,
				store
			}) {
				var self = this;
				return createElement('span', [
					createElement('span', node.label),
					createElement('span', {
						attrs: {
							style: "float: right;margin-right: 50px; color:#6fc056"
						}
					}, [
						createElement('el-button', {
							attrs: {
								style: "background:#6fc056;color:#fff;border:none;",
								size: "mini"
							},
							on: {
								click: function() {
									self.dialogFormVisible1 = true;
								}
							}
						}, "修改部门")

					]),
				]);
			},

			//1.自定义组列表接口
			getList() {
				let res = {
					"code": "1000",
					"info": "success",
					"data": [{
							"id": "2",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "CEO",
							"level": "1",
							"child": ""
						},
						{
							"id": "153",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "你的复合肥",
							"level": "1",
							"child": ""
						},
						{
							"id": "118",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "投融资副总裁",
							"level": "1",
							"child": ""
						},
						{
							"id": "117",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "投融资总裁",
							"level": "1",
							"child": ""
						},
						{
							"id": "116",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "投融资部",
							"level": "1",
							"child": ""
						},
						{
							"id": "113",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "营销部",
							"level": "1",
							"child": [{
								"id": "114",
								"pid": "113",
								"company_id": "10000",
								"num": "0",
								"name": "营销总监",
								"level": "2",
								"child": ""
							}]
						},
						{
							"id": "107",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "培训经理",
							"level": "1",
							"child": ""
						},
						{
							"id": "106",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "人力资源部",
							"level": "1",
							"child": ""
						},
						{
							"id": "98",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "VIP顾问团",
							"level": "1",
							"child": ""
						},
						{
							"id": "33",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "销售事业部",
							"level": "1",
							"child": [{
									"id": "34",
									"pid": "33",
									"company_id": "10000",
									"num": "0",
									"name": "销售副总",
									"level": "2",
									"child": ""
								},
								{
									"id": "35",
									"pid": "33",
									"company_id": "10000",
									"num": "0",
									"name": "销售总监",
									"level": "2",
									"child": ""
								},
								{
									"id": "36",
									"pid": "33",
									"company_id": "10000",
									"num": "0",
									"name": "销售经理",
									"level": "2",
									"child": ""
								}
							]
						},
						{
							"id": "31",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "渠道招商事业部",
							"level": "1",
							"child": [{
									"id": "32",
									"pid": "31",
									"company_id": "10000",
									"num": "0",
									"name": "招商副总",
									"level": "2",
									"child": ""
								},
								{
									"id": "95",
									"pid": "31",
									"company_id": "10000",
									"num": "0",
									"name": "项目总监",
									"level": "2",
									"child": ""
								}
							]
						},
						{
							"id": "24",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "课程研发制作部",
							"level": "1",
							"child": [{
									"id": "27",
									"pid": "24",
									"company_id": "10000",
									"num": "0",
									"name": "摄像",
									"level": "2",
									"child": ""
								},
								{
									"id": "28",
									"pid": "24",
									"company_id": "10000",
									"num": "0",
									"name": "剪辑",
									"level": "2",
									"child": ""
								},
								{
									"id": "29",
									"pid": "24",
									"company_id": "10000",
									"num": "0",
									"name": "BD经理",
									"level": "2",
									"child": ""
								}
							]
						},
						{
							"id": "22",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "栏目制作部",
							"level": "1",
							"child": [{
								"id": "23",
								"pid": "22",
								"company_id": "10000",
								"num": "0",
								"name": "栏目导演",
								"level": "2",
								"child": ""
							}]
						},
						{
							"id": "19",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "品牌设计部",
							"level": "1",
							"child": [{
									"id": "20",
									"pid": "19",
									"company_id": "10000",
									"num": "0",
									"name": "UI设计总监",
									"level": "2",
									"child": ""
								},
								{
									"id": "21",
									"pid": "19",
									"company_id": "10000",
									"num": "0",
									"name": "UI设计师",
									"level": "2",
									"child": ""
								}
							]
						},
						{
							"id": "13",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "技术总监",
							"level": "1",
							"child": ""
						},
						{
							"id": "12",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "技术研发部",
							"level": "1",
							"child": [{
									"id": "14",
									"pid": "12",
									"company_id": "10000",
									"num": "0",
									"name": "Android开发工程师",
									"level": "2",
									"child": ""
								},
								{
									"id": "15",
									"pid": "12",
									"company_id": "10000",
									"num": "0",
									"name": "IOS开发工程师",
									"level": "2",
									"child": ""
								},
								{
									"id": "16",
									"pid": "12",
									"company_id": "10000",
									"num": "0",
									"name": "PHP开发工程师",
									"level": "2",
									"child": ""
								},
								{
									"id": "17",
									"pid": "12",
									"company_id": "10000",
									"num": "0",
									"name": "HTML5开发工程师",
									"level": "2",
									"child": [{
										"id": "105",
										"pid": "17",
										"company_id": "10000",
										"num": "0",
										"name": "董事长",
										"level": "3",
										"child": ""
									}]
								},
								{
									"id": "18",
									"pid": "12",
									"company_id": "10000",
									"num": "0",
									"name": "测试工程师",
									"level": "2",
									"child": ""
								},
								{
									"id": "110",
									"pid": "12",
									"company_id": "10000",
									"num": "0",
									"name": "产品",
									"level": "2",
									"child": ""
								}
							]
						},
						{
							"id": "9",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "产品部",
							"level": "1",
							"child": [{
									"id": "10",
									"pid": "9",
									"company_id": "10000",
									"num": "0",
									"name": "产品运营总监",
									"level": "2",
									"child": ""
								},
								{
									"id": "11",
									"pid": "9",
									"company_id": "10000",
									"num": "0",
									"name": "产品经理",
									"level": "2",
									"child": ""
								}
							]
						},
						{
							"id": "7",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "财务部",
							"level": "1",
							"child": [{
								"id": "8",
								"pid": "7",
								"company_id": "10000",
								"num": "0",
								"name": "出纳",
								"level": "2",
								"child": ""
							}]
						},
						{
							"id": "4",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "行政人事部",
							"level": "1",
							"child": [{
								"id": "6",
								"pid": "4",
								"company_id": "10000",
								"num": "0",
								"name": "行政经理",
								"level": "2",
								"child": ""
							}]
						},
						{
							"id": "1",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "总裁办",
							"level": "1",
							"child": [{
								"id": "115",
								"pid": "1",
								"company_id": "10000",
								"num": "0",
								"name": "人事总监",
								"level": "2",
								"child": ""
							}]
						},
						{
							"id": "108",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "运营部",
							"level": "1",
							"child": [{
								"id": "109",
								"pid": "108",
								"company_id": "10000",
								"num": "0",
								"name": "运营总监",
								"level": "2",
								"child": ""
							}]
						},
						{
							"id": "3",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "CEO助理",
							"level": "1",
							"child": [{
								"id": "5",
								"pid": "3",
								"company_id": "10000",
								"num": "0",
								"name": "人事经理",
								"level": "2",
								"child": ""
							}]
						},
						{
							"id": "26",
							"pid": "0",
							"company_id": "10000",
							"num": "0",
							"name": "编导",
							"level": "1",
							"child": [{
								"id": "25",
								"pid": "26",
								"company_id": "10000",
								"num": "0",
								"name": "副总裁",
								"level": "2",
								"child": ""
							}]
						}
					]
				}
				this.sdata = res.data;

			},
			//2.添加部门处理事件

		},
		mounted() {

			this.getList();
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import url("./three.css");
	.click {
		font-size: 16px;
		color: #6fc056;
	}
	
	#modification {
		background-color: #fff;
		text-align: left;
		.route {
			color: #6fc056;
			font-size: 16px;
		}
		.el-row {
			margin-bottom: 20px;
			&:first-child {}
		}
	}
</style>