<template>
  <v-chart class="echart-line" :options="data" />
</template>
<style lang="css">
.echart-line {
  width: 100%;
  height: 300px;
}
</style>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';

export default {
  props: ['data'],
  components: {
    'v-chart': ECharts
  },
  data() {
    return {};
  }
};
</script>