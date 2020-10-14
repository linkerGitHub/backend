<style lang="less"></style>
<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
    </div>
    <div class="h-panel-body">
      <Form mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="80" :rules="rules" :model="nav">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="上级" prop="parent_id">
              <Select v-model="nav.parent_id" :datas="availableParents" keyName="id" titleName="name"></Select>
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="升序" prop="sort">
              <input type="number" v-model="nav.sort" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="链接名" prop="name">
              <input type="text" v-model="nav.name" />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="链接地址" prop="url">
              <input type="text" v-model="nav.url" />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="Active" prop="active_routes">
              <input type="text" v-model="nav.active_routes" />
              <warn text="不清楚可不填写"></warn>
            </FormItem>
          </Cell>
        </Row>

        <FormItem>
          <Button color="primary" @click="create">保存</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import Nav from 'model/Nav';

export default {
  props: ['id'],
  data() {
    return {
      nav: Nav.parse({}),
      cateLayers: {
        0: [],
        1: [],
        2: []
      },
      rules: {
        required: ['sort', 'name', 'url']
      },
      parentLayer: 0
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    availableParents() {
      const ret = []
    }
  },
  methods: {
    init() {
      R.SpecialProject.FindBy({
        layer_count: this.parentLayer
      }).then(res => {
        res.data.forEach(p => {
          if (this.cateLayers[p.layer_count]) {
            this.cateLayers[p.layer_count].push(p);
          } else {
            this.cateLayers[p.layer_count] = [p];
          }
        });
      });

      R.SpecialProject.Edit({ id: this.id }).then(resp => {
        this.nav = resp.data;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.Nav.Update(this.nav).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
