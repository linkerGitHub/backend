<style lang="less"></style>
<template>
  <div class="h-panel w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">添加</span>
    </div>
    <div class="h-panel-body">
      <Form mode="block" ref="form" :validOnChange="true" :showErrorTip="true" :labelWidth="80" :rules="rules" :model="nav">
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
      courseSrc: [],
      cate: {
        sort: 0,
        name: '',
        parent_id: 0,
        courses: [],
        layer_count: 0
      },
      cateLayers: {
        0: [],
        1: [],
        2: []
      },
      flatCateLayers: {},
      rules: {
        required: ['sort', 'name', 'parent_id']
      }
    };
  },
  mounted() {
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

    R.Course.All().then(res => {
      this.courseSrc = res.data.data;
    });
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
      for (let i = 0; i < 2; i++) {
        ret = ret.concat(this.cateLayers[i]);
      }
      return ret;
    }
  },
  methods: {
    create() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.SpecialProject.Store(this.cate).then(resp => {
          HeyUI.$Message.success('成功');
          this.$emit('success');
        });
      }
    }
  }
};
</script>
