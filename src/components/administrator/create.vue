<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">添加管理员</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form v-width="400" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="administrator">
          <FormItem label="姓名" prop="name">
            <template v-slot:label>姓名</template>
            <input type="text" v-model="administrator.name" />
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <template v-slot:label>邮箱</template>
            <input type="text" v-model="administrator.email" />
          </FormItem>
          <FormItem label="密码" prop="password">
            <template v-slot:label>密码</template>
            <input type="text" v-model="administrator.password" />
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
import Administrator from 'model/Administrator';

export default {
  data() {
    return {
      administrator: Administrator.parse({}),
      rules: {
        required: ['name', 'email', 'password']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    back() {
      this.$router.push({ name: 'Administrator' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let data = this.administrator;
        data.password_confirmation = data.password;
        R.Administrator.Create(this.administrator).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'Administrator' });
        });
      }
    }
  }
};
</script>
