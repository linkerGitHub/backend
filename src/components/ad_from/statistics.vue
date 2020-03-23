<style lang="less"></style>
<template>
  <div style="width: 700px;">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">数据统计</span>
      </div>
      <div class="h-panel-body">
        <div>
          <line-chart :height="200" :chart-data="data"></line-chart>
        </div>
        <div class="mt-10">
          <Button @click="close">关闭</Button>
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
      adfrom: null,
      data: null
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
          labels: resp.data.labels,
          datasets: [
            {
              label: '统计',
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
