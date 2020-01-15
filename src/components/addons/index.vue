<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">插件</span></div>
    <div class="h-panel-body">
      <p><a href="https://meedu.vip/addons" target="_blank">插件商城</a></p>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="name" title="插件名"></TableItem>
        <TableItem prop="version" title="当前版本"></TableItem>
        <TableItem title="操作" align="center" :width="80">
          <template slot-scope="{ data }">
              <a v-if="typeof data.index_url !== 'undefined'" :href="data.index_url + '?token=' + token">配置</a>
          </template>
        </TableItem>
      </Table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datas: [],
      loading: false,
      token: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.token = Utils.getLocal('token');
      this.getData();
    },
    getData() {
      this.loading = true;
      R.Addons.index().then(resp => {
        this.datas = resp.data;
        this.loading = false;
      });
    }
  }
};
</script>
