export const apiDomain = 'http://serverapp/'
export const loginUrl = apiDomain + 'oauth/token'
export const userUrl = apiDomain + 'api/user'
export const userListUrl = apiDomain + 'api/v1/user-list'

export const getHeader = function () {
  const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
  const headers = {
    'Access': "application/json",
    'Authorization': 'Bearer ' + tokenData.access_token
  }
  return headers;
}
