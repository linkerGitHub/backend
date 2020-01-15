<template>
  <div style="padding: 15px;">
    <Form ref="form" :validOnChange="true" :showErrorTip="true" mode="block" :rules="rules" :model="form">
      <FormItem label="状态" prop="status">
        <Select v-model="form.status" :datas="statusRows" keyName="id" titleName="name"></Select>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <textarea v-model="form.remark"></textarea>
      </FormItem>
      <FormItem>
        <Button color="primary" @click="confirm">确定</Button>
        <Button color="default" @click="cancel">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        remark: '',
        status: 1
      },
      statusRows: [
        {
          id: 1,
          name: '提现成功'
        },
        {
          id: 2,
          name: '提现失败'
        }
      ],
      rules: {
        required: ['name', 'remark']
      }
    };
  },
  methods: {
    confirm() {
      let validResult = this.$refs.form.valid();
      if (!validResult.result) {
        return;
      }
      this.$emit('success', {
        status: this.form.status,
        remark: this.form.remark
      });
      this.close();
    },
    cancel() {
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
