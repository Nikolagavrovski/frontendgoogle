export const apiDomain = 'http://serverapp/'
export const getUserObject = apiDomain + 'api/user'
export const userListUrl = apiDomain + 'api/v1/user-list'
export const getUserToken = apiDomain + 'api/login'
export const userRegister = apiDomain + 'api/register'
export const getContacts = apiDomain + 'api/contacts'
export const getConversationById = apiDomain + 'api/conversation/'

export const getHeader = function () {
  const tokenData = JSON.parse(window.localStorage.getItem('token'))
  const headers = {
    'Access': "application/json",
    'Authorization': 'Bearer ' + tokenData
  }
  return headers;
}
