"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const azDragTemp = () => "../../../uni_modules/az-drag-temp/components/az-drag-temp/az-drag-temp.js";
const _sfc_main = {
  name: "InsertTextTemp",
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
      showPop: false,
      date: ""
    };
  },
  methods: {
    showDateSelect() {
      this.$refs.datetime.show();
    },
    selectDate(date) {
      this.date = date;
    },
    // 拖拽外壳变动
    changeTemp(obj) {
    }
  }
};
if (!Array) {
  const _easycom_az_drag_temp2 = common_vendor.resolveComponent("az-drag-temp");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_az_drag_temp2 + _easycom_uni_datetime_picker2)();
}
const _easycom_az_drag_temp = () => "../../../uni_modules/az-drag-temp/components/az-drag-temp/az-drag-temp.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_az_drag_temp + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.date
  }, $data.date ? {
    b: common_vendor.t($data.date)
  } : {
    c: common_assets._imports_0
  }, {
    d: $props.id,
    e: common_vendor.o($options.showDateSelect),
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
    i: common_vendor.sr("datetime", "0aa7fce5-1"),
    j: common_vendor.o($options.selectDate),
    k: common_vendor.o(($event) => $data.date = $event),
    l: common_vendor.p({
      type: "date",
      modelValue: $data.date
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0aa7fce5"], ["__file", "D:/web-project/crazyAz/az-drag-temp-uni-wx/pages/index/components/insertTextTemp.vue"]]);
wx.createComponent(Component);
