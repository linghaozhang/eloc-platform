import http from 'http'

export const getWarningCounts = () => {
  return http.post('home/getCurrentWarningCounts')
};

export const getWarningLogs = (params) => {
  return http.post('home/getCurrentWarningLogs',params)
};

export const warnTipSave = (params) => {
  return http.post('home/saveWarningShield',params)
}