<style lang="less"></style>
<template>
  <div style="width: 700px;">
    <div class="table-basic-vue frame-page h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">每日课程观看时长</span>
      </div>
      <div class="h-panel-body">
        <Form :labelWidth="110">
          <FormItem label="课程" prop="course_id">
            <template v-slot:label>课程</template>
            <Select v-model="course_id" :datas="courses" keyName="id" titleName="title" :filterable="true"></Select>
          </FormItem>
          <FormItem label="时间范围">
            <DateRangePicker v-model="daterange"></DateRangePicker>
          </FormItem>
          <FormItem>
            <Button color="primary" @click="getData(true)">过滤</Button>
            <Button @click="close">关闭</Button>
          </FormItem>
        </Form>
        <div>
          <line-chart :height="200" :chart-data="data"></line-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from 'components/common/chartjs/line';

export default {
  components: {
    LineChart
  },
  props: ['id'],
  data() {
    return {
      data: {},
      daterange: {
        start: null,
        end: null
      },
      course_id: null,
      courses: []
    };
  },
  mounted() {
    R.Course.All().then(res => {
      this.courses = res.data.data;
    });
    this.getData();
  },
  methods: {
    getData() {
      let data = {};
      if (this.daterange.start) {
        data.start_at = this.daterange.start;
      }
      if (this.daterange.end) {
        data.end_at = this.daterange.end;
      }
      data.course_id = this.course_id;
      R.Statistic.courseWatchDuration(data).then(resp => {
        let data = {
          labels: resp.data.labels,
          datasets: [
            {
              label: '时长(时)',
              data: resp.data.dataset
            }
          ]
        };
        this.data = data;
      });
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
