<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">邀请余额提现</span></div>
    <div class="h-panel-body">
      <button class="h-btn mb-10" @click="multiHandle()">批量操作</button>
      <Table ref="table" :loading="loading" :datas="datas" :border="true" :checkbox="true" :selectWhenClickTr="true">
        <TableItem align="center" title="头像">
          <template slot-scope="{ data }">
            <Avatar :src="users[data.user_id].avatar" noInfo></Avatar> <br />
            {{ users[data.user_id].nick_name }}
          </template>
        </TableItem>
        <TableItem align="center" prop="total" title="提现金额" unit="元"></TableItem>
        <TableItem align="center" prop="channel" title="渠道"></TableItem>
        <TableItem align="center" prop="channel_name" title="渠道姓名"></TableItem>
        <TableItem align="center" prop="channel_account" title="渠道账号"></TableItem>
        <TableItem align="center" prop="status_text" title="状态"></TableItem>
        <TableItem align="center" prop="created_at" title="创建时间"></TableItem>
        <TableItem align="center" prop="remark" title="备注"></TableItem>
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
        total: 0,
        keywords: ''
      },
      datas: [],
      users: [],
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
      R.Member.InviteBalanceWithdrawOrders(this.pagination).then(resp => {
        this.datas = resp.data.orders.data;
        for (let i = 0; i < this.datas.length; i++) {
          this.datas[i]._disabledSelect = this.datas[i].status !== 0;
        }
        this.users = resp.data.users;
        this.pagination.total = resp.data.orders.total;
        this.pagination.page = resp.data.orders.current_page;
        this.pagination.size = resp.data.orders.per_page;
        this.loading = false;
      });
    },
    multiHandle() {
      let selectedRows = this.$refs.table.getSelection();
      if (selectedRows.length == 0) {
        return;
      }
      let ids = [];
      for (var i = 0; i < selectedRows.length; i++) {
        ids.push(selectedRows[i].id);
      }

      this.$Modal({
        component: {
          vue: resolve => {
            require(['./children/InviteBalanceHandle'], resolve);
          }
        },
        events: {
          success: (modal, data) => {
            R.Member.CreateInviteBalanceWithdrawOrder({ ids: ids, status: data.status, remark: data.remark }).then(resp => {
              HeyUI.$Message.success('添加成功');
              this.getData();
            });
          }
        }
      });
    }
  }
};
</script>
