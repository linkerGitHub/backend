<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">编辑公告</span></div>
      <div class="h-panel-body">
        <p>
          <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>
        <tinymce-editor v-model="content"></tinymce-editor>
        <p class="text-align: right">
          <Button class="h-btn h-btn-primary" @click="edit()">保存</Button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '../common/tinymce';

import Announcement from 'model/Announcement';

export default {
  components: { TinymceEditor },
  props: ['id'],
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
      // 读取数据
      R.Announcement.Edit({ id: this.id }).then(resp => {
        this.content = resp.data.announcement;
      });
    },
    back() {
      this.$router.push({ name: 'Announcement' });
    },
    edit() {
      R.Announcement.Update({
        id: this.id,
        announcement: this.content
      }).then(resp => {
        HeyUI.$Message.success('成功');
        this.$router.push({ name: 'Announcement' });
      });
    }
  }
};
</script>
