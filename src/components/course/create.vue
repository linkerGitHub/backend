<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">添加课程</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="course">
          <FormItem label="课程封面" prop="thumb">
            <template v-slot:label>课程封面</template>
            <Avatar type="male" :src="course.thumb" v-if="course.thumb" noInfo></Avatar>
            <button id="pick-avatar">课程封面</button>
            <avatar-cropper
              @uploaded="handleUploaded"
              trigger="#pick-avatar"
              :upload-headers="uploadHeaders"
              upload-url="/backend/api/v1/upload/image"
            />
          </FormItem>
          <FormItem label="课程名" prop="title">
            <template v-slot:label>课程名</template>
            <input type="text" v-model="course.title" />
          </FormItem>
          <FormItem label="价格" prop="charge">
            <template v-slot:label>价格</template>
            <div class="h-input-group" v-width="200">
              <input type="text" v-model="course.charge" />
              <span class="h-input-addon">元</span>
            </div>
          </FormItem>
          <FormItem label="简短介绍" prop="short_description">
            <template v-slot:label>简短介绍</template>
            <input type="text" v-model="course.short_description" />
          </FormItem>
          <FormItem label="详细介绍" prop="description">
            <template v-slot:label>详细介绍</template>
            <tinymce-editor v-model="course.original_desc"></tinymce-editor>
          </FormItem>
          <FormItem label="上架时间" prop="published_at">
            <template v-slot:label>上架时间</template>
            <DatePicker v-model="course.published_at" v-width="200" type="datetime"></DatePicker>
          </FormItem>
          <FormItem label="是否显示" prop="is_show">
            <template v-slot:label>是否显示</template>
            <h-switch v-model="course.is_show" :trueValue="1" :falseValue="-1"></h-switch>
          </FormItem>
          <FormItem label="SEO描述" prop="seo_description">
            <template v-slot:label>SEO描述</template>
            <textarea v-model="course.seo_description"></textarea>
          </FormItem>
          <FormItem label="SEO关键字" prop="seo_keywords">
            <template v-slot:label>SEO关键字</template>
            <textarea v-model="course.seo_keywords"></textarea>
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
import AvatarCropper from 'vue-avatar-cropper';
import TinymceEditor from '../common/tinymce';

import Course from 'model/Course';

export default {
  components: { AvatarCropper, TinymceEditor },
  data() {
    return {
      course: Course.parse({}),
      uploadHeaders: {
        Authorization: 'Bearer ' + Utils.getLocal('token')
      },
      rules: {
        required: ['thumb', 'title', 'charge', 'short_description', 'published_at', 'is_show', 'seo_description', 'seo_keywords']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.course.is_show = 0;
    },
    back() {
      this.$router.push({ name: 'Course' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.course.render_desc = this.course.original_desc;
        R.Course.Create(this.course).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$router.push({ name: 'Course' });
        });
      }
    },
    handleUploaded(resp) {
      this.course.thumb = resp.data[0];
    }
  }
};
</script>
