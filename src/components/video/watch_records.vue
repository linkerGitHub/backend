<template>
  <div class="table-basic-vue frame-page h-panel h-panel-margin-0 w-1000">
    <div class="h-panel-bar">
      <span class="h-panel-title">观看记录</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <Form>
          <Row :space="10">
            <Cell :width="6">
              <FormItem label="UID">
                <input type="text" v-model="filter.user_id" placeholder="用户ID" />
              </FormItem>
            </Cell>
            <Cell :width="10">
              <FormItem label="看完时间">
                <DateRangePicker v-model="dateRange" format="YYYY-MM-DD"></DateRangePicker>
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem>
                <Button class="h-btn h-btn-primary" @click="getData(true)">搜索</Button>
                <Button class="h-btn" @click="reset()">重置</Button>
              </FormItem>
            </Cell>
          </Row>
        </Form>
      </div>
      <Table :loading="loading" :datas="list">
        <TableItem title="VID" prop="video_id" :width="80"></TableItem>
        <TableItem title="UID" prop="user_id" :width="80"></TableItem>
        <TableItem title="用户" :width="120">
          <template slot-scope="{ data }">
            <span
              v-if="typeof users[data.user_id] !== 'undefined'"
            >{{users[data.user_id].nick_name}}</span>
            <span v-else class="red">已删除</span>
          </template>
        </TableItem>
        <TableItem title="观看">
          <template slot-scope="{ data }">
            <span>{{data.watch_seconds}}s</span>
          </template>
        </TableItem>
        <TableItem title="开始时间">
          <template slot-scope="{ data }">
            <span>{{data.created_at}}</span>
          </template>
        </TableItem>
        <TableItem title="看完时间">
          <template slot-scope="{ data }">
            <span v-if="data.watched_at">{{data.watched_at}}</span>
            <span v-else class="red">未看完</span>
          </template>
        </TableItem>
      </Table>

      <div class="mt-10">
        <Pagination
          v-if="pagination.total > 0"
          align="right"
          v-model="pagination"
          @change="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      list: [],
      users: [],
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      filter: {
        user_id: null,
        watched_start_at: null,
        watched_end_at: null
      },
      dateRange: {}
    };
  },
  mounted() {
    this.getData(true);
  },
  watch: {
    dateRange() {
      this.filter.watched_start_at = this.dateRange.start;
      this.filter.watched_end_at = this.dateRange.end;
    }
  },
  methods: {
    reset() {
      this.filter.user_id = null;
      this.filter.watched_start_at = null;
      this.filter.watched_end_at = null;
      this.dateRange = {};
      this.getData(true);
    },
    getData(reset = false) {
      if (reset) {
        this.pagination.page = 1;
      }

      this.loading = true;
      let data = this.pagination;
      data.video_id = this.id;
      Object.assign(data, this.filter);
      R.Video.WatchRecords(data).then(res => {
        this.list = res.data.data.data;
        this.users = res.data.users;
        this.pagination.total = res.data.data.total;
        this.loading = false;
      });
    },
    changePage() {
      this.getData();
    }
  }
};
</script>
