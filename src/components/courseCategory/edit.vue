<style lang="less"></style>
<template>
  <div class>
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">编辑课程分类</span>
      </div>
      <div class="h-panel-body">
        <p>
          <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form
          v-width="400"
          mode="block"
          ref="form"
          :validOnChange="true"
          :showErrorTip="true"
          :labelWidth="110"
          :rules="rules"
          :model="category"
        >
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <input type="number" v-model="category.sort" />
          </FormItem>
          <FormItem label="分类名" prop="name">
            <template v-slot:label>分类名</template>
            <input type="text" v-model="category.name" />
          </FormItem>
          <FormItem label="显示" prop="is_show">
            <template v-slot:label>显示</template>
            <h-switch v-model="category.is_show" :trueValue="1" :falseValue="0"></h-switch>
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
import CourseCategory from 'model/CourseCategory';

export default {
  props: ['id'],
  data() {
    return {
      category: CourseCategory.parse({}),
      rules: {
        required: ['sort', 'name', 'is_show']
      }
    };
  },
  mounted() {
    this.init();
    this.category.sort = 1;
  },
  methods: {
    init() {
      R.CourseCategory.Edit({ id: this.id }).then(resp => {
        this.category = resp.data;
      });
    },
    back() {
      this.$router.push({ name: 'CourseCategory' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.CourseCategory.Update(this.category).then(resp => {
          HeyUI.$Message.success('编辑成功');
          this.$router.push({ name: 'CourseCategory' });
        });
      }
    }
  }
};
</script>
