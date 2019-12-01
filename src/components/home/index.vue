<template>
  <Row>
    <Cell :width="24">
      <div class="table-basic-vue frame-page h-panel">
        <div class="h-panel-bar"><span class="h-panel-title">首页</span></div>
        <div class="h-panel-body">
          <Row>
            <Cell class="text-center" :width="8">
              <h3>今日新用户注册</h3>
              <p>{{ index.today_register_user_count }}</p>
            </Cell>
            <Cell class="text-center" :width="8">
              <h3>今日已支付订单</h3>
              <p>{{ index.today_paid_num }}</p>
            </Cell>
            <Cell class="text-center" :width="8">
              <h3>今日已支付总额</h3>
              <p>{{ index.today_paid_sum }}</p>
            </Cell>
          </Row>
        </div>
      </div>
    </Cell>
    <Cell :width="24">
      <div class="table-basic-vue frame-page h-panel">
        <div class="h-panel-bar"><span class="h-panel-title">系统信息</span></div>
        <div class="h-panel-body">
          <p><b>MeEdu</b> 是基于 <b>Laravel+MySQL</b> 开发的开源免费在线教育系统。您可以自由的使用 <b>MeEdu</b> 而不必付费！</p>
          <p>源代码地址：<a href="https://github.com/Qsnh/meedu" target="_blank">https://github.com/Qsnh/meedu</a></p>
          <p>官网：<a href="https://meedu.vip/" target="_blank">https://meedu.vip</a></p>
        </div>
      </div>
    </Cell>
  </Row>
</template>
<script>
export default {
  data() {
    return {
      index: {
        today_register_user_count: 0,
        today_paid_num: 0,
        today_paid_sum: 0
      }
    };
  },
  methods: {
    init() {
      R.Dashboard.Index().then(resp => {
        this.index = resp.data;
      });
    }
  }
};
</script>
