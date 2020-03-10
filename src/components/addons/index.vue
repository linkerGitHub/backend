<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">插件</span>
    </div>
    <div class="h-panel-body">
      <p>
        <a href="https://meedu.vip/addons" class="h-btn h-btn-primary" target="_blank">插件商城</a>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="name" title="插件名"></TableItem>
        <TableItem prop="version" title="当前版本"></TableItem>
        <TableItem title="启用" align="center">
          <template slot-scope="{ data }">
            <h-switch v-model="data.enabled" :small="true" @change="switchHandler(data)"></h-switch>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="80">
          <template slot-scope="{ data }">
            <a v-if="data.enabled && typeof data.index_url !== 'undefined'" :href="data.index_url + '?token=' + token">配置</a>
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
    },
    switchHandler(item) {
      let action = '';
      if (item.enabled) {
        action = 'enabled';
      } else {
        action = 'disabled';
      }
      this.loading = true;
      R.Addons.switchHandler({
        action: action,
        sign: item.sign
      }).then(resp => {
        this.getData();
      });
    }
  }
};
</script>
