<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">添加VIP角色</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="role">
          <FormItem label="角色名" prop="name">
            <template v-slot:label>角色名</template>
            <input type="text" v-model="role.name" />
          </FormItem>
          <FormItem label="权重" prop="weight">
            <template v-slot:label>权重</template>
            <input type="text" v-model="role.weight" />
          </FormItem>
          <FormItem label="天数" prop="expire_days">
            <template v-slot:label>天数</template>
            <input type="text" v-model="role.expire_days" />
          </FormItem>
          <FormItem label="价格" prop="charge">
            <template v-slot:label>价格</template>
            <input type="text" v-model="role.charge" />
          </FormItem>
          <FormItem label="描述" prop="description">
            <template v-slot:label>描述</template>
            <textarea v-model="role.description"></textarea>
          </FormItem>
          <FormItem label="是否显示" prop="is_show">
            <template v-slot:label>是否显示</template>
            <h-switch v-model="role.is_show" :trueValue="1" :falseValue="0">
              <span slot="1">是</span>
              <span slot="0">否</span>
            </h-switch>
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
import Role from 'model/Role';

export default {
  data() {
    return {
      role: Role.parse({}),
      rules: {
        required: ['name', 'weight', 'description', 'expire_days', 'charge']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.role.is_show = 1;
    },
    back() {
      this.$router.push({ name: 'Role' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      console.log(this.role);
      if (validResult.result) {
        R.Role.Create(this.role).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'Role' });
        });
      }
    }
  }
};
</script>
