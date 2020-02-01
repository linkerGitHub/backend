<template>
  <div style="padding: 15px;">
    <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="user">
    <FormItem label="头像" prop="avatar">
      <template v-slot:label>头像</template>
      <image-upload v-model="user.avatar" name="选择头像"></image-upload>
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
      <warn text="不修改密码请不要填写"></warn>
    </FormItem>
    <FormItem>
      <Button color="primary" @click="update">编辑</Button>
      <Button @click="cancel">取消</Button>
    </FormItem>
  </Form>
  </div>
</template>
<script>
import User from 'model/User';
export default {
  props: ['id'],
  data() {
    return {
      user: User.parse({}),
      rules: {
        required: ['avatar', 'mobile', 'nick_name']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Member.Edit({ id: this.id }).then(res => {
        this.user = res.data;
      });
    },
    update() {
      this.$emit('success', this.user);
      this.close();
    },
    cancel() {
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>