<style lang="less"></style>
<template>
  <div class="">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar"><span class="h-panel-title">数据统计</span></div>
      <div class="h-panel-body">
        <p>
          <Button color="blue" icon="icon-arrow-left" @click="back()">返回列表</Button>
        </p>
        <div>
          <line-comp :data="data"></line-comp>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineComp from 'components/common/chartjs/line';
import AdFrom from 'model/AdFrom';

export default {
  components: {
    LineComp
  },
  props: ['id'],
  data() {
    return {
      adfrom: AdFrom.parse({}),
      data: {
        labels: [],
        datasets: [
          {
            label: '点击量',
            backgroundColor: '#f87979',
            data: []
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
        this.data.labels = resp.data.labels;
        this.data.datasets[0].data = resp.data.dataset;
      });
    },
    back() {
      this.$router.push({ name: 'AdFrom' });
    }
  }
};
</script>
