<style lang="less"></style>
<template>
  <div style="width: 700px;">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">数据统计</span>
      </div>
      <div class="h-panel-body">
        <div>
          <echart-line :data="data"></echart-line>
        </div>
        <div>
          <Button @click="close">关闭</Button>
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
      adfrom: {},
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
        let data = {
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
        };
        data.xAxis.data = resp.data.labels;
        data.series[0].data = resp.data.dataset;
        this.data = data;
      });
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
