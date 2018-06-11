<template>
</template>

<script>
	require('../../../node_modules/dplayer/dist/DPlayer.min.css');
	import DPlayer from 'DPlayer'
	import { liveInfo, liveClose, liveProhibition } from '../../api/api.js';
	export default {
		props: {
			autoplay: {
				type: Boolean,
				default: true
			},
			theme: {
				type: String,
				default: '#FADFA3'
			},
			loop: {
				type: Boolean,
				default: true
			},
			lang: {
				type: String,
				default: 'zh'
			},
			screenshot: {
				type: Boolean,
				default: false
			},
			hotkey: {
				type: Boolean,
				default: true
			},
			preload: {
				type: String,
				default: 'auto'
			},
			contextmenu: {
				type: Array
			},
			logo: {
				type: String
			},
			video: {
				type: Object,
				required: true,
				validator(value) {
					return typeof value.url === 'string'
				}
			}
		},
		data() {
			return {
				dp: null,
				videoUrl: '',
				listQuery: {
					live_id: ''
				}
			}
		},
		methods: {
			getList() {

				liveInfo(this.listQuery)
					.then(res => {
						let {
							code,
							info,
							data,
						} = res;
						if(code == 1000) {
							//							this.user = res.data.user_is_prohibit
							//							
							//							this.table = res.data
							//							this.chuan.room = res.data.room
							//							this.video.url = res.data.live_url[2]
							//							console.log('created',this.video.url)
							console.log('赋值啦', res.data.live_url[2])
							this.videoUrl = 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/chunklist_w630020335.m3u8'
							console.log('this.videoUrl', this.videoUrl)

						}
					})
			},
		},
		created() {

		},
		mounted() {
			this.listQuery.live_id = this.$route.params.id
			liveInfo(this.listQuery)
				.then(res => {
					let {
						code,
						info,
						data,
					} = res;
					if(code == 1000) {

						this.videoUrl = res.data.live_url[2]

						const player = this.dp = new DPlayer({
							element: this.$el,
							autoplay: this.autoplay,
							theme: this.theme,
							loop: this.loop,
							lang: this.lang,
							screenshot: this.screenshot,
							hotkey: this.hotkey,
							preload: this.preload,
							contextmenu: this.contextmenu,
							logo: this.logo,
							video: {
								url: this.videoUrl,
								pic: this.video.pic,
								type: this.video.type
							}
						})
						player.on('play', () => {
							this.$emit('play')
						})
						player.on('pause', () => {
							this.$emit('pause')
						})
						player.on('canplay', () => {
							this.$emit('canplay')
						})
						player.on('playing', () => {
							this.$emit('playing')
						})
						player.on('ended', () => {
							this.$emit('ended')
						})
						player.on('error', () => {
							this.$emit('error')
						})

					}
				})
		}
	}
</script>