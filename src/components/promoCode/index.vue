<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">优惠码</span></div>
    <div class="h-panel-body">
      <p>
        <Button color="blue" icon="h-icon-plus" @click="create()">添加</Button>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="code" title="优惠码"></TableItem>
        <TableItem prop="invited_user_reward" title="优惠金额" unit="元"></TableItem>
        <TableItem prop="invite_user_reward" title="所属用户奖励" unit="元"></TableItem>
        <TableItem prop="use_times" title="次数限制" unit="次"></TableItem>
        <TableItem prop="used_times" title="已使用次数" unit="次"></TableItem>
        <TableItem title="操作" align="center" :width="80">
          <template slot-scope="{ data }">
            <Poptip content="确认删除？" @confirm="remove(datas, data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination v-if="pagination.total > 0" align="right" v-model="pagination" @change="changePage" />
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
      R.PromoCode.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.pagination.page = resp.data.current_page;
        this.pagination.size = resp.data.per_page;
        this.loading = false;
      });
    },
    create() {
      this.$router.push({ name: 'PromoCodeCreate' });
    },
    remove(data, item) {
      R.PromoCode.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    }
  }
};
</script>
