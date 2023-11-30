"use strict";
const common_vendor = require("../../common/vendor.js");
const insertTextTemp = () => "./components/insertTextTemp.js";
const insertImageTemp = () => "./components/insertImageTemp.js";
const _sfc_main = {
  name: "AzDragTempDemo",
  components: {
    insertTextTemp,
    insertImageTemp
  },
  data() {
    return {
      screenWidth: common_vendor.index.getSystemInfoSync().screenWidth,
      scrollTop: 0,
      onePageWidth: 0,
      onePageHeight: 0,
      signImageList: [
        "/static/1_20231128175925A038.png",
        "/static/2_20231128175925A039.png"
      ],
      limitWidthHeight: {
        width: 0,
        height: 0
      },
      docPagerStyle: {},
      textTempIdList: [],
      imageTempIdList: []
    };
  },
  computed: {
    canvasStyle() {
      return `width: ${this.onePageWidth}px; height:${this.onePageHeight}px;`;
    },
    // 拖拽每页页眉不可出现的范围
    intervalRangeLimit() {
      let arr = [];
      let range = 24;
      for (let index in this.signImageList) {
        index *= 1;
        let item = this.docPagerStyle["docPager" + index];
        let width = item.width.replace("px", "") * 1;
        let height = item.height.replace("px", "") * 1;
        let posSY = height * (index + 1) + range * index;
        let posEY = height * (index + 1) + range * (index + 1);
        arr.push([
          [0, posSY],
          [width, posEY]
        ]);
      }
      return arr;
    }
  },
  methods: {
    // 监听滚动条高度
    onPageScroll() {
      this.scrollTop = event.detail.scrollTop;
    },
    // 拖拽外壳变动
    changeTemp(obj) {
    },
    // 添加文本拖拽外壳
    addTextDragTemp() {
      this.textTempIdList.push("sign_" + (/* @__PURE__ */ new Date()).getTime());
    },
    // 删除文本拖拽外壳
    deleteTextDragTemp(id) {
      let index = this.textTempIdList.findIndex((item) => {
        return item === id;
      });
      if (index !== -1) {
        this.textTempIdList.splice(index, 1);
      }
    },
    // 添加图片拖拽外壳
    addImageDragTemp() {
      this.imageTempIdList.push("sign_" + (/* @__PURE__ */ new Date()).getTime());
    },
    // 删除文本拖拽外壳
    deleteImageDragTemp(id) {
      let index = this.imageTempIdList.findIndex((item) => {
        return item === id;
      });
      if (index !== -1) {
        this.imageTempIdList.splice(index, 1);
      }
    },
    // 文档图片加载完毕
    imageLoad(res, pageId) {
      if (!this.onePageWidth) {
        this.onePageWidth = res.detail.width;
        this.onePageHeight = res.detail.height;
      }
      this.$set(this.docPagerStyle, pageId, {
        width: this.screenWidth + "px",
        height: Math.floor(res.detail.height / res.detail.width * this.screenWidth) + "px"
      });
      this.$nextTick(() => {
        const query = common_vendor.index.createSelectorQuery().in(this);
        query.select("#pagerChunk").boundingClientRect((data) => {
          this.limitWidthHeight.width = data.width;
          this.limitWidthHeight.height = data.height;
        }).exec();
      });
    }
  }
};
if (!Array) {
  const _component_insert_text_temp = common_vendor.resolveComponent("insert-text-temp");
  const _component_insert_image_temp = common_vendor.resolveComponent("insert-image-temp");
  (_component_insert_text_temp + _component_insert_image_temp)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.addTextDragTemp && $options.addTextDragTemp(...args)),
    b: common_vendor.o((...args) => $options.addImageDragTemp && $options.addImageDragTemp(...args)),
    c: common_vendor.o((...args) => $options.addImageDragTemp && $options.addImageDragTemp(...args)),
    d: common_vendor.f($data.signImageList, (item, index, i0) => {
      return {
        a: `docPager${index}`,
        b: item,
        c: common_vendor.s($data.docPagerStyle[`docPager${index}`]),
        d: common_vendor.o((e) => {
          $options.imageLoad(e, `docPager${index}`);
        }, `docPager${index}`),
        e: `docCanvas_docPager${index}`,
        f: common_vendor.t(index + 1),
        g: `docPager${index}`
      };
    }),
    e: common_vendor.s($options.canvasStyle),
    f: common_vendor.t($data.signImageList.length),
    g: common_vendor.f($data.textTempIdList, (item, index, i0) => {
      return {
        a: common_vendor.sr(item, "1cf27b2a-0-" + i0, {
          "f": 1
        }),
        b: item,
        c: item,
        d: item,
        e: common_vendor.o($options.deleteTextDragTemp, item),
        f: "1cf27b2a-0-" + i0,
        g: common_vendor.p({
          id: item,
          scrollTop: $data.scrollTop,
          limitX: [0, $data.limitWidthHeight.width],
          limitY: [0, $data.limitWidthHeight.height],
          intervalRangeLimit: $options.intervalRangeLimit
        })
      };
    }),
    h: common_vendor.f($data.imageTempIdList, (item, index, i0) => {
      return {
        a: common_vendor.sr(item, "1cf27b2a-1-" + i0, {
          "f": 1
        }),
        b: item,
        c: item,
        d: item,
        e: common_vendor.o($options.deleteImageDragTemp, item),
        f: "1cf27b2a-1-" + i0,
        g: common_vendor.p({
          id: item,
          scrollTop: $data.scrollTop,
          limitX: [0, $data.limitWidthHeight.width],
          limitY: [0, $data.limitWidthHeight.height],
          intervalRangeLimit: $options.intervalRangeLimit
        })
      };
    }),
    i: common_vendor.o((...args) => $options.onPageScroll && $options.onPageScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/web-project/crazyAz/az-drag-temp-uni-wx/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
