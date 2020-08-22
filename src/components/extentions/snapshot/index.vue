<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">照片</span>
    </div>
    <div class="h-panel-body">
      <Form :labelWidth="110" class="mb-10">
        <FormItem label="会员">
          <template v-slot:label>资源类型</template>
          <Select
            v-model="filter.type"
            :filterable="true"
            :datas="typeRows"
            keyName="id"
            titleName="name"
          ></Select>
        </FormItem>
        <FormItem label="用户id">
          <input type="number" v-model="filter.user_id" placeholder="用户id" />
        </FormItem>
        <FormItem label="资源id">
          <input type="number" v-model="filter.other_id" placeholder="视频id,电子书id,试卷id,练习id,直播课程id" />
        </FormItem>
        <FormItem>
          <Button color="primary" @click="getData(true)">搜索</Button>
          <Button @click="reset">重置</Button>
        </FormItem>
      </Form>

      <Table :loading="loading" :datas="datas">
        <TableItem prop="id" title="ID" :width="80"></TableItem>
        <TableItem prop="user_id" title="用户ID" :width="80"></TableItem>
        <TableItem prop="other_id" title="资源ID" :width="80"></TableItem>
        <TableItem prop="type_text" title="类型" :width="80"></TableItem>
        <TableItem prop="type_title" title="资源"></TableItem>
        <TableItem title="用户" :width="100">
          <template slot-scope="{ data }">
            <span>{{data.user.nick_name}}</span>
          </template>
        </TableItem>
        <TableItem prop="count" title="照片" :width="50"></TableItem>
        <TableItem prop="last_snap_at" title="最后拍照时间" :width="100"></TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <Button color="primary" @click="see(data)">查看照片</Button>
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
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      filter: {
        type: '',
        user_id: null,
        other_id: null
      },
      typeRows: [
        {
          id: 'vod',
          name: '视频'
        },
        {
          id: 'live',
          name: '直播课程'
        },
        {
          id: 'book',
          name: '电子书'
        },
        {
          id: 'paper',
          name: '考试'
        },
        {
          id: 'practice',
          name: '练习'
        }
      ],
      datas: [],
      loading: false
    };
  },
  mounted() {
    this.getData(true);
  },
  methods: {
    changePage() {
      this.getData();
    },
    reset() {
      this.filter.user_id = null;
      this.filter.other_id = null;
      this.filter.type = null;
      this.getData(true);
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      let data = this.pagination;
      data.user_id = this.filter.user_id;
      data.other_id = this.filter.other_id;
      data.type = this.filter.type;
      R.Extentions.Snapshot.Images.Index(data).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.loading = false;
      });
    },
    see(item) {
      if (!item.images) {
        HeyUI.$Message.warn('暂无照片');
        return;
      }
      let images = [];
      item.images.forEach(item => {
        images.push(item.thumb);
      });

      this.$ImagePreview(images, 0);
    }
  }
};
</script>
