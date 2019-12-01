<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">推广链接</span></div>
    <div class="h-panel-body">
      <p>
        <Button color="blue" icon="h-icon-plus" @click="create()">添加</Button>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem prop="from_name" title="Name"></TableItem>
        <TableItem prop="from_key" title="Key"></TableItem>
        <TableItem title="操作" align="center" :width="80">
          <template slot-scope="{ data }">
            <Poptip content="确认删除？" @confirm="remove(datas, data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
            <button class="h-btn h-btn-s h-btn-primary" @click="edit(data)">编辑</button>
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
      R.AdFrom.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.pagination.page = resp.data.current_page;
        this.pagination.size = resp.data.per_page;
        this.loading = false;
      });
    },
    create() {
      this.$router.push({ name: 'AdFromCreate' });
    },
    remove(data, item) {
      R.AdFrom.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    edit(item) {
      this.$router.push({ name: 'AdFromEdit', params: { id: item.id } });
    }
  }
};
</script>
