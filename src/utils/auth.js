import Cookies from 'js-cookie'
import Config from '@/config'

const TokenKey = Config.TokenKey
const TokenKeyLED = Config.TokenKeyLED

export function getToken (key) {
  if (key === undefined) {
    return Cookies.get(TokenKey)
  } else if (key === 'LED') {
    return Cookies.get(TokenKeyLED)
  }
}

export function setToken (token, rememberMe, type) {
  if (type === 'LED') {
    return Cookies.set(TokenKeyLED, token, { expires: Config.tokenCookieExpires })
  } else if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else {
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
