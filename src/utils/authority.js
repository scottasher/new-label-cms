import { formatISO, add, isAfter, parseISO } from 'date-fns';
// import { addHours } from 'date-fns/add_hours';

export function getAuthority(str) {

  return sessionStorage.getItem('authority')
}

export function setAuthority(authority) {
  // console.log(authority)
  return sessionStorage.setItem('authority', authority)
}


export function getToken() {
  const authDate = parseISO(sessionStorage.getItem('tokDate'));
  const addHour = add(authDate, { hours: 2 })
  const compare = isAfter(authDate, addHour)
  if(!compare) {
    const tok1 = sessionStorage.getItem('toke0');
    const tok2 = sessionStorage.getItem('toke1');
    const tok3 = sessionStorage.getItem('toke2');

    const finalTok = `${tok1}.${tok2}.${tok3}`

    return finalTok
  } else {
    return sessionStorage.clear();
  }
}

export function setToken(token) {
  if(!token) {
    return sessionStorage.clear();
  }

  let tok = token.split('.');

  let mapTok = tok.map((toke, i) => {
    sessionStorage.setItem(`toke${i}`, toke)
    return toke
  });

  sessionStorage.setItem('tokDate', formatISO(new Date()))
  return mapTok
}
