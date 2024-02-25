export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')
  const headers = getRequestHeaders(event)
  const token = headers.authorization
  const body = await readBody(event)

  const config = useRuntimeConfig(event)
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'authorization': `${token}` },
    body: JSON.stringify(body)
  }
  const response = await fetch(config.api + `user/${userId}`, requestOptions)
  const data = await response.json();
  return data
})