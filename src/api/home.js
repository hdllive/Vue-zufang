import request from '@/utils/request'

// 轮播图
export const getImg = () => {
  return request({
    url: 'home/swiper'
  })
}

// 所有城市
export const getCityList = () => {
  return request({
    url: 'area/city',
    params: {
      level: 1
    }
  })
}

// 热门城市
export const gethotCityList = () => {
  return request({
    url: 'area/hot'
  })
}

// 租房小组
export const getGroups = (nowCityId) => {
  return request({
    url: 'home/groups',
    params: {
      area: nowCityId
    }
  })
}

// 房屋图像上传
export const getHomeImage = (file) => {
  return request({
    method: 'POST',
    url: 'houses/image',
    data: file
  })
}

// 发布房源，参数传一个对象，一大堆
export const createHomes = (data) => {
  return request({
    method: 'POST',
    url: 'user/houses',
    data
  })
}
