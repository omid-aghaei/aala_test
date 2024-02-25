const users = (baseURL, headers, userId, tokenCheck) => ({

  async login(query = {}, body = null, lazy = false) {
    const url = `login`
    const { data, pending, refresh, execute, error } = await useFetch(url, { method: 'POST', query: query, headers:headers, baseURL: baseURL, body: body, lazy: lazy })
    tokenCheck(error)
    return { data: data, pending: pending, refresh, execute, error: error }
  },

  async formData(query = {}, lazy = false) {
    const url = `megaroute/getUserFormData`
    const { data, pending, refresh, execute, error } = await useFetch(url, { method: 'GET', query: query, headers:headers, baseURL: baseURL, lazy: lazy })
    tokenCheck(error)
    return { data: data, pending: pending, refresh, execute, error: error }
  },

  async getUser(userId = '', query = {}, body = null, lazy = false) {
    const url = `user/${userId}`
    const { data, pending, refresh, execute, error } = await useFetch(url, { method: 'GET', query: query, headers:headers, baseURL: baseURL, lazy: lazy })
    tokenCheck(error)
    return { data: data, pending: pending, refresh, execute, error: error }
  },

  async updateUser(userId = '', query = {}, body = null, lazy = false) {
    const url = `user/${userId}`
    const { data, pending, refresh, execute, error } = await useFetch(url, { method: 'PUT', query: query, headers:headers, baseURL: baseURL, body: body, lazy: lazy })
    tokenCheck(error)
    return { data: data, pending: pending, refresh, execute, error: error }
  },

  async updateUserProxy(userId = '', query = {}, body = null, lazy = false) {
    const url = `/api/updateProxy/${userId}`
    const { data, pending, refresh, execute, error } = await useFetch(url, { method: 'PUT', query: query, headers:headers, body: body, lazy: lazy })
    tokenCheck(error)
    return { data: data, pending: pending, refresh, execute, error: error }
  },

})

export default users