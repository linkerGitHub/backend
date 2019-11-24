<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">添加课程章节</span>
      </div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>
        <Form ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="chapter">
          <FormItem label="章节名" prop="title">
            <template v-slot:label>章节名</template>
            <input type="text" v-model="chapter.title" />
          </FormItem>
          <FormItem label="升序" prop="sort">
            <template v-slot:label>升序</template>
            <Slider v-model="chapter.sort" :range="{ start: 1, end: 100 }"></Slider>
            <p>{{ chapter.sort }}</p>
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
import WangEditor from 'wangeditor';
import '../../css/richtext-editor.less';
import AvatarCropper from 'vue-avatar-cropper';

import Course from 'model/Course';
import Chapter from 'model/CourseChapter';

export default {
  components: { AvatarCropper },
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
    this.init();
    this.course.id = this.$route.params.cid;
    this.chapter.sort = 1;
  },
  methods: {
    init() {},
    back() {
      this.$router.push({ name: 'CourseChapter', params: { cid: this.course.id } });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let data = this.chapter;
        data.course_id = this.course.id;
        R.CourseChapter.Create(data).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'CourseChapter', params: { cid: this.course.id } });
        });
      }
    }
  }
};
</script>
