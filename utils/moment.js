import moment from './lib/moment-with-locales.min'
moment.locale('zh-cn')
moment.updateLocale('zh-cn', {
  calendar: {
    sameDay: '[今天]HH:mm',
    lastDay: '[昨天]HH:mm',
    lastWeek: '[上]ddd',
    sameElse: 'YYYY-MM-DD'
  }
})
export default moment