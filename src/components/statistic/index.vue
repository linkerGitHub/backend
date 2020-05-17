<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">统计工具</span>
    </div>
    <div class="h-panel-body">
        <Button color="primary" @click="showPage('order')">每日订单创建量统计</Button>
        <Button color="primary" @click="showPage('member')">每日会员注册统计</Button>
        <Button color="primary" @click="showPage('orderPaidCount')">每日已支付订单数</Button>
        <Button color="primary" @click="showPage('orderPaidSum')">每日订单支付总额</Button>
        <Button color="primary" @click="showPage('courseSell')">课程每日销售数量</Button>
        <Button color="primary" @click="showPage('roleSell')">会员每日销售数量</Button>
        <Button color="primary" @click="showPage('courseWatchDuration')">每日课程观看时长</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      datas: [],
      loading: false
    };
  },
  methods: {
    showPage(page) {
      this.$Modal({
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./' + page], resolve);
          }
        }
      });
    }
  }
};
</script>
