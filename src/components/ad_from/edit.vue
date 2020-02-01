<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">编辑推广链接</span></div>
      <div class="h-panel-body">
        <p>
          <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>

        <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="110" :rules="rules" :model="adfrom">
          <FormItem label="Name" prop="from_name">
            <template v-slot:label>Name</template>
            <input type="text" v-model="adfrom.from_name" />
          </FormItem>
          <FormItem label="Key" prop="from_key">
            <template v-slot:label>Key</template>
            <input type="text" v-model="adfrom.from_key" />
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
import AdFrom from 'model/AdFrom';

export default {
  props: ['id'],
  data() {
    return {
      adfrom: AdFrom.parse({}),
      rules: {
        required: ['from_name', 'from_key']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.AdFrom.Edit({ id: this.id }).then(resp => {
        this.adfrom = resp.data;
      });
    },
    back() {
      this.$router.push({ name: 'AdFrom' });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.AdFrom.Update(this.adfrom).then(resp => {
          HeyUI.$Message.success('成功');
          this.$router.push({ name: 'AdFrom' });
        });
      }
    }
  }
};
</script>
