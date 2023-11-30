"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const azDragTemp = () => "../../../uni_modules/az-drag-temp/components/az-drag-temp/az-drag-temp.js";
const _sfc_main = {
  name: "InsertImageTemp",
  props: {
    id: {
      type: String,
      default: "sign_" + (/* @__PURE__ */ new Date()).getTime()
    },
    pagerScaleSS: {
      type: Number,
      default: 1
    },
    intervalRangeLimit: {
      type: Array,
      default: () => {
        return [];
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
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  components: {
    azDragTemp
  },
  data() {
    return {
      selectImagePic: "",
      imagesList: [
        "/static/1637370805_20231010105759A003.png",
        "/static/1876758472_20231010111518A004.png"
      ]
    };
  },
  methods: {
    showImagePop() {
      this.$refs.showPop.open("center");
    },
    selectImage(pic) {
      this.selectImagePic = pic;
      this.$refs.showPop.close();
    },
    // 拖拽外壳变动
    changeTemp(obj) {
    }
  }
};
if (!Array) {
  const _easycom_az_drag_temp2 = common_vendor.resolveComponent("az-drag-temp");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_az_drag_temp2 + _easycom_uni_popup2)();
}
const _easycom_az_drag_temp = () => "../../../uni_modules/az-drag-temp/components/az-drag-temp/az-drag-temp.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_az_drag_temp + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.selectImagePic
  }, $data.selectImagePic ? {
    b: $data.selectImagePic
  } : {
    c: common_assets._imports_0$1
  }, {
    d: $props.id,
    e: common_vendor.o($options.showImagePop),
    f: common_vendor.o($options.changeTemp),
    g: common_vendor.o((id) => {
      _ctx.$emit("delete", id);
    }),
    h: common_vendor.p({
      id: $props.id,
      width: 100,
      height: 30,
      limitX: $props.limitX,
      limitY: $props.limitY,
      ["limit-min-width"]: 50,
      ["limit-min-height"]: 20,
      ["limit-max-width"]: 200,
      ["limit-max-height"]: 60,
      intervalRangeLimit: $props.intervalRangeLimit,
      scrollTop: $props.scrollTop
    }),
    i: common_vendor.f($data.imagesList, (pic, index, i0) => {
      return {
        a: index,
        b: pic,
        c: common_vendor.o(($event) => $options.selectImage(pic), index)
      };
    }),
    j: common_vendor.sr("showPop", "cc185c2e-1"),
    k: common_vendor.p({
      type: "center"
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cc185c2e"], ["__file", "D:/web-project/crazyAz/az-drag-temp-uni-wx/pages/index/components/insertImageTemp.vue"]]);
wx.createComponent(Component);
