import request from '../../utils/request'
import { apiBaseUrl } from '../../utils/env'
import { getStorage } from '../../utils/index'

export default {
  state: {
    status: -1,
    message: '',
    data: null,
    familyData: [],
    listData: [],
  },
  reducers: {
    result(state, payload) {
      return Object.assign({}, state, payload)
    },
  },
  effects: dispatch => ({
    async getFamilyList() {
      let userInfo = JSON.parse(getStorage('userInfo'))
      const { data } = await request.get(
        `${apiBaseUrl}temperature/family/${userInfo.data.userId}`
      )
      data && this.result({ familyData: data })
    },
    async addFamily(payload) {
      return await request.post(`${apiBaseUrl}temperature/family`, payload)
    },
    async changeFamily(payload) {
      return await request.put(
        `${apiBaseUrl}temperature/family/${payload.id}`,
        payload
      )
    },
    async deleteFamily(payload) {
      return await request.remove(
        `${apiBaseUrl}temperature/family/${payload.id}`
      )
    },
    async setDegrees(payload) {
      return await request.post(
        `${apiBaseUrl}temperature/employee/temperature`,
        payload
      )
    },
    async getList(payload) {
      let userInfo = JSON.parse(getStorage('userInfo'))
      return await request.post(
        `${apiBaseUrl}temperature/temperatures/${userInfo.data.userId}`,
        { size: 20, current: 1 }
      )
    },
  }),
}
