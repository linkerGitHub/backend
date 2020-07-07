<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="chapter"
    >
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="chapter.sort" />
      </FormItem>
      <FormItem label="章节名" prop="name">
        <template v-slot:label>章节名</template>
        <input type="text" v-model="chapter.name" />
      </FormItem>

      <FormItem>
        <Button color="primary" @click="create">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['pid', 'id'],
  data() {
    return {
      chapter: {
        name: '',
        sort: 0,
        pid: this.pid
      },
      rules: {
        required: ['name', 'sort']
      }
    };
  },
  mounted() {
    R.Extentions.paper.PracticeChapter.Edit({ id: this.id }).then(res => {
      this.chapter = res.data.data;
    });
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Extentions.paper.PracticeChapter.Update(this.chapter).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
