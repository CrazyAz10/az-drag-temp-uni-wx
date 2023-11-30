"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "AzDragTemp",
  props: {
    // 唯一标识id
    id: {
      type: String,
      default: "temp_" + (/* @__PURE__ */ new Date()).getTime()
    },
    // 拖拽壳层级权重
    zIndex: {
      type: Number,
      default: 10
    },
    // 初始化定位X坐标
    left: {
      type: Number,
      default: 100
    },
    // 初始化定位Y坐标
    top: {
      type: Number,
      default: 100
    },
    // 限制缩放最小宽度
    limitMinWidth: {
      type: Number,
      default: 0
    },
    // 限制缩放最小高度
    limitMinHeight: {
      type: Number,
      default: 0
    },
    // 限制缩放最大宽度
    limitMaxWidth: {
      type: Number,
      default: 0
    },
    // 限制缩放最大高度
    limitMaxHeight: {
      type: Number,
      default: 0
    },
    // 宽度
    width: {
      type: Number,
      default: 100
    },
    // 高度
    height: {
      type: Number,
      default: 30
    },
    // 限制可移动的X范围
    limitX: {
      type: Array,
      default: () => {
        return [0, 0];
      }
    },
    // 限制可移动的Y范围
    limitY: {
      type: Array,
      default: () => {
        return [0, 0];
      }
    },
    // 限制多组可移动范围
    intervalRangeLimit: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 当前滚动条高度
    scrollTop: {
      type: Number,
      default: 0
    },
    // 节流间隔时长
    throttleDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      show: false,
      leftPosition: false,
      signPath: "",
      signList: [],
      ballStyle: {
        position: "absolute",
        zIndex: "10",
        width: "100px",
        fontSize: "12px",
        height: "30px",
        lineHeight: "28px",
        textAlign: "center",
        top: "100px",
        left: "100px"
      },
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      isMove: false,
      scale: false,
      timer: null
    };
  },
  mounted() {
    if (this.width) {
      this.ballStyle.width = this.width + "px";
    }
    if (this.height) {
      this.ballStyle.height = this.height + "px";
    }
    if (this.zIndex) {
      this.ballStyle.zIndex = this.zIndex;
    }
    if (this.left) {
      this.ballStyle.left = this.left + "px";
    }
    if (this.top) {
      this.ballStyle.top = this.top + "px";
    }
    if (this.scrollTop !== 0) {
      this.ballStyle.top = this.ballStyle.top.replace("px", "") * 1 + this.scrollTop + "px";
    }
  },
  methods: {
    // 节流处理
    throttle(event, fn) {
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
        fn(event);
        this.timer = null;
      }, this.throttleDelay);
    },
    selectSign(item) {
      this.signPath = item.filePath;
      this.show = false;
    },
    touchstart(event, scale = false) {
      this.scale = scale;
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchmove(event) {
      this.endX = event.touches[0].clientX;
      this.endY = event.touches[0].clientY;
      if (this.endX - this.startX != 0 || this.endY - this.startY != 0) {
        this.isMove = true;
      }
      if (this.scale) {
        if (this.ballStyle.width.replace("px", "") * 1 + this.endX - this.startX <= this.limitMinWidth) {
          this.ballStyle.width = this.limitMinWidth + "px";
        } else if (this.limitMaxWidth && this.ballStyle.width.replace("px", "") * 1 + this.endX - this.startX >= this.limitMaxWidth) {
          this.ballStyle.width = this.limitMaxWidth + "px";
        } else {
          this.ballStyle.width = this.ballStyle.width.replace("px", "") * 1 + this.endX - this.startX + "px";
        }
        if (this.ballStyle.height.replace("px", "") * 1 + this.endY - this.startY <= this.limitMinHeight) {
          this.ballStyle.height = this.limitMinHeight + "px";
        } else if (this.limitMaxHeight && this.ballStyle.height.replace("px", "") * 1 + this.endY - this.startY >= this.limitMaxHeight) {
          this.ballStyle.height = this.limitMaxHeight + "px";
        } else {
          this.ballStyle.height = this.ballStyle.height.replace("px", "") * 1 + this.endY - this.startY + "px";
        }
      } else {
        if (this.ballStyle.left.replace("px", "") * 1 + this.endX - this.startX <= this.limitX[0]) {
          this.ballStyle.left = "0px";
          this.leftPosition = false;
        } else if (this.limitX[1] && this.ballStyle.left.replace("px", "") * 1 + this.endX - this.startX + this.ballStyle.width.replace("px", "") * 1 >= this.limitX[1]) {
          this.ballStyle.left = this.limitX[1] - this.ballStyle.width.replace("px", "") + "px";
        } else {
          if (this.limitX[1] - (this.ballStyle.left.replace("px", "") * 1 + this.endX - this.startX + this.ballStyle.width.replace("px", "") * 1) <= 26) {
            this.leftPosition = true;
          } else {
            this.leftPosition = false;
          }
          this.ballStyle.left = this.ballStyle.left.replace("px", "") * 1 + this.endX - this.startX + "px";
        }
        if (this.ballStyle.top.replace("px", "") * 1 + this.endY - this.startY <= this.limitY[0]) {
          this.ballStyle.top = "0px";
        } else if (this.limitY[1] && this.ballStyle.top.replace("px", "") * 1 + this.endY - this.startY + this.ballStyle.height.replace("px", "") * 1 >= this.limitY[1]) {
          this.ballStyle.top = this.limitY[1] - this.ballStyle.height.replace("px", "") + "px";
        } else {
          this.ballStyle.top = this.ballStyle.top.replace("px", "") * 1 + this.endY - this.startY + "px";
        }
      }
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchend(event) {
      if (this.isMove) {
        this.isMove = false;
        this.judgeRange();
        this.$emit("change", this.getAttribute());
        return;
      }
      this.$emit("click");
    },
    /**
     * 判断拖拽容器位置是否在禁拖区 多组禁拖区
     */
    judgeRange() {
      if (this.intervalRangeLimit.length) {
        let wrapBox = [
          [
            this.ballStyle.left.replace("px", "") * 1,
            this.ballStyle.top.replace("px", "") * 1
          ],
          [
            this.ballStyle.left.replace("px", "") * 1 + this.ballStyle.width.replace("px", "") * 1,
            this.ballStyle.top.replace("px", "") * 1 + this.ballStyle.height.replace("px", "") * 1
          ]
        ];
        for (let item of this.intervalRangeLimit) {
          wrapBox[1][0] - wrapBox[0][0];
          wrapBox[1][1] - wrapBox[0][1];
          if (wrapBox[0][0] >= item[0][0] && wrapBox[0][0] <= item[1][0] || wrapBox[1][0] >= item[0][0] && wrapBox[1][0] <= item[1][0] || item[0][0] >= wrapBox[0][0] && item[0][0] <= wrapBox[1][0] || item[1][0] >= wrapBox[0][0] && item[1][0] <= wrapBox[1][0]) {
            this.newDragPositionX(item, wrapBox);
          }
          if (wrapBox[0][1] >= item[0][1] && wrapBox[0][1] <= item[1][1] || wrapBox[1][1] >= item[0][1] && wrapBox[1][1] <= item[1][1] || item[0][1] >= wrapBox[0][1] && item[0][1] <= wrapBox[1][1] || item[1][1] >= wrapBox[0][1] && item[1][1] <= wrapBox[1][1]) {
            this.newDragPositionY(item, wrapBox);
          }
        }
      }
    },
    newDragPositionX(item, wrapBox) {
      let tryNewX = item[0][0] - (wrapBox[1][0] - wrapBox[0][0]);
      if (tryNewX >= this.limitX[0] && tryNewX <= this.limitX[1]) {
        this.ballStyle.left = tryNewX + "px";
      } else {
        tryNewX = item[1][0] + (wrapBox[1][0] - wrapBox[0][0]);
        if (tryNewX >= this.limitX[0] && tryNewX <= this.limitX[1]) {
          this.ballStyle.left = tryNewX + "px";
        }
      }
    },
    newDragPositionY(item, wrapBox) {
      let tryNewY = item[0][1] - (wrapBox[1][1] - wrapBox[0][1]);
      if (tryNewY >= this.limitY[0] && tryNewY <= this.limitY[1]) {
        this.ballStyle.top = tryNewY + "px";
      } else {
        tryNewY = item[1][1] + (wrapBox[1][1] - wrapBox[0][1]);
        if (tryNewY >= this.limitY[0] && tryNewY <= this.limitY[1]) {
          this.ballStyle.top = tryNewY + "px";
        }
      }
    },
    /**
     * 删除操作
     */
    deleteItem() {
      this.$emit("delete", this.id);
    },
    /**
     * 获取拖拽容器属性
     */
    getAttribute() {
      return {
        id: this.id,
        width: this.ballStyle.width,
        height: this.ballStyle.height,
        left: this.ballStyle.left,
        top: this.ballStyle.top,
        fontSize: this.ballStyle.fontSize
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args)),
    b: common_vendor.o((event) => {
      $options.throttle(event, $options.touchmove);
    }),
    c: common_vendor.o((...args) => $options.touchend && $options.touchend(...args)),
    d: !_ctx.$slots.content
  }, !_ctx.$slots.content ? {} : {}, {
    e: $data.leftPosition ? 1 : "",
    f: common_vendor.o((...args) => $options.deleteItem && $options.deleteItem(...args)),
    g: $data.leftPosition ? 1 : "",
    h: common_vendor.o((e) => {
      $options.touchstart(e, true);
    }),
    i: common_vendor.o((event) => {
      $options.throttle(event, $options.touchmove);
    }),
    j: common_vendor.o((...args) => $options.touchend && $options.touchend(...args)),
    k: $props.id,
    l: $props.id,
    m: common_vendor.s($data.ballStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f8aded23"], ["__file", "D:/web-project/crazyAz/az-drag-temp-uni-wx/uni_modules/az-drag-temp/components/az-drag-temp/az-drag-temp.vue"]]);
wx.createComponent(Component);
