<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.go(-1)" />
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // const { BMapGL } = window
    // var map = new BMapGL.Map("container");
    // // 创建地图实例
    // var point = new BMapGL.Point(116.404, 39.915);
    // // 创建点坐标
    // map.centerAndZoom(point, 15);
    // // 初始化地图，设置中心点坐标和地图级别
    const { BMapGL } = window
    const myCity = new BMapGL.LocalCity()// 获取当前电脑所在的城市
    myCity.get(function (result) {
      console.log(result)// 杭州
      const map = new BMapGL.Map('container')
      const point = new BMapGL.Point(result.center.lng, result.center.lat)// 绘制地图
      map.centerAndZoom(point, 15)// 根据某城市的中心点绘制图 15是缩放级别

      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

      // 每个区在区的中心点画一个标记
      const point1 = new BMapGL.Point(116.449979, 39.912338)// 经纬度在接口中通过城市名字获取
      const content = '西湖'
      const label = new BMapGL.Label(content, { // 创建文本标注
        position: point1,
        offset: new BMapGL.Size(10, 20)
      })
      map.addOverlay(label) // 将标注添加到地图中
      label.setStyle({ // 设置label的样式
        color: '#fff',
        fontSize: '14px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'pink',
        textAlign: 'center',
        lineHeight: '40px'
      })

      label.addEventListener('click', function () {
        map.centerAndZoom(point1, 18)
      })
    })
  }
}
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
#container {
  width: 100vw;
  height: 90vh;
}
</style>
