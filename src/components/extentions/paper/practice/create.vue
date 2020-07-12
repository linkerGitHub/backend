<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加练习</span>
    </div>
    <div class="h-panel-body">
      <Form
        mode="block"
        ref="form"
        :validOnChange="true"
        :showErrorTip="true"
        :rules="rules"
        :model="practice"
        v-width="500"
      >
        <FormItem label="分类" prop="category_id">
          <template v-slot:label>分类</template>
          <Select
            v-model="practice.category_id"
            :datas="categories"
            keyName="id"
            titleName="name"
            :filterable="true"
          ></Select>
          <warn text="注意，这里只能选择二级分类，一级分类无法选择。"></warn>
        </FormItem>
        <FormItem label="练习名" prop="name">
          <template v-slot:label>标题</template>
          <input type="text" v-model="practice.name" />
        </FormItem>
        <FormItem label="封面" prop="thumb">
          <template v-slot:label>封面</template>
          <image-upload v-model="practice.thumb" name="封面"></image-upload>
        </FormItem>

        <FormItem label="免费" prop="is_free">
          <template v-slot:label>免费</template>
          <h-switch v-model="practice.is_free" :trueValue="1" :falseValue="0"></h-switch>
          <warn text="配置该选项的话所有人都可以参与考试。"></warn>
        </FormItem>
        <template v-if="practice.is_free === 0">
          <FormItem label="会员免费" prop="is_vip_free">
            <template v-slot:label>会员免费</template>
            <h-switch v-model="practice.is_vip_free" :trueValue="1" :falseValue="0"></h-switch>
            <warn text="配置该选项的话购买VIP会员的用户都可以参与考试。"></warn>
          </FormItem>

          <FormItem label="价格" prop="charge">
            <template v-slot:label>价格</template>
            <input type="number" v-model="practice.charge" />
            <warn text="价格大于0的话，用户可以购买此练习；价格等于0的话无法购买。"></warn>
          </FormItem>
        </template>

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
      practice: {
        category_id: null,
        name: null,
        thumb: null,
        is_free: null,
        is_vip_free: null,
        charge: null
      },
      rules: {
        required: ['category_id', 'name', 'thumb']
      },
      createParams: {},
      categories: []
    };
  },
  mounted() {
    this.init();

    this.practice.is_free = 0;
    this.practice.is_vip_free = 0;
  },
  methods: {
    init() {
      R.Extentions.paper.Practice.Create().then(res => {
        this.categories = res.data.categories;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Extentions.paper.Practice.Store(this.practice).then(resp => {
          HeyUI.$Message.success('添加成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
