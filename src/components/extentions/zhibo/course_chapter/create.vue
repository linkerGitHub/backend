<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="chapter"
      >
        <Row :space="10">
          <Cell :width="12">
            <FormItem label="章节名" prop="name">
              <input type="text" v-model="chapter.name" />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="排序" prop="sort">
              <input type="number" v-model="chapter.sort" />
            </FormItem>
          </Cell>
        </Row>

        <FormItem>
          <Button color="primary" @click="create">添加</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['course_id'],
  data() {
    return {
      chapter: {
        name: '',
        sort: 0,
        course_id: this.course_id
      },
      rules: {
        required: ['name', 'sort']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.chapter);
      }
    }
  }
};
</script>
