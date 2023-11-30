<template>
	<view class="demo-container">
		<az-drag-temp 
			:id="id" 
			:width="100" 
			:height="30" 
			:limitX="limitX" 
			:limitY="limitY" 
			:limit-min-width="50" 
			:limit-min-height="20" 
			:limit-max-width="200" 
			:limit-max-height="60" 
			:intervalRangeLimit="intervalRangeLimit" 
			:scrollTop="scrollTop"
			@click="showImagePop" @change="changeTemp" @delete="(id) => { $emit('delete',id) }">
			<template v-slot:content>
				<view class="content-wrap" style="width: 100%;height: 100%;">
					<image v-if="selectImagePic" :src="selectImagePic" style="width: 100%;height: 100%;" mode="aspectFit" />
					<view v-else class="textbtn" >
						<view class="default-text">
							<image src="@/static/icons/pansou.png" class="mr-10" mode=""></image>
							<text>电子签名</text>
						</view>
					</view>
				</view>
			</template>
		</az-drag-temp>
		<uni-popup ref="showPop" type="center">
			<view class="pop-content">
				<image
					v-for="(pic,index) in imagesList" 
					:key="index" 
					:src="pic"
					style="width: 100%;height: 316rpx;margin-bottom: 30rpx;"
					mode="aspectFit"
					@click="selectImage(pic)"
					></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import azDragTemp from '@/uni_modules/az-drag-temp/components/az-drag-temp/az-drag-temp.vue'
	export default {
		name: 'InsertImageTemp',
		props: {
			id: {
				type: String,
				default: 'sign_' + new Date().getTime()
			},
			pagerScaleSS: {
				type: Number,
				default: 1
			},
			intervalRangeLimit: {
				type: Array,
				default: () => {
					return []
				}
			},
			limitWidth: {
				type: Number,
				default: 0
			},
			limitHeight: {
				type: Number,
				default: 0
			},
			// 限制可移动的X范围
			limitX: {
				type: Array,
				default: () => {
					return [0, 0]
				}
			},
			// 限制可移动的Y范围
			limitY: {
				type: Array,
				default: () => {
					return [0, 0]
				}
			},
			scrollTop: {
				type: Number,
				default: 0
			},
		},
		components: {
			azDragTemp
		},
		data() {
			return {
				selectImagePic: '',
				imagesList: [
					"/static/1637370805_20231010105759A003.png",
					"/static/1876758472_20231010111518A004.png"
				],
			}
		},
		methods: {
			showImagePop() {
				this.$refs.showPop.open('center')
			},
			selectImage(pic) {
				this.selectImagePic = pic
				this.$refs.showPop.close()
			},
			// 拖拽外壳变动
			changeTemp(obj) {
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.demo-container{
		.mr-10{
			margin-right: 10rpx;
		}
		.default-text{
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			image{
				width: 36rpx;
				height: 36rpx;
			}
		}
		.content-wrap{
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
		}
		.pop-content{
			width: 500rpx;
			height: 800rpx;
			padding: 30rpx;
			background: #fff;
			image{
				box-shadow: 0 0 20rpx rgba(0,0,0,.3);
				border-radius: 20rpx;
			}
		}
	}
</style>