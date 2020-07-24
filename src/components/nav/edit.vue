<style lang="less"></style>
<template>
  <div class>
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">编辑首页导航</span>
      </div>
      <div class="h-panel-body">
        <Form
          v-width="400"
          mode="block"
          ref="form"
          :validOnChange="true"
          :showErrorTip="true"
          :labelWidth="110"
          :rules="rules"
          :model="nav"
        >
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <input type="number" v-model="nav.sort" />
          </FormItem>
          <FormItem label="链接名" prop="name">
            <template v-slot:label>链接名</template>
            <input type="text" v-model="nav.name" />
          </FormItem>
          <FormItem label="链接地址" prop="url">
            <template v-slot:label>链接地址</template>
            <input type="text" v-model="nav.url" />
          </FormItem>
          <FormItem label="Active" prop="active_routes">
            <template v-slot:label>Active</template>
            <input type="text" v-model="nav.active_routes" />
            <warn text="不清楚可不填写"></warn>
          </FormItem>
          <FormItem>
            <Button color="primary" @click="create">保存</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from 'model/Nav';

export default {
  props: ['id'],
  data() {
    return {
      nav: Nav.parse({}),
      rules: {
        required: ['sort', 'name', 'url']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Nav.Edit({ id: this.id }).then(resp => {
        this.nav = resp.data;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Nav.Update(this.nav).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
