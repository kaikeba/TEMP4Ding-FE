import request from '../../utils/request'
import { apiBaseUrl } from '../../utils/env'

export default {
  state: {
    status: -1,
    message: '',
    data: null,
    userInfo: [],
    isAdmin: null,
    isPromised: null,
    promiseCode: '',
    setDegreesDataAdmin: '',
  },
  reducers: {
    result(state, payload) {
      return Object.assign({}, state, payload)
    },
  },
  effects: dispatch => ({
    async getUserInfo(code) {
      const res = await request.get(`${apiBaseUrl}temperature/dingtalk/${code}`)
      this.result({ userInfo: res.data })
      return res
    },
    async chechkoutIsAdmin(mobile) {
      const res = await request.get(
        `${apiBaseUrl}temperature/dingtalk/isoperator?mobile=${mobile}`
      )
      this.result({ isAdmin: res.data.data.isAdmin })
      return res.data.data.isAdmin
    },
    async checkIsPromised(userId) {
      const res = await request.get(
        `${apiBaseUrl}temperature/isPromised/${userId}`
      )
      if (res.data.code !== 0) {
        return
      }
      this.result({ isPromised: res.data.data.isPromised })
      return res.data.data.isPromised
    },
    async promiseGuarantee(data) {
      const res = await request.post(`${apiBaseUrl}temperature/promise`, data)
      this.result({ promiseCode: res.data.code })
      return res.data.code
    },
    async getTemperTureList(data) {
      const res = await request.post(
        `${apiBaseUrl}temperature/temperatures/${data.userId}?familyId=${data.familyId}`,
        data.query
      )
      this.result({ temperTureList: res.data.data })
      return res.data.data
    },
    async setDegreesDataAdmin(data) {
      const res = await request.post(
        `${apiBaseUrl}temperature/admin/temperature`,
        data
      )
      this.result({ temperTureList: res.data.code })
      return res.data.code
    },
  }),
}
