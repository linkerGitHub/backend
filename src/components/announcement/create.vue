<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">添加公告</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>
        <tinymce-editor v-model="content"></tinymce-editor>
        <p class="text-align: right">
          <Button color="blue" @click="create()">添加</Button>
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
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    back() {
      this.$router.push({ name: 'Announcement' });
    },
    create() {
      R.Announcement.Create({
        announcement: this.content
      }).then(resp => {
        HeyUI.$Message.success('添加成功');
        this.$router.push({ name: 'Announcement' });
      });
    }
  }
};
</script>
