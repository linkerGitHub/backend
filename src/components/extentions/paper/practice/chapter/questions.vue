<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">章节</span>
    </div>
    <div class="h-panel-body">
      <Form ref="form" :labelWidth="110">
        <FormItem label="类型" prop="category_id">
          <template v-slot:label>类型</template>
          <h-switch v-model="params.status" :trueValue="1" :falseValue="0">
            <span slot="open">已添加试题管理</span>
            <span slot="close">添加新试题</span>
          </h-switch>
        </FormItem>
        <FormItem label="分类" prop="category_id">
          <template v-slot:label>分类</template>
          <Select
            v-model="params.category_id"
            :datas="categories"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData()">查询试题</Button>
          <Button @click="resetFilter()">重置</Button>
        </FormItem>
      </Form>

      <div class="mb-10">
        <p-del-button
          v-if="params.status === 0"
          permission="addons.Paper.practice_chapter.questions.store"
          text="批量添加"
          @click="create()"
        ></p-del-button>
        <p-del-button
          v-if="params.status === 1"
          permission="addons.Paper.practice_chapter.questions.delete"
          text="批量删除"
          @click="deleteSubmit()"
        ></p-del-button>
      </div>
      <Table ref="table" :loading="loading" :checkbox="true" :datas="datas">
        <TableItem prop="id" title="ID" :width="80"></TableItem>
        <TableItem title="试题">
          <template slot-scope="{ data }">
            <div v-html="data.content"></div>
          </template>
        </TableItem>
      </Table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      params: {
        category_id: null,
        id: this.id,
        status: 1
      },
      datas: [],
      categories: [],
      loading: false
    };
  },
  watch: {
    'params.status'() {
      this.datas = [];
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    resetFilter() {
      this.params.category_id = null;
      this.getData();
    },
    changePage() {
      this.getData();
    },
    getData() {
      this.loading = true;
      R.Extentions.paper.PracticeChapter.QuestionsCreate(this.params).then(resp => {
        this.datas = resp.data.data;
        this.categories = resp.data.categories;
        this.loading = false;
      });
    },
    deleteSubmit() {
      let items = this.$refs.table.getSelection();
      if (items.length === 0) {
        this.$Message.error('请选择需要删除的试题');
        return;
      }
      this.loading = true;
      let ids = [];
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id);
      }
      R.Extentions.paper.PracticeChapter.QuestionsDelete({ id: this.id, qids: ids }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    },
    create() {
      let items = this.$refs.table.getSelection();
      if (items.length === 0) {
        this.$Message.error('请选择需要添加的试题');
        return;
      }
      this.loading = true;
      let ids = [];
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id);
      }
      R.Extentions.paper.PracticeChapter.QuestionsStore({ id: this.id, qids: ids }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    }
  }
};
</script>
