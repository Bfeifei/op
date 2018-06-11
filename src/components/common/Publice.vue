<template>
  <div class="publice">
    <NavMenu></NavMenu>
    <div class="container">
    	<TopBar></TopBar>
	    <div class="article-sec">
				<keep-alive :include="Keep">
	    		<router-view v-wechat-title="$route.meta.title" :key="key"/>
	    	</keep-alive>
	    </div>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'
import TopBar from './TopBar.vue'

export default {
  components: {
    NavMenu,
    TopBar,
  },
  data(){
  	return {
  		Keep:['企课网运营后台','后台系统','企业课程设定']
  	}
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
	}
}
</script>

<style lang="scss">
@import '../../styles/publice.scss'
</style>
