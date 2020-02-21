<template>
  <div style="padding: 15px;">
    <Form v-width="400" mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :rules="rules" :model="adfrom">
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
        <Button @click="cancel">取消</Button>
      </FormItem>
    </Form>
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
    this.init(
      R.AdFrom.Edit({ id: this.id }).then(res => {
        this.adfrom = res.data;
      })
    );
  },
  methods: {
    init() {},
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$emit('success', this.adfrom);
        this.close();
      }
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
