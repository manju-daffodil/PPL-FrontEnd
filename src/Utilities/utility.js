import config from '../Config/config';
import axios from 'axios';

const callApi = (method, reqURL, data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    let url = `${config.serverURL}/${reqURL}`;
    let option = {
      method,
      url,
      data,
      headers,
    };

    if (option.method === 'get') delete option['data'];
    axios({...option})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export {callApi};
