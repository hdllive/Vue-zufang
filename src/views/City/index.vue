<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.go(-1)" />

    <!-- 当前城市 -->
    <van-index-bar>
      <van-index-anchor index="1">当前城市</van-index-anchor>
      <van-cell :title="$store.state.nowCity" />
    </van-index-bar>

    <!-- 热门城市 -->
    <van-index-bar>
      <van-index-anchor index="1">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="(item, index) in hotCityList"
        :key="index"
        @click="changeCity(item)"
      />
    </van-index-bar>

    <!-- 其余城市 -->
    <van-index-bar :sticky="false" highlight-color="#21b97a">
      <van-index-anchor
        :index="index"
        v-for="(item, index) in cityList"
        :key="index"
      >
        {{ index }}
        <van-cell
          :title="item1.label"
          v-for="(item1, index1) in item"
          :key="index1"
          @click="$toast.fail('该城市暂无数据')"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityList, gethotCityList } from '@/api/home'
export default {
  name: 'City',
  created () {
    this.gethotCityList()
    this.getCityList()
  },
  data () {
    return {
      indexList: [],
      indexhotList: ['#', '热'],
      hotCityList: [],
      cityList: []
    }
  },
  methods: {
    async gethotCityList () {
      try {
        const res = await gethotCityList(1)
        console.log(res)
        this.hotCityList = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getCityList () {
      try {
        const res = await getCityList(1)
        // 获取回来的数据需要过滤掉热门城市
        const cityList = res.data.body.filter(item => {
          return this.hotCityList.every(item1 => item1.label !== item.label)
        })
        // A:[],B:[],C:[]
        const cityName = {}
        const cityIndex = []
        for (let i = 65; i <= 90; i++) {
          cityIndex.push(String.fromCharCode(i))
        }
        // console.log(cityIndex)
        this.indexList = cityIndex
        this.indexList.forEach(item => {
          cityName[item] = []
          cityList.forEach(el => {
            // 将筛选后热门城市的返回值遍历，提取每一项的第一个字母
            const frist1 = el.pinyin.slice(0, 1).toUpperCase()
            // 当提取出的字母等于当前key值的时候，就将当前这个对象存进去
            if (frist1 === item) {
              cityName[item].push(el)
            }
          })
        })

        // console.log(cityName)
        // 存在data中，具有响应式效果
        this.$nextTick(() => {
          this.cityList = cityName
        })
      } catch (err) {
        console.log(err)
      }
    },
    changeCity (item) {
      this.$store.commit('changenowCity', item.label)
      this.$store.commit('changenowCityId', item.value)
      this.$router.back()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-index-anchor {
  color: #acacac;
  font-size: 32px;
}
.van-cell__title {
  font-size: 30px;
}
/deep/ .van-index-bar__index {
  font-size: 28px;
  margin-top: 15px;
  color: #333;
}
.index-active {
  color: #fff;
  background-color: #21b97a;
  border-radius: 100%;
  display: inline-block;
  font-size: 12px;
  width: 15px;
  height: 15px;
  line-height: 15px;
}
</style>
