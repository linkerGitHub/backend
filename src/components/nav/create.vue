<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">添加首页导航</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="nav">
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <Slider v-model="nav.sort" :range="{ start: 1, end: 2000 }"></Slider>
            <p>{{ nav.sort }}</p>
          </FormItem>
          <FormItem label="链接名" prop="name">
            <template v-slot:label>链接名</template>
            <input type="text" v-model="nav.name" />
          </FormItem>
          <FormItem label="链接地址" prop="url">
            <template v-slot:label>链接地址</template>
            <input type="text" v-model="nav.url" />
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
import Nav from 'model/Nav';

export default {
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
    this.nav.sort = 1;
  },
  methods: {
    init() {},
    back() {
      this.$router.push({ name: 'Nav' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Nav.Create(this.nav).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'Nav' });
        });
      }
    }
  }
};
</script>
