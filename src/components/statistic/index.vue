<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">统计工具</span>
    </div>
    <div class="h-panel-body">
        <Button color="primary" @click="showPage('order')">订单统计</Button>
        <Button color="primary" @click="showPage('member')">会员注册统计</Button>
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
