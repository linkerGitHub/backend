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
        :model="indexRecommendLesson"
      >
        <Row :space="10">
          <Cell :width="8">
            <FormItem label="名称" prop="url">
              <input type="text" v-model="indexRecommendLesson.name" />
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="URL" prop="url">
              <input type="text" v-model="indexRecommendLesson.url" />
            </FormItem>
          </Cell>
          <Cell :width="8">
            <FormItem label="升序" prop="sort">
              <input type="number" v-model="indexRecommendLesson.sort" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell :width="24">
            <FormItem label="简介" prop="description">
              <input type="text" v-model="indexRecommendLesson.description" />
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
  data() {
    return {
      indexRecommendLesson: {
        name: '',
        url: '',
        sort: 0,
        description: ''
      },
      rules: {
        required: ['name', 'url', 'sort']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.IndexRecommendLesson.Store(this.indexRecommendLesson).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
