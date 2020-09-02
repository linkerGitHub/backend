<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">用户</span>
    </div>
    <div class="h-panel-body">
      <div class="float-box mb-10">
        <Form>
          <Row :space="10">
            <Cell :width="6">
              <FormItem label="搜索">
                <input type="text" v-model="cond.keywords" placeholder="用户昵称/手机号" />
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem label="会员">
                <template v-slot:label>会员</template>
                <Select
                  v-model="cond.role_id"
                  :filterable="true"
                  :datas="roles"
                  keyName="id"
                  titleName="name"
                ></Select>
              </FormItem>
            </Cell>
            <Cell :width="6">
              <FormItem>
                <Button color="primary" @click="getData(true)">搜索</Button>
                <Button @click="reset">重置</Button>
              </FormItem>
            </Cell>
          </Row>
        </Form>
      </div>
      <div class="float-box mb-10">
        <p-button
          glass="h-btn h-btn-primary h-btn-s"
          icon="h-icon-plus"
          permission="member.store"
          text="添加"
          @click="create()"
        ></p-button>
      </div>
      <div class="float-box mb-10">
        <Table :loading="loading" :datas="datas" @sort="sortEvt">
          <TableItem prop="id" title="ID" :sort="true" :width="80"></TableItem>
          <TableItem prop="nick_name" title="昵称" :width="120"></TableItem>
          <TableItem prop="mobile" title="手机号" :width="150"></TableItem>
          <TableItem prop="credit1" title="积分" :sort="true" :width="80"></TableItem>
          <TableItem prop="created_at" title="注册时间" :sort="true" :width="120"></TableItem>
          <TableItem title="VIP" :width="100">
            <template slot-scope="{data}">
              <template v-if="data.role">{{data.role.name}}</template>
            </template>
          </TableItem>
          <TableItem title="操作" align="center" :width="160">
            <template slot-scope="{ data }">
              <p-button
                glass="h-btn h-btn-s h-btn-primary"
                permission="member.edit"
                text="编辑"
                @click="edit(data)"
              ></p-button>
              <p-button
                glass="h-btn h-btn-s"
                permission="member.detail"
                text="详情"
                @click="detail(data)"
              ></p-button>
            </template>
          </TableItem>
        </Table>
      </div>
      <div class="float-box mb-10">
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
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      cond: {
        keywords: '',
        role_id: null,
        sort: 'created_at',
        order: 'desc'
      },
      datas: [],
      loading: false,
      roles: []
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
    reset() {
      this.cond.keywords = '';
      this.cond.role_id = null;
      this.getData(true);
    },
    sortEvt(sort) {
      this.cond.sort = sort.prop;
      this.cond.order = sort.type;
      this.getData();
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      let cond = Object.assign(this.cond, this.pagination);
      R.Member.List(cond).then(resp => {
        this.datas = resp.data.members.data;
        this.pagination.total = resp.data.members.total;
        this.loading = false;
        this.roles = resp.data.roles;
      });
    },
    create() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./create'], resolve);
          }
        },
        events: {
          success: (modal, data) => {
            R.Member.Store(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    edit(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./edit'], resolve);
          },
          datas: {
            id: item.id
          }
        },
        events: {
          success: (modal, data) => {
            R.Member.Update(data).then(resp => {
              modal.close();
              HeyUI.$Message.success('成功');
              this.getData();
            });
          }
        }
      });
    },
    detail(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./detail'], resolve);
          },
          datas: {
            id: item.id
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            this.getData();
          }
        }
      });
    }
  }
};
</script>
