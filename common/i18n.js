// 国际化方法
import Vue from 'vue'
import VueI18n from "vue-i18n";
import messages from "@/common/lang.js"
Vue.use(VueI18n)

export default new VueI18n({
	locale: uni.getStorageSync("language") || "en-CN",
	messages,
	silentTranslationWarn: true // 去除console中黄色报错
})


//  混入
Vue.mixin({
	computed: {
		i18n() {
			let locale = this._i18n.locale
			let tabBar = this._i18n.messages[locale]
			let pages = getCurrentPages();
			if (pages) {
				let page = pages[pages.length - 1];
				if (page) {
					let name = page.$route.meta.name
					uni.setNavigationBarTitle({
						title: tabBar[name]
					})
				}
			}
			return this.$t('index')
		},
	},

	onLoad() {
		let locale = this._i18n.locale
		let tabBar = this._i18n.messages[locale]
		uni.setTabBarItem({
			index: 0,
			text: tabBar.home
		})
		uni.setTabBarItem({
			index: 1,
			text: tabBar.trade
		})
		uni.setTabBarItem({
			index: 2,
			text: tabBar.consult
		})
		uni.setTabBarItem({
			index: 3,
			text: tabBar.mine
		})

		let pages = getCurrentPages();
		if (pages) {
			let page = pages[pages.length - 1];
			if (page) {
		
				let name = page.$route.meta.name
				uni.setNavigationBarTitle({
					title: tabBar[name]
				})
			}
		}

	}
})
