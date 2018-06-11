<template>
	<div>
		<div class="bg-nav">
			<el-row :gutter="20">
				<el-col :span="24">
					<div class="grid-content bg-color">
						<el-button type="text" @click="route" style="font-size: 16px;">任务管理</el-button>
						<i class="el-icon-arrow-right"></i>
						<span>任务详情</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<el-row>
			<div class="information-table">
				<h3>员工信息</h3>
				<div class="bg-table">
					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">企业id</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light">{{table.company_id}}</div>
						</el-col>
						<el-col class="title">
							<div class="grid-content bg-purple">企业名称</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
					</el-row>

					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">员工姓名</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
						<el-col class="title">
							<div class="grid-content bg-purple">员工手机</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
					</el-row>

					<el-row class="t-tile">
						<el-col class="title">
							<div class="grid-content bg-purple">员工职位</div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
						<el-col class="title">
							<div class="grid-content bg-purple"></div>
						</el-col>
						<el-col class="text">
							<div class="grid-content bg-purple-light"></div>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-row>
		<el-row>
			<div class="information-table">
				<h3>打卡信息</h3>
				<div class="bg-table">
					<div class="time"><span class="demonstration">打卡时间</span>
						<el-date-picker v-model="value1" type="datetime" placeholder="选择打卡时间"></el-date-picker>
					</div>
					<div class="location" >打卡定位</div>
					<div class="remark">备注</div>
				</div>
			</div>
		</el-row>
		
		
		
		<!--map-->
		
		<div id="map-container" style="width:1000px; height: 500px;"> </div>
		<div id="myPageTop">
			<table>
				<tr>
					<td>
						<label>按关键字搜索：</label>
					</td>
					<td class="column2">
						<label>左击获取经纬度：</label>
					</td>
				</tr>
				<tr>
					<td>
						<input type="text" placeholder="请输入关键字进行搜索" id="tipinput">
					</td>
					<td class="column2">
						<input type="text" readonly="true" id="lnglat" v-model="postion" >

					</td> 
				</tr>
			</table>
		</div>
		
		
	</div>

</template>

<script>
	import { cardDesclock } from '../../api/api'
	export default {
		data() {
			return {
				listQuery: {
					page: 1,
					keyword: '',
					user_id: ''
				},
				table: [],
				value1:'',
				isTrue:false,
				center: [116.433837, 39.913965],
				postion: [116.433837, 39.913965],
			}
		},
		//挂载之前进行获取表格数据列表
		created() {
			this.listQuery.user_id = this.$route.params.id
			this.getList()
		},

		methods: {
			//1.获取列表数据
			getList() {
				console.log(this.listQuery)
				cardDesclock(this.listQuery)
					.then(res => {
						const {
							code,
							info
						} = res;
						if(code == 1000) {
							this.table = res.data
							console.log('res', this.table)
						}
					})
			},
			//返回上一级
			route() {
				this.$router.go(-1)
			},
			init() {

				let _this = this
				let center = this.center;
				let postion = _this.postion;

				//初始化地图

				let marker, mapObj = new AMap.Map('map-container', {
					center,
					zoom: 20
				})

				addMarker();
				// 实例化点标记
				function addMarker() {
					if(marker) {
						return;
					}
					marker = new AMap.Marker({
						icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
						postion,
						draggable: true,
						cursor: 'move',
						raiseOnDrag: true

					});
					marker.setMap(mapObj);
				}

				//地图中添加地图操作ToolBar插件
				mapObj.plugin(['AMap.ToolBar'], function() {
					//设置地位标记为自定义标记
					var toolBar = new AMap.ToolBar();
					mapObj.addControl(toolBar);
				});
				//放大缩小功能
				mapObj.plugin(['AMap.ToolBar', 'AMap.MapType'], function() {
					mapObj.addControl(new AMap.ToolBar())
					mapObj.addControl(new AMap.MapType({
						showTraffic: false,
						showRoad: false
					}))
				})

				//点击
				let clickEventListener = mapObj.on('click', function(e) {

					let arr = [];

					arr.push(e.lnglat.getLng())
					arr.push(e.lnglat.getLat())

					_this.postion = arr;
					marker.setPosition(arr)

				

				});
				var auto = new AMap.Autocomplete({
					input: "tipinput"
				});
				AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
				function select(e) {
					console.log(e.poi.location.lat)
					if(e.poi && e.poi.location) {
						mapObj.setZoom(15);
						mapObj.setCenter(e.poi.location);
						marker.setPosition(e.poi.location)
					}
				}

			}
		},
		mounted(){
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.information-table {
		h3 {
			font-size: 15px;
			text-align: left;
			padding: 10px 0 0 18px;
		}
	}
	
	.bg-color {
		padding: 10px 10px 8px 20px;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.bg-nav {
		text-align: left;
	}
	
	.bg-table {
		width: 70%;
		position: relative;
		margin: 20px 30px;
		.t-tile {
			text-align: left;
			top: -1px;
			.title {
				width: 15%;
				display: inline-block;
				height: 52px;
				line-height: 52px;
				background-color: #ebebeb;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
			.text {
				width: 25%;
				display: inline-block;
				height: 52px;
				line-height: 52px;
				background-color: #ffffff;
				border: solid 1px #cccccc;
				text-align: center;
				top: -1px;
				float: left;
			}
		}
	}
</style>