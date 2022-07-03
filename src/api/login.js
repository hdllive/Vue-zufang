import request from '@/utils/request'
export const login = ({ password, username }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      password,
      username
    }
  })
}

export const logout = () => {
  return request({
    method: 'POST',
    url: '/user/logout'
  })
}
