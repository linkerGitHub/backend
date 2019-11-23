<style lang='less'>
</style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">添加公告</span></div>
    <div class="h-panel-body">
      <p>
        <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
      </p>
      <div ref="editor" style="text-align:left"></div>
      <p class="text-align: right">
        <Button color="blue" @click="create()">添加</Button>
      </p>
    </div>
  </div>
  </div>
</template>
<script>
import WangEditor from 'wangeditor';
import '../../css/richtext-editor.less';

import Announcement from 'model/Announcement';

export default {
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var editor = new WangEditor(this.$refs.editor);
        editor.customConfig.onchange = (html) => {
          this.content = html
        }
        editor.customConfig.uploadImgServer = '/backend/api/v1/upload/image';
        editor.customConfig.uploadImgMaxLength = 1;
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHeaders = {
            'Authorization': 'Bearer ' + Utils.getLocal('token'),
        }
        editor.create()
    },
    back() {
      this.$router.push({name: 'Announcement'});
    },
    create() {
      R.Announcement.Create({
        announcement: this.content
      }).then(resp => {
        HeyUI.$Message.success('添加成功');
        this.$router.push({name: 'Announcement'});
      });
    }
  }
};
</script>
