<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">订单</span>
    </div>
    <div class="h-panel-body">
      <Table :loading="loading" :datas="datas">
        <TableItem title="用户ID" props="user_id"></TableItem>
        <TableItem title="用户">
          <template slot-scope="{data}">
            <span>{{data.user.nick_name}}</span>
          </template>
        </TableItem>
        <TableItem prop="charge" title="购买价格" unit="元"></TableItem>
      </Table>

      <Pagination
        class="mt-10"
        v-if="pagination.total > 0"
        align="right"
        v-model="pagination"
        @change="changePage"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      datas: [],
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData(true);
    },
    changePage() {
      this.getData();
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      let data = this.pagination;
      data.topic_id = this.id;
      R.Extentions.meeduTopics.Order.Index(data).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.loading = false;
      });
    }
  }
};
</script>
