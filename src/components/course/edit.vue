<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">编辑课程</span></div>
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
            <input type="text" v-model="course.charge" />
          </FormItem>
          <FormItem label="简短介绍" prop="short_description">
            <template v-slot:label>简短介绍</template>
            <input type="text" v-model="course.short_description" />
          </FormItem>
          <FormItem label="详细介绍" prop="description">
            <template v-slot:label>详细介绍</template>
            <div ref="editor"></div>
          </FormItem>
          <FormItem label="上架时间" prop="published_at">
            <template v-slot:label>上架时间</template>
            <DatePicker v-model="course.published_at" type="datetime"></DatePicker>
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
            <Button color="primary" @click="create">保存</Button>
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

export default {
  props: ['id'],
  components: { AvatarCropper },
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
      var editor = new WangEditor(this.$refs.editor);
      editor.customConfig.onchange = html => {
        this.course.description = html;
      };
      editor.customConfig.uploadImgServer = '/backend/api/v1/upload/image';
      editor.customConfig.uploadImgMaxLength = 1;
      editor.customConfig.uploadFileName = 'file';
      editor.customConfig.uploadImgHeaders = {
        Authorization: 'Bearer ' + Utils.getLocal('token')
      };
      editor.create();

      R.Course.Edit({ id: this.id }).then(resp => {
        this.course = resp.data;
        editor.txt.html(this.course.description);
      });
    },
    back() {
      this.$router.push({ name: 'Course' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Course.Update(this.course).then(resp => {
          HeyUI.$Message.success('成功');
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
