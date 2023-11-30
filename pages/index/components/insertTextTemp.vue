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
			@click="showDateSelect" @change="changeTemp" @delete="(id) => { $emit('delete',id) }">
			<template v-slot:content>
				<view class="content-wrap" style="width: 100%;height: 100%;">
					<text v-if="date" style="font-family: '仿宋体=FangSong,serif';" class="text-ps-ct">{{ date }}</text>
					<view v-else class="textbtn">
						<view class="default-text">
							<image src="@/static/icons/line-date.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
							<text>签署日期</text>
						</view>
					</view>
				</view>
			</template>
		</az-drag-temp>
		<!-- <uni-popup ref="datePopup" type="bottom"> -->
		<uni-datetime-picker
			ref="datetime"
			class="date-pop"
			v-model="date"
			type="date"
			@change="selectDate"
		/>
		<!-- </uni-popup> -->
	</view>
</template>

<script>
	import azDragTemp from '@/uni_modules/az-drag-temp/components/az-drag-temp/az-drag-temp.vue'
	export default {
		name: 'InsertTextTemp',
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
				showPop: false,
				date: ''
			}
		},
		methods: {
			showDateSelect() {
				// this.$refs.datePopup.open('bottom')
				this.$refs.datetime.show()
			},
			selectDate(date) {
				this.date = date
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
		.date-pop{
			position: absolute;
			left: -9999rpx;
		}
		.content-wrap{
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
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
	}
</style>