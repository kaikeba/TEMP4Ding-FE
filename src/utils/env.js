// 判断当前是哪个环境
const currentEnv = process.env.INIT_APP_ENV
console.log('currentEnv', currentEnv)
export const isDevEnv = currentEnv === 'dev'
export const isPreEnv = currentEnv === 'pre'
export const isTestEnv = currentEnv === 'test'
export const isProdEnv = currentEnv === 'prod'

const apiPrefix = {
  dev: 'test-',
  test: 'test-',
  pre: 'pre',
  prod: '',
}
const ddCompanyIdFix = {
  dev: 'xxxxxxxxxxxxxxx',
  test: 'xxxxxxxxxxxxxxx',
  pre: 'xxxxxxxxxxxxxxx',
  prod: 'xxxxxxxxxxxxxxx',
}

export const getApiPrefix = apiPrefix[currentEnv]
export const apiBaseUrl = `https://${getApiPrefix}xxxxx.kaikeba.com/`
export const ddCompanyId = ddCompanyIdFix[currentEnv]
