<template>
  <div class="table-basic-vue frame-page h-panel" style="width:1200px">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑文章</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="article"
      >
        <FormItem label="电子书" prop="bid">
          <template v-slot:label>电子书</template>
          <Select v-model="article.bid" :datas="books" keyName="id" titleName="name"></Select>
        </FormItem>
        <FormItem label="章节" prop="book_cid">
          <template v-slot:label>章节</template>
          <Select v-model="article.book_cid" :datas="cs" keyName="id" titleName="name"></Select>
        </FormItem>
        <FormItem label="标题" prop="title">
          <template v-slot:label>标题</template>
          <input type="text" v-model="article.title" />
        </FormItem>
        <FormItem label="价格" prop="charge">
          <template v-slot:label>价格</template>
          <div class="h-input-group" v-width="200">
            <input type="text" v-model="article.charge" />
            <span class="h-input-addon">元</span>
          </div>
          <warn text="价格为0即视为试看，可免费阅读"></warn>
        </FormItem>
        <FormItem label="内容" prop="original_content">
          <template v-slot:label>内容</template>
          <mk-editor v-model="article.original_content"></mk-editor>
        </FormItem>
        <FormItem label="显示" prop="is_show">
          <template v-slot:label>显示</template>
          <h-switch v-model="article.is_show"></h-switch>
        </FormItem>
        <FormItem label="上架时间" prop="published_at">
          <template v-slot:label>上架时间</template>
          <DatePicker v-model="article.published_at" v-width="200" type="datetime"></DatePicker>
        </FormItem>

        <FormItem>
          <Button color="primary" @click="create">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import MkEditor from '@/components/common/markdown.vue';

export default {
  props: ['id'],
  components: {
    MkEditor
  },
  data() {
    return {
      article: {
        bid: 0,
        book_cid: 0,
        title: '',
        original_content: '',
        render_content: '',
        published_at: '',
        charge: 0
      },
      rules: {
        required: ['bid', 'book_cid', 'is_show', 'title', 'original_content', 'published_at']
      },
      books: [],
      chapters: []
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    cs() {
      if (!this.article.bid) {
        return [];
      }
      return this.chapters[this.article.bid];
    }
  },
  methods: {
    init() {
      R.Extentions.meeduBooks.Article.Create().then(res => {
        this.books = res.data.books;
        this.chapters = res.data.chapters;
      });
      R.Extentions.meeduBooks.Article.Edit({ id: this.id }).then(res => {
        this.article = res.data;

        // 保存
        localStorage.setItem('markdown_content_val', this.article.render_content);
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.article.render_content = localStorage.getItem('markdown_content_val');
        this.$emit('success', this.article);
      }
    }
  }
};
</script>
