<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">添加用户</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form v-width="400" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="user">
          <FormItem label="头像" prop="avatar">
            <template v-slot:label>头像</template>
            <Avatar type="male" :src="user.avatar" v-if="user.avatar" noInfo></Avatar>
            <button id="pick-avatar">选择头像</button>
            <avatar-cropper
              @uploaded="handleUploaded"
              trigger="#pick-avatar"
              :upload-headers="uploadHeaders"
              upload-url="/backend/api/v1/upload/image"
            />
          </FormItem>
          <FormItem label="昵称" prop="nick_name">
            <template v-slot:label>昵称</template>
            <input type="text" v-model="user.nick_name" />
          </FormItem>
          <FormItem label="手机号" prop="mobile">
            <template v-slot:label>手机号</template>
            <input type="text" v-model="user.mobile" />
          </FormItem>
          <FormItem label="密码" prop="password">
            <template v-slot:label>密码</template>
            <input type="text" v-model="user.password" />
          </FormItem>
          <FormItem>
            <Button color="primary" @click="create">添加</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import User from 'model/User';
import AvatarCropper from 'vue-avatar-cropper';

export default {
  components: { AvatarCropper },
  data() {
    return {
      user: User.parse({}),
      rules: {
        required: ['avatar', 'password', 'mobile', 'nick_name']
      },
      uploadHeaders: {
        Authorization: 'Bearer ' + Utils.getLocal('token')
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    back() {
      this.$router.push({ name: 'Member' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Member.Create(this.user).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'Member' });
        });
      }
    },
    handleUploaded(resp) {
      this.user.avatar = resp.data[0];
    }
  }
};
</script>
