<style lang="less"></style>
<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">编辑</span>
    </div>
    <div class="h-panel-body">
      <Form mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="80" :rules="rules" :model="cate">
        <Row :space="10">
          <Cell :width="6">
            <FormItem label="上级" prop="parent_id">
              <Select v-model="cate.parent_id" @change="cate.layer_count = $event.layer_count + 1" :datas="availableParents" keyName="id" titleName="name"></Select>
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="升序" prop="sort">
              <input type="number" v-model="cate.sort" />
            </FormItem>
          </Cell>
          <Cell :width="6">
            <FormItem label="分类名称" prop="name">
              <input type="text" v-model="cate.name" />
            </FormItem>
          </Cell>
        </Row>

        <Row :space="10">
          <Cell>
            <FormItem label="课程" prop="courses">
              <Select multiple v-model="cate.courses" :datas="courseSrc" keyName="id" titleName="title"></Select>
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
export default {
  props: ['id'],
  data() {
    return {
      courseSrc: [],
      cate: {
        sort: 0,
        name: '',
        parent_id: 0,
        courses: []
      },
      cateLayers: {
        0: [],
        1: [],
        2: []
      },
      flatCateLayers: {},
      rules: {
        required: ['sort', 'name', 'parent_id']
      },
      parentLayer: 0
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    availableParents() {
      let ret = [
        {
          id: 0,
          layer_count: -1,
          name: '无'
        }
      ];
      if (this.cate && this.cate.layer_count) {
        for (let i = 0; i < this.cate.layer_count; i++) {
          ret = ret.concat(this.cateLayers[i]);
        }
      }
      return ret;
    }
  },
  methods: {
    init() {
      R.SpecialProject.FindBy().then(res => {
        res.data.forEach(p => {
          this.flatCateLayers[p.id] = p;
          if (this.cateLayers[p.layer_count]) {
            this.cateLayers[p.layer_count].push(p);
          } else {
            this.cateLayers[p.layer_count] = [p];
          }
        });
      });

      R.SpecialProject.Edit({ id: this.id }).then(resp => {
        this.cate = resp.data;
        this.cate.courses = this.cate.courses.map(c => c.id);
      });

      R.Course.All().then(res => {
        this.courseSrc = res.data.data;
      });
    },
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.SpecialProject.Update(this.cate).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
