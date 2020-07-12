<template>
  <div class="table-basic-vue frame-page h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">电子书评论</span>
    </div>
    <div class="h-panel-body">
      <div style="mb-10">
        <p-del-button
          permission="addons.meedu_books.book.comments.checked"
          @click="commentChecked(1)"
          text="审核通过"
        ></p-del-button>
        <p-del-button
          permission="addons.meedu_books.book.comments.checked"
          @click="commentChecked(0)"
          text="审核拒绝"
        ></p-del-button>
      </div>

      <Table :loading="loading" :datas="datas" :checkbox="true" ref="table">
        <TableItem title="ID" prop="id" :width="80"></TableItem>
        <TableItem title="用户">
          <template slot-scope="{data}">
            <span>{{data.user.nick_name}}</span>
          </template>
        </TableItem>
        <TableItem title="评论内容">
          <template slot-scope="{data}">
            <div v-html="data.content"></div>
          </template>
        </TableItem>
        <TableItem prop="created_at" title="时间"></TableItem>
        <TableItem title="状态">
          <template slot-scope="{data}">
            <span v-if="data.is_check === 1">通过</span>
            <span v-else class="red">拒绝</span>
          </template>
        </TableItem>
        <TableItem title="操作" align="center" :width="100">
          <template slot-scope="{ data }">
            <p-del-button
              permission="addons.meedu_books.book.comments.delete"
              @click="remove(datas, data)"
            ></p-del-button>
          </template>
        </TableItem>
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
  props: ['bid'],
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0,
        bid: this.bid
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
      R.Extentions.meeduBooks.BookComment.Index(this.pagination).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.pagination.page = resp.data.data.current_page;
        this.pagination.size = resp.data.data.per_page;
        this.loading = false;
      });
    },
    remove(data, item) {
      R.Extentions.meeduBooks.BookComment.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    },
    commentChecked(status) {
      let items = this.$refs.table.getSelection();
      if (items.length === 0) {
        this.$Message.error('请选择需要操作的数据');
        return;
      }
      this.loading = true;
      let ids = [];
      for (let i = 0; i < items.length; i++) {
        ids.push(items[i].id);
      }
      R.Extentions.meeduBooks.BookComment.Checked({ ids: ids, is_check: status }).then(() => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    }
  }
};
</script>
