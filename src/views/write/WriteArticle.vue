<template>
  <div class="title fl">
    <span>文章标题:</span>
    <el-input v-model="arTitle" placeholder="标题"></el-input>
  </div>
  <div class="categroy fl">
    <span>所属分类:</span>
    <el-select v-model="selArCategory" placeholder="请选择">
      <el-option
        v-for="item in arCategory"
        :key="item.id"
        :label="item.value"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </div>
  <div class="ar-tag">文章标签:</div>
  <div style="margin: 0 0 20px">
    <el-tag
      :key="tag"
      v-for="tag in arTags"
      closable
      :type="getTagColor()"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"
    >+ New Tag
    </el-button
    >
  </div>
  <span>内容:</span>
  <div class="editor" ref="editor"></div>
  <div class="sendBtn fl-c">
    <el-button type="warning" round @click="sendTip">发布文章</el-button>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive, nextTick } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getSignParam } from "@/utils/utils";
import WangEditor from "wangeditor";

export default {
  name: "WriteArticle",
  setup() {
    const editor = ref();
    const arTitle = ref("");
    const selArCategory = ref();
    const content = reactive({
      html: "",
      text: "",
      json: [
        {
          "tag": "p",
          "attrs": [],
          "children": [
            "欢迎使用 ",
            {
              "tag": "b",
              "attrs": [],
              "children": ["wangEditor"]
            },
            " 富文本编辑器"
          ]
        },
        {
          "tag": "p",
          "attrs": [],
          "children": [
            {
              "tag": "img",
              "attrs": [
                { "name": "src", "value": "xxx.png" },
                { "name": "style", "value": "max-width:100%;" }
              ]
            }
          ]
        }
      ]
    });
    const arCategory = reactive([
      {
        id: "选项1",
        value: "黄金糕"
      },
      {
        id: "选项2",
        value: "双皮奶"
      },
      {
        id: "选项3",
        value: "蚵仔煎"
      },
      {
        id: "选项4",
        value: "龙须面"
      },
      {
        id: "选项5",
        value: "北京烤鸭"
      }
    ]);
    // 标签
    let arTags = reactive([]);
    let inputVisible = ref(false);
    let inputValue = ref("");
    const handleClose = (tag) => {
      arTags.splice(arTags.indexOf(tag), 1);
    };
    let saveTagInput = ref(null);
    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        saveTagInput.value.focus();
      });
    };
    const handleInputConfirm = () => {
      let value = inputValue.value;
      if (value) {
        arTags.push(value);
      }
      inputVisible.value = false;
      inputValue.value = "";
    };
    const tagColors = ["", "success", "info", "warning", "danger"];
    const getTagColor = () => {
      return tagColors[Math.floor(Math.random() * 5)];
    };

    // editor
    let instance;
    const SINA_URL_PATH = "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal";
    onMounted(() => {
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        onchange() {
        }
      });
      instance.config.emotions = [
        {
          title: "新浪", // tab 的标题
          type: "image", // 'emoji' 或 'image' ，即 emoji 形式或者图片形式
          content: [
            { alt: "[坏笑]", src: `${SINA_URL_PATH}/50/pcmoren_huaixiao_org.png` },
            { alt: "[舔屏]", src: `${SINA_URL_PATH}/40/pcmoren_tian_org.png` },
            { alt: "[污]", src: `${SINA_URL_PATH}/3c/pcmoren_wu_org.png` },
            { alt: "[可爱]", src: `${SINA_URL_PATH}/09/2018new_keai_org.png` }
          ]
        }
      ];
      instance.config.zIndex = 0;
      instance.config.height = 600;
      instance.config.uploadImgServer = "http://127.0.0.1:9999/uploadImage";
      instance.config.uploadImgMaxLength = 3;
      instance.config.uploadImgParams = getSignParam({
        token: window.sessionStorage.getItem("token")
      });
      instance.config.uploadImgHooks = {
        // 上传图片之前
        before: function(xhr) {
        },
        // 图片上传并返回了结果，图片插入已成功
        success: function(xhr) {
          console.log(JSON.parse(xhr.response));
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function(xhr, editor, resData) {
          ElMessage.warning({
            message: "插入图片错误",
            type: "warning"
          });
          console.log("fail", resData);
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function(xhr, editor, resData) {
          ElMessage.warning({
            message: "上传图片错误",
            type: "warning"
          });
          console.log("error", xhr, resData);
        },
        // 上传图片超时
        timeout: function(xhr) {
          ElMessage.warning({
            message: "上传图片超时",
            type: "warning"
          });
        }
      };
      instance.create();
    });
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    // 发布
    let sendTip = () => {
      if (!arTitle.value) {
        ElMessage.warning({
          message: "标题不能为空",
          type: "warning"
        });
        return;
      }
      if (!selArCategory.value) {
        ElMessage.warning({
          message: "选择文章类别",
          type: "warning"
        });
        return;
      }
      /*
       * 这里需要三个数据
       * html 用作 文章正文显示
       * text 截取部分用作预览显示
       * json 用作修改时使用
       */

      content.html = instance.txt.html();
      content.text = instance.txt.text();
      content.json = instance.txt.getJSON();
      if (!content.html) {
        ElMessage.warning({
          message: "正文不能为空",
          type: "warning"
        });
        return;
      }

      ElMessageBox.confirm("确认发布吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

      }).catch(() => {
      });
    };

    return {
      sendTip,
      editor,
      content,
      arTitle,
      arCategory,
      selArCategory,
      arTags,
      inputVisible,
      inputValue,
      showInput,
      handleClose,
      handleInputConfirm,
      getTagColor,
      saveTagInput
    };
  }
};

</script>

<style scoped lang="scss">
.title {
  align-items: center;

  span {
    padding-right: 10px;
  }

  .el-input {
    width: 300px;
  }
}

.categroy {
  align-items: center;
  margin: 30px 0;

  span {
    padding-right: 10px;
  }
}

.ar-tag {
  margin: 0 0 20px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-tag {
  margin: 0 10px 0 0;

}

.editor {
  margin-top: 10px;
}

.sendBtn {
  margin-top: 20px;
}
</style>
