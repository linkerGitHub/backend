<script>
import { Line, mixins } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>