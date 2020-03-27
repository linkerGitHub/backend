<style lang="less">
.list-box {
  width: 100%;
  height: auto;
  float: left;
}
.user-item {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
.avatar {
  border-radius: 16px;
}

.p {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 10px;
}
.bottom {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<template>
  <div style="padding: 30px">
    <div class="list-box">
      <div class="user-item" v-for="item in list" :key="item.id">
        <img :src="users[item.user_id].avatar" class="avatar" width="32" height="32" />
        <br />
        <span>{{users[item.user_id].nick_name}}</span>
      </div>
    </div>
    <div class="p">
      <Pagination v-if="pagination.total > 0" align="right" v-model="pagination" @change="changePage" />
    </div>
    <div class="bottom" style="text-align: right">
      <Button @click="close()">取消</Button>
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
        size: 50,
        total: 0
      },
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      let p = this.pagination;
      p.id = this.id;
      R.Course.SubscribeUsers(p).then(res => {
        this.list = res.data.data.data;
        this.users = res.data.users;
        this.pagination.total = res.data.data.total;
        this.pagination.page = res.data.data.current_page;
        this.pagination.size = res.data.data.per_page;
        this.loading = false;
      });
    },
    changePage() {
      this.pagination.page = 1;
      this.init();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>