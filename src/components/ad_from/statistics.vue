<style lang="less"></style>
<template>
  <div class>
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">数据统计</span>
      </div>
      <div class="h-panel-body">
        <p>
          <Button class="h-btn h-btn-primary" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>
        <div>
          <echart-line :data="data"></echart-line>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartLine from 'components/common/chartjs/line';
import EchartLine from 'components/common/echart/line';
import AdFrom from 'model/AdFrom';

export default {
  components: {
    ChartLine,
    EchartLine
  },
  props: ['id'],
  data() {
    return {
      adfrom: AdFrom.parse({}),
      data: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'line'
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      R.AdFrom.Number({ id: this.id }).then(resp => {
        this.adfrom = resp.data.ad;
        this.data.xAxis.data = resp.data.labels;
        this.data.series[0].data = resp.data.dataset;
      });
    },
    back() {
      this.$router.push({ name: 'AdFrom' });
    }
  }
};
</script>
