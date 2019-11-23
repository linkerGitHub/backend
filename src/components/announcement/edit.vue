<style lang='less'>
</style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">编辑公告</span></div>
    <div class="h-panel-body">
      <p>
        <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
      </p>
      <div ref="editor" style="text-align:left"></div>
      <p class="text-align: right">
        <Button color="blue" @click="edit()">保存</Button>
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
    props: [
        'id'
    ],
  data() {
    return {
      content: '',
      editor: null
    };
  },
  mounted() {
    this.init();
  },
  watch: {
      content(oldVal, newVal) {
          this.editor.txt.html(this.content);
      }
  },
  methods: {
    init() {
        // 读取数据
        R.Announcement.Edit({id: this.id}).then(resp => {
            this.content = resp.data.announcement;
        });

      var editor = new WangEditor(this.$refs.editor);
        editor.customConfig.onchange = (html) => {
          this.content = html;
        }
        editor.customConfig.uploadImgServer = '/backend/api/v1/upload/image';
        editor.customConfig.uploadImgMaxLength = 1;
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHeaders = {
            'Authorization': 'Bearer ' + Utils.getLocal('token'),
        }
        editor.create();

        this.editor = editor;
    },
    back() {
      this.$router.push({name: 'Announcement'});
    },
    edit() {
      R.Announcement.Update({
          id: this.id,
        announcement: this.content
      }).then(resp => {
        HeyUI.$Message.success('成功');
        this.$router.push({name: 'Announcement'});
      });
    }
  }
};
</script>
