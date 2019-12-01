<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">订单</span></div>
    <div class="h-panel-bar">
      <Form :labelWidth="110">
        <FormItem label="关键字搜索" prop="avatar">
          <input type="text" v-model="pagination.keywords" placeholder="用户昵称/手机号" />
        </FormItem>
        <FormItem label="状态" prop="avatar">
          <Select v-model="pagination.status" :datas="statusArr"></Select>
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="h-panel-body">
      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID"></TableItem>
        <TableItem prop="order_id" title="订单号"></TableItem>
        <TableItem prop="charge" title="价格" unit="元"></TableItem>
        <TableItem prop="created_at" title="时间"></TableItem>
        <TableItem prop="status_text" title="状态"></TableItem>
        <TableItem title="用户">
          <template slot-scope="{ data }">
            <Avatar :src="data.user.avatar" noInfo></Avatar>
            <p>昵称：{{ data.user.nick_name }}</p>
            <p>手机号：{{ data.user.mobile }}</p>
          </template>
        </TableItem>
        <TableItem title="订单信息">
          <template slot-scope="{ data }">
            <ul>
              <li v-for="goods in data.goods">{{ goods.goods_name }} | {{ goods.num }}</li>
            </ul>
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
        total: 0,
        keywords: '',
        status: ''
      },
      statusArr: [
        {
          title: '未支付',
          key: 1
        },
        {
          title: '支付中',
          key: 5
        },
        {
          title: '已支付',
          key: 9
        },
        {
          title: '已取消',
          key: 7
        }
      ],
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
      R.Order.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.pagination.page = resp.data.current_page;
        this.pagination.size = resp.data.per_page;
        this.loading = false;
      });
    }
  }
};
</script>
