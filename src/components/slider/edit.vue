<template>
  <div style="padding: 15px;">
    <Form
      v-width="400"
      mode="block"
      ref="form"
      :validOnChange="true"
      :showErrorTip="true"
      :rules="rules"
      :model="slider"
    >
      <FormItem label="平台" prop="platform">
        <template v-slot:label>平台</template>
        <Select v-model="slider.platform" :datas="platforms" keyName="id" titleName="title"></Select>
      </FormItem>
      <FormItem label="封面" prop="thumb">
        <template v-slot:label>封面</template>
        <image-upload v-model="slider.thumb" name="封面"></image-upload>
      </FormItem>
      <FormItem label="URL" prop="url">
        <template v-slot:label>URL</template>
        <input type="text" v-model="slider.url" />
      </FormItem>
      <FormItem label="升序" prop="sort">
        <template v-slot:label>升序</template>
        <input type="number" v-model="slider.sort" />
      </FormItem>
      <FormItem>
        <Button color="primary" @click="create">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: ['id'],
  mounted() {
    R.Slider.Edit({ id: this.id }).then(res => {
      this.slider = res.data;
    });
  },
  data() {
    return {
      slider: {
        thumb: '',
        url: '',
        sort: 0
      },
      platforms: [
        {
          id: 'PC',
          title: 'PC'
        },
        {
          id: 'H5',
          title: 'H5'
        },
        {
          id: 'APP',
          title: 'APP'
        },
        {
          id: 'MINI',
          title: '微信小程序'
        }
      ],
      rules: {
        required: ['thumb', 'url', 'sort', 'platform']
      }
    };
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Slider.Update(this.slider).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
