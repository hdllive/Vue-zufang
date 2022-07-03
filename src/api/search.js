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

export const getHouses = () => {
  return request({
    url: '/houses/params',
    headers: {
      authorization: store.state.token
    }
  })
}
