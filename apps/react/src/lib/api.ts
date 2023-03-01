const baseUrl = 'http://localhost:3333'

type FetchArgs = {
  url: string
  method: string
  headers?: Record<string, any>
  body?: Record<string, any>
  toJSON?: boolean
  preventLogoutOn401?: boolean
}
export async function request({
  url,
  method,
  headers,
  body,
  toJSON,
  preventLogoutOn401
}: FetchArgs): Promise<Response | any> {
  try {
    const response = await fetch(baseUrl + url, {
      method: method,
      headers: headers ? headers : { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include'
    })

    // redirect to logout if status session dissapears
    if (!preventLogoutOn401 && response.status === 401)
      window.location.href = '/logout'

    if (toJSON) return response.json()

    return response
  } catch (error: any) {
    throw new Error(`Network Error: ${error.message}`)
  }
}
