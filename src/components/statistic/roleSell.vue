<style lang="less"></style>
<template>
  <div style="width: 700px;">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">会员每日销售数量</span>
      </div>
      <div class="h-panel-body">
        <Form :labelWidth="110">
          <FormItem>
            <template v-slot:label>会员</template>
            <Select v-model="role_id" :datas="roles" keyName="id" titleName="name" :filterable="true"></Select>
          </FormItem>
          <FormItem label="时间范围">
            <DateRangePicker v-model="daterange"></DateRangePicker>
          </FormItem>
          <FormItem>
            <Button color="primary" @click="getData(true)">过滤</Button>
            <Button @click="close">关闭</Button>
          </FormItem>
        </Form>
        <div>
          <line-chart :height="200" :chart-data="data"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from 'components/common/chartjs/line';

export default {
  components: {
    LineChart
  },
  props: ['id'],
  data() {
    return {
      data: {},
      daterange: {
        start: null,
        end: null
      },
      role_id: null,
      roles: []
    };
  },
  mounted() {
    R.Role.All().then(res => {
      this.roles = res.data.data;
    });
    this.getData();
  },
  methods: {
    getData() {
      let data = {};
      if (this.daterange.start !== null) {
        data.start_at = this.daterange.start;
      }
      if (this.daterange.end !== null) {
        data.end_at = this.daterange.end;
      }
      data.role_id = this.role_id;
      R.Statistic.roleSell(data).then(resp => {
        let data = {
          labels: resp.data.labels,
          datasets: [
            {
              label: '销量',
              data: resp.data.dataset
            }
          ]
        };
        this.data = data;
      });
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
