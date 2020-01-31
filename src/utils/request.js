import axios from 'axios'
import { assert } from '@/utils'
import { HTTP_STATUS } from '@/consts/statusCode'
axios.defaults.withCredentials = true
axios.defaults.timeout = 50000
axios.defaults.headers.common['Content-Type'] = 'application/json'
// 错误状态码 有返回错误直接进行操作-
const errorStatus = [401, 500, 502, 504, 400]
// 中间件 拦截请求-
axios.interceptors.response.use(
  response => {
    // if (errorStatus.indexOf(response.status) > -1) {
    //   router.push({
    //     path: '/',
    //   })
    // }
    // if ([403, -505].indexOf(response.data.code) > -1) {
    //   document.location.href = urlPassport
    // }
    return response
  },
  err => {
    if (!err.response) {
      // apiError('ApiError', err)
      return
    }
    const res = err.response
    const option = {
      status: res.status,
      url: res.config.url,
      params: res.config.params,
    }
    // apiError('ApiError', option)
    // return Promise.reject(err)
  }
)

const exceptionHandling = data => {
  if (
    data.status == HTTP_STATUS.SUCCESS ||
    data.status == HTTP_STATUS.NOT_MODIFIED
  ) {
    if (!data.data.data) {
      assert(false, 'api data is empty')
      return
    }
    return data
  } else {
    assert(false, data.statusText)
  }
  return false
}

/**
 * get
 * @param url
 * @param data
 * @returns {Promise}
 */

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then(response => {
        // if (response.data.code !== 1) {
        // console.error('api_error', response.data.msg)
        // reject(response)
        // }
        resolve(response)
      })
      .catch(error => {
        // reject(err)
      })
  })
}

/**
 * post
 * @param url
 * @param data
 * @returns {Promise}
 */

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * put
 * @param url
 * @param data
 * @returns {Promise}
 */

const put = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * delete
 * @param url
 * @param data
 * @returns {Promise}
 */

const remove = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      response => {
        resolve(response.data)
      },
      error => {
        reject(error)
      }
    )
  })
}
export default {
  get,
  post,
  put,
  remove,
}
