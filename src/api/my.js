import request from '@/utils/request.js'
import store from '@/store'

export const getfavorites = () => {
  return request({
    url: 'user/favorites',
    headers: {
      authorization: store.state.token
    }
  })
}
