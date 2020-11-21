<template>
  <div class="home">
    <div class="box" id="main"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  mounted() {
    this.reqList();
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          //画图
          let myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品数量",
            },
            tooltip: {},
            legend: {
              data: ["子分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            // series 数据
            series: [
              {
                name: "子分类数量",
                type: "bar",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          };

          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
.box {
  width: 80%;
  margin: 40px 0 0 100px;
  height: 500px;
}
</style>