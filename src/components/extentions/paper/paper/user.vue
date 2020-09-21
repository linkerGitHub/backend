<template>
  <div class="h-panel w-800">
    <div class="h-panel-bar">
      <span class="h-panel-title">参与用户</span>
    </div>
    <div class="h-panel-body">
      <div class="float-box mb-10">
        <Form mode="block">
          <FormItem label="添加用户">
            <textarea v-model="mobiles" placeholder="一行一个手机号"></textarea>
          </FormItem>
          <FormItem>
            <p-button
              glass="h-btn h-btn-primary"
              permission="addons.Paper.paper.users.add"
              text="添加"
              @click="userAdd()"
            ></p-button>
            <a
              :href="'/backend/addons/Paper/paper/'+id+'/user/export?token='+token"
              target="_blank"
              class="h-btn h-primary"
            >导出学生成绩</a>
          </FormItem>
        </Form>
      </div>
      <div class="float-box mb-10">
        <Table ref="table" :loading="loading" :datas="datas">
          <TableItem title="用户">
            <template slot-scope="{ data }">
              <span>{{data.user.nick_name}}</span>
            </template>
          </TableItem>
          <TableItem title="分数">
            <template slot-scope="{ data }">
              <span>{{typeof userScores[data.user.id] === 'undefined' ? 0 : userScores[data.user.id]}}分</span>
            </template>
          </TableItem>
          <TableItem title="及格">
            <template slot-scope="{ data }">
              <span v-if="typeof userScores[data.user.id] === 'undefined'">否</span>
              <span v-else>{{userScores[data.user.id] >= passScore ? '是' : '否' }}</span>
            </template>
          </TableItem>
          <TableItem title="操作" align="center" :width="200">
            <template slot-scope="{ data }">
              <Poptip content="确认删除？" @confirm="remove(data)">
                <button class="h-btn h-btn-s h-btn-red">删除</button>
              </Poptip>
            </template>
          </TableItem>
        </Table>
      </div>

      <div class="float-box mb-10">
        <Pagination
          class="mt-10"
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
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      datas: [],
      loading: false,
      mobiles: [],
      userScores: {},
      token: '',
      passScore: 0
    };
  },
  mounted() {
    this.getData();
    this.token = Utils.getLocal('token');
  },
  methods: {
    changePage() {
      this.getData();
    },
    getData() {
      this.loading = true;
      let data = this.pagination;
      data.id = this.id;
      R.Extentions.paper.Paper.Users(this.pagination).then(resp => {
        this.datas = resp.data.data.data;
        this.pagination.total = resp.data.data.total;
        this.loading = false;
        this.userScores = resp.data.user_score;
        this.passScore = resp.data.pass_score;
      });
    },
    userAdd() {
      let mobiles = this.mobiles.split('\n');
      if (mobiles.length === 0) {
        this.$Message.error('请输入用户手机号');
        return;
      }
      R.Extentions.paper.Paper.UserAdd({ mobiles: mobiles, id: this.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    remove(item) {
      R.Extentions.paper.Paper.UserDel({ id: this.id, user_id: item.user_id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    }
  }
};
</script>
