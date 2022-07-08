<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      background="#21b97a"
    >
      <template #left>
        <van-icon name="arrow-left" />
      </template>
      <template #label>
        <div class="location">
          <span @click="$router.push('/city')"
            >{{ $store.state.nowCity }}<i><van-icon name="arrow-down" /></i
          ></span></div
      ></template>
      <template #action>
        <div @click="onSearch">
          <i class="icon"><van-icon name="location-o" /></i>
        </div>
      </template>
    </van-search>

    <van-dropdown-menu>
      <van-dropdown-item title="区域">
        <template #default>
          <van-picker title="标题" show-toolbar :columns="cityAreaList" />
        </template>
      </van-dropdown-item>
      <van-dropdown-item title="方式">
        <template #default>
          <van-picker title="标题" show-toolbar :columns="columns1" />
        </template>
      </van-dropdown-item>
      <van-dropdown-item title="租金">
        <van-picker title="标题" show-toolbar :columns="columns2" />
      </van-dropdown-item>
      <van-dropdown-item
        ><template #title><div @click="showPopup">筛选</div></template>
      </van-dropdown-item>
    </van-dropdown-menu>

    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <van-row>
        <div>
          <dt>户型</dt>
          <dd>
            <span v-for="(item, index) in AllList.roomType" :key="index">{{
              item.label
            }}</span>
          </dd>
          <dt>朝向</dt>
          <dd>
            <span v-for="(item, index) in AllList.oriented" :key="index">{{
              item.label
            }}</span>
          </dd>
          <dt>楼层</dt>
          <dd>
            <span v-for="(item, index) in AllList.floor" :key="index">{{
              item.label
            }}</span>
          </dd>
          <dt>房屋亮点</dt>
          <dd>
            <span
              v-for="(item, index) in AllList.characteristic"
              :key="index"
              >{{ item.label }}</span
            >
          </dd>
        </div>
        <div class="kongbai"></div>
        <div class="btn">
          <button class="left">清除</button>
          <button class="right">确定</button>
        </div>
      </van-row>
    </van-popup>

    <detai v-for="item in favorites" :key="item.id" :item="item"></detai>
  </div>
</template>

<script>
import { getHousesAll, getHouseCondition } from '@/api/search'
import detai from '@/components/detai.vue'
export default {
  created () {
    this.getHousesAll()
    this.getHouseCondition()
  },
  data () {
    return {
      value: '',
      // columns: [
      //   {
      //     text: '浙江',
      //     children: [
      //       {
      //         text: '杭州',
      //         children: [{ text: '西湖区' }, { text: '余杭区' }]
      //       },
      //       {
      //         text: '温州',
      //         children: [{ text: '鹿城区' }, { text: '瓯海区' }]
      //       }
      //     ]
      //   },
      //   {
      //     text: '福建',
      //     children: [
      //       {
      //         text: '福州',
      //         children: [{ text: '鼓楼区' }, { text: '台江区' }]
      //       },
      //       {
      //         text: '厦门',
      //         children: [{ text: '思明区' }, { text: '海沧区' }]
      //       }
      //     ]
      //   }
      // ],
      columns1: [], // 租房方式数据
      columns2: [], // 租房价格数据
      favorites: [],
      show: false,
      AllList: [], // 存放所有的数据
      cityAreaList: [] // 存放城市地区信息
    }
  },
  methods: {
    onSearch () {
      this.$router.push({ path: '/map' })
    },
    async getHousesAll () {
      const res = await getHousesAll()
      console.log(res)
      this.favorites = res.data.body.list
    },
    async getHouseCondition () {
      const res = await getHouseCondition()
      console.log(res)
      this.AllList = res.data.body
      res.data.body.rentType.map(item => this.columns1.push(item.label))
      res.data.body.price.map(item => this.columns2.push(item.label))

      // 获取城市数据列表及地铁
      this.cityAreaList.push(res.data.body.area, res.data.body.subway)
      // 数据对象转换为字符串
      const middleCity = JSON.stringify(this.cityAreaList)
      // 定义正则，进行替换
      const reg = /label/g
      const reg2 = /"不限"/g
      this.cityAreaList = JSON.parse(middleCity.replace(reg, 'text').replace(reg2, '"不限","children":[{"text":""}]'))
    },
    showPopup () {
      this.show = true
    },
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      this.$toast('取消')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { detai }
}
</script>

<style scoped lang='less'>
/deep/ .location {
  font-size: 30px;
  margin-right: 20px;
}
.icon {
  font-size: 40px;
  color: #fff;
}
.van-search {
  background-color: rgba(0, 0, 0, 0);
}
.van-icon-arrow-left {
  color: #fff;
  font-size: 40px;
  margin-right: 30px;
}
/deep/ .van-picker__toolbar {
  display: none;
}

/deep/.van-row {
  position: relative;
  dt {
    margin: 40px 40px;
    font-size: 30px;
    color: #333;
  }
  span {
    display: inline-block;
    height: 64px;
    width: 140px;
    margin-left: 70px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 6px;
    line-height: 64px;
    text-align: center;
    font-size: 24px;
    color: #888;
  }
}

/deep/ dd {
  padding-bottom: 14px;
  display: block;
  margin-inline-start: 40px;
  color: #333;
  border-bottom: 1px solid #e5e5e5;
}

/deep/.btn {
  position: absolute;
  bottom: 0;
  display: flex;
  line-height: 90px;
  width: 100%;
  text-align: center;
  height: 90px;
  z-index: 1;
  font-size: 30px;
  background-color: #fff;
  .left {
    box-sizing: border-box;
    flex: 1 1;
    color: #21b97a;
    border: none;
    background-color: #fff;
  }
  .right {
    background-color: #21b97a;
    box-sizing: border-box;
    flex: 1 1;
    color: #fff;
    border: none;
  }
}
.kongbai {
  height: 150px;
}
</style>
