import cookie from "cookie"

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export function takeFirstNWords(n, text) {
  if (text) {
    const splitted = text.split(' ')
    let finalText = ''
  
    for (let i = 1; i <= n; i++) {
      finalText += splitted[i] + ' '
      
    }
    
    return splitted.length >= n ? finalText : text
  }

  return ''
}

export function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}