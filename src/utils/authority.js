import { format, addHours, isAfter } from 'date-fns';
// import { addHours } from 'date-fns/add_hours';

export function getAuthority(str) {

  return sessionStorage.getItem('authority')
}

export function setAuthority(authority) {
  // console.log(authority)
  return sessionStorage.setItem('authority', authority)
}


export function getToken() {
  let authDate = sessionStorage.getItem('tokDate');
  let addHour = addHours(authDate, 2)
  let compare = isAfter(authDate, addHour)

  if(!compare) {
    let tok1 = sessionStorage.getItem('toke0');
    let tok2 = sessionStorage.getItem('toke1');
    let tok3 = sessionStorage.getItem('toke2');

    let finalTok = `${tok1}.${tok2}.${tok3}`

    return finalTok
  } else {
    return sessionStorage.clear();
  }
  localStorage.clear()
}

export function setToken(token) {
  if(!token) {
    return sessionStorage.clear();
  }

  let tok = token.split('.');

  let mapTok = tok.map((toke, i) => {
    return sessionStorage.setItem(`toke${i}`, toke)
  });

  sessionStorage.setItem('tokDate', format(new Date()))

  return mapTok
}
