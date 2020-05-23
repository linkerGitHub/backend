<template>
  <div class="h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">课程《{{ course.title }}》</span>
    </div>
    <div class="h-panel-body">
      <div class="mb-10">
        <Button class="h-btn h-btn-primary" icon="h-icon-plus" @click="create()">添加章节</Button>
        <Button @click="close()">取消</Button>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem :width="70" prop="sort" title="升序"></TableItem>
        <TableItem :witdth="400" prop="title" title="章节名"></TableItem>
        <TableItem title="操作" align="center" :width="200">
          <template slot-scope="{ data }">
            <Poptip content="确认删除？" @confirm="remove(datas, data)">
              <button class="h-btn h-btn-s h-btn-red">删除</button>
            </Poptip>
            <button class="h-btn h-btn-s h-btn-primary" @click="edit(data)">编辑</button>
          </template>
        </TableItem>
      </Table>
    </div>
  </div>
</template>
<script>
export default {
  props: ['cid'],
  data() {
    return {
      datas: [],
      course: {
        id: 0,
        title: ''
      },
      loading: false
    };
  },
  mounted() {
    this.course.id = this.cid;
    this.init();
  },
  methods: {
    init() {
      this.getData(true);
    },
    getData(reload = false) {
      this.loading = true;
      R.CourseChapter.List({ course_id: this.course.id }).then(resp => {
        this.loading = false;
        this.datas = resp.data.chapters;
        this.course.title = resp.data.course.title;
      });
    },
    create() {
      this.$Modal({
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./create'], resolve);
          },
          datas: {
            cid: this.course.id
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            R.CourseChapter.Create(data).then(resp => {
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    remove(data, item) {
      R.CourseChapter.Delete({ course_id: this.course.id, id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData(true);
      });
    },
    edit(item) {
      this.$Modal({
        closeOnMask: false,
        component: {
          vue: resolve => {
            require(['./edit'], resolve);
          },
          datas: {
            id: item.id,
            cid: this.course.id
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            R.CourseChapter.Update(data).then(resp => {
              HeyUI.$Message.success('成功');
              this.getData(true);
            });
          }
        }
      });
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
