import request from '@/utils/request'

export const getImg = () => {
  return request({
    url: 'home/swiper'
  })
}

export const getCityList = () => {
  return request({
    url: 'area/city',
    params: {
      level: 1
    }
  })
}

export const gethotCityList = () => {
  return request({
    url: 'area/hot'
  })
}

export const getGroups = (nowCityId) => {
  return request({
    url: 'home/groups',
    params: {
      area: nowCityId
    }
  })
}
