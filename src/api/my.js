import request from '@/utils/request.js'
import store from '@/store'

// 查看收藏
export const getfavorites = () => {
  return request({
    url: 'user/favorites',
    headers: {
      authorization: store.state.token
    }
  })
}

// 我的收藏
export const getLookHouses = () => {
  return request({
    url: 'user/houses',
    headers: {
      authorization: store.state.token
    }
  })
}

// 点击查看房源详情页
export const getUserHomes = (code) => {
  return request({
    url: `houses/${code}`
  })
}

// 添加收藏
export const addFavorites = (code) => {
  return request({
    method: 'POST',
    url: `user/favorites/${code}`,
    headers: {
      authorization: store.state.token
    }
  })
}

// 取消收藏
export const delFavorites = (code) => {
  return request({
    method: 'DELETE',
    url: `user/favorites/${code}`,
    headers: {
      authorization: store.state.token
    }
  })
}
