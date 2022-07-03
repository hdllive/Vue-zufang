<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="getCommunity"
        @cancel="onCancel"
      />
    </form>
    <van-cell-group v-for="(item, index) in searchList" :key="index">
      <van-cell @click="getValueFn(item.communityName)">
        <template #title> {{ item.communityName }} </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getCommunity } from '@/api/search'
export default {
  name: 'rentSearch',
  created () { },
  data () {
    return {
      value: '',
      searchList: []
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    async getCommunity (val) {
      const res = await getCommunity(val)
      console.log(res)
      this.searchList = res.data.body
    },
    getValueFn (item) {
      console.log(item)
      this.$store.commit('setSearchValue', item)
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
</style>
