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
          <van-picker title="标题" show-toolbar :columns="columns" />
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
      <van-dropdown-item title="筛选"></van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      value: '',
      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ],
      columns1: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      columns2: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']

    }
  },
  methods: {
    onSearch () {
      this.$router.push({ path: '/map' })
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
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
</style>
