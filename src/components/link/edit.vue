<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">编辑友情链接</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="link">
          <FormItem label="链接名" prop="name">
            <template v-slot:label>链接名</template>
            <input type="text" v-model="link.name" />
          </FormItem>
          <FormItem label="URL" prop="url">
            <template v-slot:label>URL</template>
            <input type="text" v-model="link.url" />
          </FormItem>
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <Slider v-model="link.sort" :show="show" :range="{ start: 1, end: 2000 }"></Slider>
            <p>{{ link.sort }}</p>
          </FormItem>
          <FormItem>
            <Button color="primary" @click="create">编辑</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import Link from 'model/Link';

export default {
  props: ['id'],
  data() {
    return {
      link: Link.parse({}),
      rules: {
        required: ['name', 'url', 'sort']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.Link.Edit({ id: this.id }).then(resp => {
        this.link = resp.data;
      });
    },
    back() {
      this.$router.push({ name: 'Link' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Link.Update(this.link).then(resp => {
          HeyUI.$Message.success('成功');
          this.$router.push({ name: 'Link' });
        });
      }
    }
  }
};
</script>
