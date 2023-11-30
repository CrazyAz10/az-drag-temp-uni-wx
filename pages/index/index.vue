<template>
	<scroll-view class="scroll-view" scroll-y @scroll="onPageScroll">
		<view class="demo-container">
			<view class="handle-bar">
				<button size="mini" @click="addTextDragTemp">+文本拖拽</button>
				<button size="mini" @click="addImageDragTemp">+图片拖拽</button>
				<button size="mini" type="primary" @click="addImageDragTemp">保存</button>
			</view>
			<view id="pagerChunk" class="body">
				<view
					v-for="(item,index) in signImageList" 
					:key="`docPager${index}`" 
					class="pager-item">
					<image
						:id="`docPager${index}`" 
						:src="item" 
						mode="" 
						class="page-doc-image"
						:style="docPagerStyle[`docPager${index}`]" 
						@load="(e) => { imageLoad(e, `docPager${index}`) }"></image>
						<view class="canvas-list">
							<canvas :canvas-id="`docCanvas_docPager${index}`" :style="canvasStyle"></canvas>
						</view>
					<view class="pager-num font-size-24 font-tips-color">
						{{ index + 1 }} / {{ signImageList.length }}
					</view>
				</view>
				<insert-text-temp
					v-for="(item,index) in textTempIdList"
					:id="item" 
					:ref="item" 
					:key="item" 
					:scrollTop="scrollTop"
					:limitX="[0, limitWidthHeight.width]" :limitY="[0, limitWidthHeight.height]" :intervalRangeLimit="intervalRangeLimit"
					@delete="deleteTextDragTemp" />
				<insert-image-temp
					v-for="(item,index) in imageTempIdList"
					:id="item" 
					:ref="item" 
					:key="item" 
					:scrollTop="scrollTop"
					:limitX="[0, limitWidthHeight.width]" :limitY="[0, limitWidthHeight.height]" :intervalRangeLimit="intervalRangeLimit"
					@delete="deleteImageDragTemp" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import insertTextTemp from './components/insertTextTemp.vue'
	import insertImageTemp from './components/insertImageTemp.vue'
	export default {
		name: 'AzDragTempDemo',
		components: {
			insertTextTemp,
			insertImageTemp
		},
		data() {
			return {
				screenWidth: uni.getSystemInfoSync().screenWidth,
				scrollTop: 0,
				onePageWidth: 0,
				onePageHeight: 0,
				signImageList: [
					"/static/1_20231128175925A038.png",
					"/static/2_20231128175925A039.png"
				],
				limitWidthHeight: {
					width: 0,
					height: 0,
				},
				docPagerStyle: {},
				textTempIdList: [],
				imageTempIdList: [],
			}
		},
		computed: {
			canvasStyle() {
				return `width: ${this.onePageWidth}px; height:${this.onePageHeight}px;`
			},
			// 拖拽每页页眉不可出现的范围
			intervalRangeLimit() {
				let arr = []
				let range = 24 // 页眉的高度
				for(let index in this.signImageList) {
					index *= 1
					let item = this.docPagerStyle['docPager' + index]
					let width = item.width.replace('px', '') * 1
					let height = item.height.replace('px', '') * 1
					let posSY = height * (index + 1) + (range * index)
					let posEY = height * (index + 1) + (range * (index + 1))
					arr.push([
						[0, posSY],
						[width, posEY]
					])
				}
				return arr
			},
		},
		methods: {
			// 监听滚动条高度
			onPageScroll() {
				this.scrollTop = event.detail.scrollTop
			},
			// 拖拽外壳变动
			changeTemp(obj) {
				
			},
			// 添加文本拖拽外壳
			addTextDragTemp() {
				this.textTempIdList.push('sign_' + new Date().getTime())
			},
			// 删除文本拖拽外壳
			deleteTextDragTemp(id) {
				let index = this.textTempIdList.findIndex(item => {
					return item === id
				})
				if (index !== -1) {
					this.textTempIdList.splice(index, 1)
				}
			},
			// 添加图片拖拽外壳
			addImageDragTemp() {
				this.imageTempIdList.push('sign_' + new Date().getTime())
			},
			// 删除文本拖拽外壳
			deleteImageDragTemp(id) {
				let index = this.imageTempIdList.findIndex(item => {
					return item === id
				})
				if (index !== -1) {
					this.imageTempIdList.splice(index, 1)
				}
			},
			// 文档图片加载完毕
			imageLoad(res, pageId) {
				// 纸张大小 原图大小
				if (!this.onePageWidth) {
					this.onePageWidth = res.detail.width
					this.onePageHeight = res.detail.height
				}
				// 设置实际在客户端展示的纸张大小
				this.$set(this.docPagerStyle, pageId, {
					width: this.screenWidth + 'px',
					height: Math.floor(res.detail.height / res.detail.width * this.screenWidth) + 'px'
				})
				this.$nextTick(() => {
					// 获取最终文档所有图片在页面展示的大小
					const query = uni.createSelectorQuery().in(this)
					query.select('#pagerChunk').boundingClientRect(data => {
						this.limitWidthHeight.width = data.width
						this.limitWidthHeight.height = data.height
					}).exec()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.demo-container{
		.handle-bar{
			padding: 20rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			button{
				
			}
		}
		.body{
			position: relative;
			.canvas-list {
				position: fixed;
				left: -9999px;
				top: 0;
			}
			.pager-item{
				.page-doc-image {
					display: block;
					box-shadow: 0 0 20rpx rgba(0,0,0,.2);
				}
				.pager-num{
					height: 24px;
					line-height: 24px;
					padding: 0 10rpx;
				}
			}
		}
	}
</style>