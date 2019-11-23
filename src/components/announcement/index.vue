
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">公告</span></div>
    <div class="h-panel-body">
      <p>
        <Button color="blue" icon="h-icon-plus" @click="create()">添加</Button>
      </p>
      <Table :loading="loading" :datas="datas">
        <TableItem :width="200" :render="administratorRender" title="添加人"></TableItem>
        <TableItem :width="200" prop="updated_at" title="最后编辑时间"></TableItem>
        <TableItem title="操作" align="center" :width="80">
          <template slot-scope="{data}">
            <Poptip content="确认删除？" @confirm="remove(datas, data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
            <button class="h-btn h-btn-s h-btn-primary" @click="edit(data)">编辑</button>
            <button class="h-btn h-btn-s" @click="showContent(data)">查看内容</button>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination v-if="pagination.total>0"  align="right" v-model="pagination" @change="changePage" />
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
      this.getData(true);
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      R.Announcement.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.pagination.page = resp.data.current_page;
        this.pagination.size = resp.data.per_page;
        this.loading = false;
      });
    },
    create() {
      this.$router.push({name: 'AnnouncementCreate'});
    },
    administratorRender(item) {
      if (!item.administrator) {
        return '';
      }
      return item.administrator.name;
    },
    remove(data, item) {
      R.Announcement.Delete({id: item.id}).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      })
    },
    edit(item) {
      this.$router.push({name: 'AnnouncementEdit', params: {id: item.id}});
    },
    showContent(data) {
      this.$Modal({
        title: '公告内容',
        content: data.announcement,
      });
    }
  }
};
</script>
