<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">用户</span></div>
    <div class="h-panel-body">
        <p>
        <Button color="blue" icon="h-icon-plus" @click="create()">添加</Button>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem title="头像">
            <template slot-scope="{data}">
                <Avatar type="female" :src="data.avatar" noInfo></Avatar>
            </template>
        </TableItem>
        <TableItem prop="nick_name" title="昵称"></TableItem>
        <TableItem prop="mobile" title="手机号"></TableItem>
        <TableItem prop="created_at" title="注册时间"></TableItem>
        <TableItem title="激活">
            <template slot-scope="{data}">
                <span v-if="data.is_active === 1">是</span>
                <span v-else>否</span>
            </template>
        </TableItem>
        <TableItem title="锁定">
            <template slot-scope="{data}">
                <span v-if="data.is_lock === 1">是</span>
                <span v-else>否</span>
            </template>
        </TableItem>
        <TableItem title="VIP">
            <template slot-scope="{data}">
                <template v-if="data.role">
                    <span>{{data.role.name}}</span><br>
                    <span>{{data.role_expired_at}}</span>
                </template>
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
      R.Member.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.pagination.page = resp.data.current_page;
        this.pagination.size = resp.data.per_page;
        this.loading = false;
      });
    },
    create() {
      this.$router.push({ name: 'MemberCreate' });
    },
  }
};
</script>
