import config from '../config';
import { fetch } from 'tns-core-modules/fetch';

let cached_credentials: any = null;

export function getTokenFromCachedCredentials() {
  console.log('acquiring token');
  config.token = null;
  if (!cached_credentials) throw Error('no cached credentials');

  return fetch(config.apiUrl + 'user/' + config.appKey + '/login', {
    method: 'POST',
    body: cached_credentials,
    headers: getCommonHeaders(),
  })
    .then(handleErrors)
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      console.log('got token');
      config.token = data._kmd.authtoken;
    });
}

export function login(email: string, password: string) {
  cached_credentials = JSON.stringify({ username: email, password: password });
  return getTokenFromCachedCredentials();
}

export function register(email: string, password: string): Promise<any> {
  if (!email || !password) {
    return Promise.reject('Please provide both an email address and password.');
  }

  return fetch(config.apiUrl + 'user/' + config.appKey, {
    method: 'POST',
    body: JSON.stringify({
      username: email,
      email: email,
      password: password,
    }),
    headers: getCommonHeaders(),
  }).then(handleErrors);
}

function getCommonHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: config.appUserHeader,
  };
}

function handleErrors(response: any) {
  if (!response.ok) {
    console.log(JSON.stringify(response));
    throw Error(response.statusText);
  }
  return response;
}
