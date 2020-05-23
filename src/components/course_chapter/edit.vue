<style lang="less"></style>
<template>
  <div class>
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">编辑课程章节</span>
      </div>
      <div class="h-panel-body">
        <p>
          <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>
        <Form
          ref="form"
          :validOnChange="true"
          :showErrorTip="true"
          :labelWidth="110"
          :rules="rules"
          :model="chapter"
        >
          <FormItem label="章节名" prop="title">
            <template v-slot:label>章节名</template>
            <input type="text" v-model="chapter.title" />
          </FormItem>
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <input type="number" v-model="chapter.sort" />
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
import Course from 'model/Course';
import Chapter from 'model/CourseChapter';

export default {
  data() {
    return {
      course: Course.parse({}),
      chapter: Chapter.parse({}),
      rules: {
        required: ['title', 'sort']
      }
    };
  },
  mounted() {
    this.course.id = this.$route.params.cid;
    this.chapter.sort = 1;
    this.chapter.id = this.$route.params.id;
    this.init();
  },
  methods: {
    init() {
      R.CourseChapter.Edit({ course_id: this.course.id, id: this.chapter.id }).then(resp => {
        this.chapter = resp.data;
      });
    },
    back() {
      this.$router.push({ name: 'CourseChapter', params: { cid: this.course.id } });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let data = this.chapter;
        data.course_id = this.course.id;
        R.CourseChapter.Update(data).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'CourseChapter', params: { cid: this.course.id } });
        });
      }
    }
  }
};
</script>
