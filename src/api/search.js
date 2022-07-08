import request from '@/utils/request'
import store from '@/store'

export const getCommunity = (val) => {
  return request({
    url: '/area/community',
    params: {
      name: val,
      id: store.state.nowCityId
    }
  })
}

// 发布房屋所需要的条件
export const getHouses = () => {
  return request({
    url: '/houses/params',
    headers: {
      authorization: store.state.token
    }
  })
}

// 根据条件查询房屋需要的各种数据，参数：地区的id，地区，价格
export const getHousesAll = () => {
  return request({
    url: `/houses?cityId:${store.state.nowCityId}`,
    params: {
      cityId: store.state.nowCityId
    }
  })
}

// 获取查询房屋条件的各种数据，参数：城市id
export const getHouseCondition = () => {
  return request({
    url: '/houses/condition',
    params: {
      id: store.state.nowCityId
    }
  })
}
