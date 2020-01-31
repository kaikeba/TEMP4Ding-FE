import request from '../../utils/request'

export default {
  state: {
    status: -1,
    message: '',
    data: null,
  },
  reducers: {
    result(state, payload) {
      return Object.assign({}, state, payload)
    },
  },
  effects: dispatch => ({
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.count.increment(payload)
    },
    async getResult(payload, rootState) {
      const params = {
        name: 'stark',
        age: 18,
      }
      const res = await request.get(
        'https://easy-mock.com/mock/5cc1cb39aa4f7f6ebe5d26ce/stark/movie',
        params
      )
      this.result(res)
    },
  }),
}
